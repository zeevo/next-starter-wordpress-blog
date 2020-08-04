import { createApolloFetch } from "apollo-fetch";

export const getPostBySlug = async (slug) => {
  const query = `
  {
    post {
      edges {
        node {
          slug
        }
      }
    }
  }
    `;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({
    query,
    variables: { id: params.id },
  });

  return data.pages.edges.find((edge) => node.slug === slug);
};
