import React from "react";

import _ from "lodash";
import Link from "next/link";
import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";

const PostTemplateDetails = (props) => {
  const { site, wpPost, allWpCategory, allWpPage } = props.data;
  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { name } = author;
  const { title, date, content, featuredImage } = wpPost;

  const categoryNames = allWpCategory.nodes
    .map((node) => node.name)
    .filter((category) => category !== "Uncategorized");

  const fullMenu = allWpPage.edges.map((edge) => edge.node).concat(menu);
  const tags = wpPost.tags.nodes.map((edge) => edge.name);

  return (
    <>
      <Header
        date={date}
        background={
          featuredImage ? featuredImage.node.sourceUrl : "/background.jpg"
        }
        title={title}
        subtitle={name}
        menu={fullMenu}
      >
        <Categories categories={categoryNames} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <article className="post">
          <section
            className="longform drop"
            dangerouslySetInnerHTML={{ __html: `${content}<hr />` }}
          />
          {tags.length ? (
            <div className="container container--narrow">
              Tags:{" "}
              {tags.map((tag) => (
                <Link href={`/tag/${_.kebabCase(tag)}`}>
                  <a className="button" style={{ marginRight: ".25rem" }}>
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="container container--narrow">
            <Link href="/" className="button">
              Read more posts
            </Link>
          </div>
        </article>
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default PostTemplateDetails;
