// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        indigo: {
          500: '#6366f1', // Example override
          900: '#312e81',
        },
      },
    },
  },
  plugins: [],
}