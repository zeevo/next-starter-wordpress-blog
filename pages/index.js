import React from "react";
import Head from "next/head";
import parse from "html-react-parser";

import { createApolloFetch } from "apollo-fetch";

import Layout from "../components/Layout";
import Blog from "../components/Blog";
import { getSiteMetadata } from "../lib/site";

const IndexRoute = ({ siteMetadata, data }) => {
  const { posts, pages, categories, generalSettings } = data;
  const { title, description } = generalSettings;

  const categoryNames = categories.nodes
    .map((node) => node.name)
    .filter((name) => name !== "Uncategorized");

  return (
    <Layout>
      <div>
        <Head>
          <title>{parse(title)}</title>
          <meta name="description" content={parse(description)} />
        </Head>
        <div />
        <Blog
          posts={posts}
          pages={pages}
          categories={categoryNames}
          title={title}
          description={description}
          generalSettings={generalSettings}
          siteMetadata={siteMetadata}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = `
  query IndexQuery {
    posts {
      edges {
        node {
          title
          date
          excerpt
          slug
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              title
            }
          }
        }
      }
    }
    pages {
      edges {
        node {
          uri
          title
        }
      }
    }
    categories {
      nodes {
        name
      }
    }
    generalSettings {
      dateFormat
      description
      email
      language
      startOfWeek
      timeFormat
      timezone
      title
      url
    }
  }
  `;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({ query });

  return {
    props: {
      data,
      siteMetadata,
    },
  };
};

export default IndexRoute;
