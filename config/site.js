const siteConfig = {
  rss: '/rss.xml',
  WPGraphQL: process.env.WP_GRAPHQL_URL,
  adminUrl: process.env.WP_ADMIN_URL,
  menu: [
    {
      title: 'Twitter',
      uri: 'https://twitter.com/zeevosec',
      external: true,
    },
    {
      title: 'Home',
      uri: '/',
    },
  ],
  author: {
    name: 'You',
    twitter: 'https://twitter.com/zeevosec',
    github: 'https://github.com/zeevosec',
    avatar: '/avatar.png',
  },
};

export default siteConfig;
