module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		layers: ['base', 'utitlies', 'components'],
		content: ['./public/**/*.html', './src/**/*.vue'],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};
