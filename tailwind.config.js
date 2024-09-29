/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			"sans": ["Inter", "sans-serif"],
		},
		extend: {
			colors: {
				green: "var(--green)",
				"dark-green": "var(--dark-green)",
				"light-green": "var(--light-green)",
				"gray": "var(--gray)",
				"dark-gray": "var(--dark-gray)"
			}
		},
	},
	plugins: [],
};
