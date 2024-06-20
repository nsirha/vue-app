/** @type {import('tailwindcss').Config} */

const FormKitVariants = require('@formkit/themes/tailwindcss');

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
	],
	theme: {
		extend: {
			colors: {
				jba: '#f6a035',
			},

			fontFamily: {
				jba: ['interstate', 'sans-serif'],
			},

			width: {
				logo: '14.375rem',
			},
		},
	},
	plugins: [FormKitVariants],
};
