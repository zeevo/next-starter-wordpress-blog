export default {
  rss: "/rss.xml",
  WPGraphQL: process.env.WP_ADMIN_URL || "https://wp.zeevo.me/graphql",
  adminUrl: process.env.WP_ADMIN_URL || "https://wp.zeevo.me/wp-login",
  menu: [
    {
      title: "Twitter",
      uri: "https://twitter.com/zeevosec",
      external: true,
    },
    {
      title: "Home",
      uri: "/",
    },
  ],
  author: {
    name: "Shane O'Neill",
    twitter: "https://twitter.com/zeevosec",
    github: "https://github.com/zeevosec",
    avatar: "/icon.png",
  },
};
