import React from 'react';
import Head from 'next/head';

import parse from 'html-react-parser';
import { request } from 'graphql-request';

import Layout from '../../components/Layout';
import { getSiteMetadata } from '../../lib/site';
import Blog from '../../components/Blog';

function TagTemplate({ siteMetadata, data, params }) {
  const { generalSettings, posts, pages, categories } = data;
  const { title } = generalSettings;
  const { category } = params;

  const categoryNames = categories.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${params.tag} - ${parse(title)}`}</title>
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
  const wpgraphql = siteMetadata.WPGraphQL;

  const query = /* GraphQL */ `
    query Tags {
      tags {
        nodes {
          name
        }
      }
    }
  `;

  const data = await request(wpgraphql, query);

  return {
    paths: data.tags.nodes.map(node => ({
      params: {
        tag: node.name.toLowerCase(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const wpgraphql = siteMetadata.WPGraphQL;
  const query = /* GraphQL */ `
    query($tag: String!) {
      generalSettings {
        title
        description
      }
      posts(where: { tag: $tag }) {
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

  const data = await request(wpgraphql, query, { tag: params.tag });

  return {
    props: {
      data,
      siteMetadata,
      params,
    },
  };
};

export default TagTemplate;
