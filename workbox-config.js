module.exports = {
	globDirectory: 'web-build/',
	globPatterns: [
		'**/*.{json,html,sh,js,css,txt,png,ttf,jpg}'
	],
	swDest: 'web-build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};