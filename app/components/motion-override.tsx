import { useEffect } from 'react';

const MotionOverride = () => {
	useEffect(() => {
		const removeReducedMotionMedia = (): void => {
			const styleSheets: StyleSheetList = document.styleSheets;

			for (let i: number = 0; i < styleSheets.length; i++) {
				const styleSheet: CSSStyleSheet = styleSheets[
					i
				] as CSSStyleSheet;

				const rules: CSSRuleList | undefined =
					styleSheet.cssRules || styleSheet.rules;

				if (!rules) {
					continue;
				}

				for (let j: number = rules.length - 1; j >= 0; j--) {
					const rule: CSSRule = rules[j];

					// Check if it's a media rule and contains prefers-reduced-motion
					if (
						rule.type === CSSRule.MEDIA_RULE &&
						(rule as CSSMediaRule).conditionText.includes(
							'prefers-reduced-motion'
						)
					) {
						styleSheet.deleteRule(j);
					}
				}
			}
		};

		removeReducedMotionMedia();
	}, []);

	return null;
};

export default MotionOverride;
