/** @type {import('tailwindcss').Config} */

const defaultColors = require("tailwindcss/colors");

export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Nunito Sans", "sans-serif"],
			},
			colors: {
				primary: defaultColors.gray,
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
