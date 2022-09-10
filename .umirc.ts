export default {
  npmClient: 'pnpm',
  presets: [require.resolve('@umijs/preset-vue')],
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  apiRoute: {
    platform: 'vercel',
  },
  routes: [
    { path: '/', component: 'index' },
    { path: '/posts/create', component: 'posts/create' },
    { path: '/login', component: 'login' },
    { path: '/posts/:postId', component: 'posts/post' },
  ],
};
