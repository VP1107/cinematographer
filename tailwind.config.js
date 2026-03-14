/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            transitionTimingFunction: {
                'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
            }
        },
    },
    plugins: [],
}
