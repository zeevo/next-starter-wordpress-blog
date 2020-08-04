import React from "react";
import Head from "next/head";

import parse from "html-react-parser";
import { createApolloFetch } from "apollo-fetch";

import { getSiteMetadata } from "../lib/site";

import Layout from "../components/Layout";
import PageTemplateDetails from "../components/PageTemplateDetails";

function PageTemplate({ siteMetadata, data, params }) {
  const { generalSettings, page, pages, categories } = data;
  const { title } = generalSettings;

  const categoryNames = categories.nodes
    .map((node) => node.name)
    .filter((name) => name !== "Uncategorized");

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${category} - ${parse(title)}`}</title>
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
      console.log(node);
      return { params: { page: node.slug } };
    }),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = `
  query ($slug: String!) {
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

  return {
    props: {
      data: res.data,
      siteMetadata,
      params,
    },
  };
};

export default PageTemplate;
