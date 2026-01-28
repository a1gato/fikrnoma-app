/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo 500
                "bg-dark": "#f8fafc", // Slate 50
                "bg-card": "rgba(255, 255, 255, 0.8)",
                gold: "#f59e0b", // Amber 500
            }
        },
    },
    plugins: [],
}
