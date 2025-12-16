import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#2C5F2D", // Deep Forest Green
                    light: "#97BC62", // Spring Green
                    dark: "#1E4220",
                },
                secondary: {
                    DEFAULT: "#D32F2F", // Rich Red
                    light: "#EF5350",
                    dark: "#B71C1C",
                },
                accent: {
                    DEFAULT: "#FFC107", // Amber Gold
                    gold: "#FFD700",
                },
                paper: "#FDFBF7", // Warm Paper
            },
            fontFamily: {
                sans: ["var(--font-monserrat)", "sans-serif"],
                serif: ["var(--font-yeseva)", "serif"],
            },
            boxShadow: {
                'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
