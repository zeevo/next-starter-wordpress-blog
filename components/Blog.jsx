import React from 'react';
import parse from 'html-react-parser';

import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const Blog = ({ posts, pages, categories, siteMetadata, title, description }) => {
  const { menu, author, adminUrl, rss } = siteMetadata;

  const postNodes = posts.edges.map(edge => edge.node);

  const fullMenu = pages.edges.map(edge => edge.node).concat(menu);

  return (
    <>
      <Header
        title={parse(title)}
        menu={fullMenu}
        subtitle={description ? parse(description) : null}
      >
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <Feed posts={postNodes} />
      </main>
      <Footer author={author} adminUrl={adminUrl} rss={rss} />
    </>
  );
};

export default Blog;
