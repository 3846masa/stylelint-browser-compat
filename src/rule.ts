import bcd from '@mdn/browser-compat-data';
import type { Identifier } from '@mdn/browser-compat-data';
import browserslist from 'browserslist';
import get from 'lodash.get';
import type { Rule, RuleMeta } from 'stylelint';
import stylelint from 'stylelint';

import { collectFeatures } from '~/collect_features';
import { isSupported } from '~/is_supported';
import { ruleOptionsSchema } from '~/options';
import { parseBrowsersListVersion } from '~/parse_browserslist_version';
import type { Feature } from '~/types';

export const ruleName = 'plugin/browser-compat';

export const messages = stylelint.utils.ruleMessages(ruleName, {
  disallowPrefix: (featureName) => {
    return `${featureName} with vendor prefix is not allowed by stylelint config.`;
  },
  rejected: (featureName, targets, mdnUrl) => {
    if (mdnUrl) {
      return `${featureName} is not supported in ${targets}. See ${mdnUrl}.`;
    }
    return `${featureName} is not supported in ${targets}.`;
  },
});

export const meta: RuleMeta = {
  url: 'https://github.com/3846masa/stylelint-browser-compat',
};

const rule: Rule<boolean> = (enabled, passedOptions) => {
  return async (postcssRoot, postcssResult) => {
    if (!enabled) {
      return;
    }

    const parseOptionsResult = ruleOptionsSchema.safeParse(passedOptions);

    const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, {
      actual: passedOptions,
      optional: true,
      possible: () => parseOptionsResult.success,
    });

    if (!validOptions || !parseOptionsResult.success) {
      return;
    }

    const options = parseOptionsResult.data;

    const versions = browserslist(options.browserslist ?? null, {
      path: postcssResult.root.source?.input.file ?? false,
    });
    const targets = parseBrowsersListVersion(versions);

    const features: Feature[] = await collectFeatures({
      container: postcssRoot,
      ignoreFeatures: new Set(options.allow.features),
    });

    for (const feature of features) {
      const compat: Identifier | undefined = get(bcd.css, feature.id);
      if (!compat?.__compat) {
        continue;
      }

      const { mdn_url: mdnUrl, support: supportBlock } = compat.__compat;

      if (options.allow.prefix !== true && feature.prefix != null) {
        stylelint.utils.report({
          endIndex: feature.endIndex,
          index: feature.index,
          message: messages.disallowPrefix(feature.name),
          node: feature.node,
          result: postcssResult,
          ruleName,
        });
        continue;
      }

      const notSupportedTargets = targets.filter((target) => {
        return isSupported(supportBlock, target, { allow: options.allow }) === false;
      });

      if (notSupportedTargets.length === 0) {
        continue;
      }

      const notSupportedTargetText = Array.from(
        new Map(notSupportedTargets.map((target) => [target.target.name, target])).values(),
      )
        .map((target) => `${target.target.name} ${target.versionString}`)
        .join(', ');

      stylelint.utils.report({
        endIndex: feature.endIndex,
        index: feature.index,
        message: messages.rejected(feature.name, notSupportedTargetText, mdnUrl ?? ''),
        node: feature.node,
        result: postcssResult,
        ruleName,
      });
    }
  };
};
rule.messages = messages;
rule.ruleName = ruleName;

export const plugin = stylelint.createPlugin(ruleName, rule);
