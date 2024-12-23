const path = require('path');

module.exports = {
  i18n: {
	localeDetection: false,
	defaultLocale: 'ua',
	locales: ['ua', 'ru', 'en'],
  },
  localePath: path.resolve('./public/locales'),
}