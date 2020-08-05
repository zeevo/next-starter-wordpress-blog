import React from 'react';
import Head from 'next/head';

import parse from 'html-react-parser';
import { createApolloFetch } from 'apollo-fetch';

import { getSiteMetadata } from '../lib/site';

import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';
import { getPageBySlug } from '../lib/page';

function PageTemplate({ siteMetadata, data }) {
  const { generalSettings, page, pages, categories } = data;
  const { title } = generalSettings;

  const categoryNames = categories.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${title} - ${parse(page.title)}`}</title>
          <meta name="description" content={`${title} - ${page.title}`} />
        </Head>
        <PageTemplateDetails
          page={page}
          pages={pages}
          categories={categoryNames}
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
  {
    pages {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
  `;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({ query });

  return {
    paths: data.pages.edges.map(({ node }) => {
      return { params: { page: node.slug } };
    }),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = `
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

  const fetch = createApolloFetch({ uri });
  const res = await fetch({
    query,
    variables: { id: params.id },
  });

  const page = await getPageBySlug(params.page);

  return {
    props: {
      data: { ...res.data, page },
      siteMetadata,
      params,
    },
  };
};

export default PageTemplate;
