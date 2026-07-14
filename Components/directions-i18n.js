(function () {
	function normalizeLanguage(value) {
		const lang = (value || 'en').toLowerCase();
		if (lang === 'lt' || lang === 'ltu' || lang === 'lit') {
			return 'lt';
		}
		return 'en';
	}

	function getLanguage() {
		const params = new URLSearchParams(window.location.search);
		const explicitLang = params.get('lang');
		if (explicitLang) {
			return normalizeLanguage(explicitLang);
		}
		return normalizeLanguage(document.documentElement.lang);
	}

	function getTranslationsUrl() {
		return '/translations.json';
	}

	function replacePlaceholders(markup, translations, language) {
		let output = markup;
		Object.entries(translations).forEach(([key, values]) => {
			const value = values[language] || values.en || '';
			output = output.replace(new RegExp(`%${key}%`, 'g'), value);
		});
		return output;
	}

	function render() {
		const language = getLanguage();
		const target = document.getElementById('directions-root');

		if (!target) {
			return;
		}

		document.documentElement.lang = language;

		fetch(getTranslationsUrl())
			.then((response) => {
				if (!response.ok) {
					throw new Error('Translations could not be loaded');
				}
				return response.json();
			})
			.then((translations) => {
				target.innerHTML = replacePlaceholders(target.innerHTML, translations, language);
			})
			.catch(() => {
				target.innerHTML = '<p>Content could not be loaded.</p>';
			});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', render);
	} else {
		render();
	}
})();
