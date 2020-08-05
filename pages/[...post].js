import React from 'react';
import Head from 'next/head';

import parse from 'html-react-parser';
import { request } from 'graphql-request';

import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';

import { getPostByUri, getPostPaths } from '../lib/post';
import { getSiteMetadata } from '../lib/site';

function PostTemplate({ siteMetadata, data }) {
  const { generalSettings, post, pages, categories } = data;
  const { title } = generalSettings;

  const categoryNames = categories.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${post.title} - ${parse(title)}`}</title>
          <meta name="description" content={`${title} - ${post}`} />
        </Head>
        <PostTemplateDetails
          post={post}
          pages={pages}
          categories={categoryNames}
          siteMetadata={siteMetadata}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await getPostPaths();

  return {
    paths: paths.map(path => {
      return { params: { post: path.split('/').filter(ele => ele) } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = /* GraphQL */ `
    query {
      generalSettings {
        title
        description
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

  const appData = await request(uri, query);
  const post = await getPostByUri(params.post);

  return {
    props: {
      data: { ...appData, post },
      siteMetadata,
      params,
    },
  };
};

export default PostTemplate;
