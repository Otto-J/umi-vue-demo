export default {
  npmClient: "pnpm",
  presets: [require.resolve("@umijs/preset-vue")],
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
};
