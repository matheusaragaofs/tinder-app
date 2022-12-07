module.exports = {
  content: [
    "./screens/**/*.{ts,tsx,js}",
    "./components/**/*.{ts,tsx,js}",
    "./App.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
