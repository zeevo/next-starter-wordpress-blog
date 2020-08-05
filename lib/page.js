import { createApolloFetch } from 'apollo-fetch';

import { getSiteMetadata } from './site';

export const getPageBySlug = async slug => {
  const uri = getSiteMetadata().WPGraphQL;
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

  let fetch = createApolloFetch({ uri });
  let { data } = await fetch({
    query,
  });
  const pageId = data.pages.edges.find(({ node }) => {
    return node.slug === slug;
  }).node.id;

  const pageQuery = `
  query ($id: ID!) {
    page(id: $id) {
      id
      slug
      title
      content
    }
  }
  `;

  fetch = createApolloFetch({ uri });
  ({ data } = await fetch({
    query: pageQuery,
    variables: { id: pageId },
  }));
  return data.page;
};
