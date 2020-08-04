import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Footer from './Footer';

const PageTemplateDetails = ({ page, pages, categories, siteMetadata }) => {
  const { menu, author, adminUrl, rss } = siteMetadata;
  const { title, content, featuredMedia } = page;

  const fullMenu = pages.edges.map((edge) => edge.node).concat(menu);

  return (
    <>
      <Header
        menu={fullMenu}
        background={featuredMedia ? featuredMedia.source_url : '/background.jpg'}
        title={title}
      >
        <Categories categories={categories} />
      </Header>
      <article className="post">
        <section className="longform drop container container--narrow">
          <div
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </article>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default PageTemplateDetails;
