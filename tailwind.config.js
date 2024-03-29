module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}"],
		options: {
			safelist: ["img", "img-left", "img-right", "clear", "uppercase"]
		}
	},
	darkMode: "media",
	theme: {
		container: {
			center: true,
			screens: {
				sm: "100%",
				md: "100%",
				lg: "1024px",
				xl: "1140px"
			}
		},
		extend: {
			keyframes: {
				fadeIn: {
					"0%": {
						opacity: 0
					},
					"100%": {
						opacity: 1
					}
				}
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out"
			},
			colors: {
				primary: {
					50: "#f9faf9",
					100: "#f4f8f0",
					200: "#e7efd9",
					300: "#d2deb7",
					400: "#a7bf7e",
					500: "#749c4a",
					600: "#456b38",
					700: "#3c5e31",
					DEFAULT: "#3c5e31",
					800: "#324527",
					900: "#273723",
					light: "var(--primary-bright)",
					dark: "var(--primary-dark)"
				}
			}
		}
	},
	variants: {
		extend: {
			display: ["group-hover"]
		}
	},
	plugins: []
};
