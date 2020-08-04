import React from "react";
import Head from "next/head";

import parse from "html-react-parser";
import { createApolloFetch } from "apollo-fetch";

import Layout from "../../components/Layout";
import { getSiteMetadata } from "../../lib/site";
import Blog from "../../components/Blog";

function CategoryTemplate({ siteMetadata, data, params }) {
  const { generalSettings, posts, pages, categories } = data;
  const { title } = generalSettings;
  const { category } = params;

  const categoryNames = categories.nodes
    .map((node) => node.name)
    .filter((name) => name !== "Uncategorized");

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${category} - ${parse(title)}`}</title>
          <meta name="description" content={`${title} - ${category}`} />
        </Head>
        <Blog
          posts={posts}
          pages={pages}
          categories={categoryNames}
          title={category}
          siteMetadata={siteMetadata}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;

  const query = `
  query Categories {
    categories {
      nodes {
        name
      }
    }
  }
    `;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({ query });

  return {
    paths: data.categories.nodes.map((node) => ({
      params: { category: node.name.toLowerCase() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = `
  query ($tag: String!) {
    generalSettings {
      title
      description
    }
    posts(where: {tag: $tag}) {
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
  }
`;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({
    query,
    variables: { tag: params.category },
  });

  return {
    props: {
      data,
      siteMetadata,
      params,
    },
  };
};

export default CategoryTemplate;
