import React from 'react';

import _ from 'lodash';
import Link from 'next/link';
import Header from './Header';
import Categories from './Categories';
import Footer from './Footer';

const PostTemplateDetails = ({ post, pages, categories, siteMetadata }) => {
  const { menu, author, adminUrl, rss } = siteMetadata;
  const { title, content, featuredMedia, date, description, tags } = post;

  const fullMenu = pages.edges.map(edge => edge.node).concat(menu);
  return (
    <>
      <Header
        date={date}
        background={featuredMedia ? featuredMedia.node.sourceUrl : '/background.jpg'}
        title={title}
        subtitle={description}
        menu={fullMenu}
      >
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <article className="post">
          <section
            className="longform drop"
            dangerouslySetInnerHTML={{ __html: `${content}<hr />` }}
          />
          {tags.length ? (
            <div className="container container--narrow">
              Tags:{' '}
              {tags.map(tag => (
                <Link href={`/tag/${_.kebabCase(tag)}`}>
                  <a className="button" style={{ marginRight: '.25rem' }}>
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="container container--narrow">
            <Link href="/">
              <a className="button">Read more posts</a>
            </Link>
          </div>
        </article>
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default PostTemplateDetails;
