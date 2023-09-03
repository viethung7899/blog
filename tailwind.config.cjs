/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	theme: {
		container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "0"
      },
      screens: {
        "md": "768px",
      },
    },
	}
}
