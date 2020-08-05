import { request } from 'graphql-request';

import { getSiteMetadata } from './site';

const getPostById = async id => {
  const wpgraphql = getSiteMetadata().WPGraphQL;
  const query = /* GraphQL */ `
    query($id: ID!) {
      post(id: $id) {
        id
        slug
        title
        content
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `;

  const myData = await request(wpgraphql, query, { id });
  return myData.post;
};

export const getPostByUri = async uri => {
  const wpgraphql = getSiteMetadata().WPGraphQL;
  const query = /* GraphQL */ `
    query {
      posts {
        edges {
          node {
            id
            uri
          }
        }
      }
    }
  `;

  const uris = await request(wpgraphql, query);
  const joinedUri = `/${uri.join('/')}/`;
  const post = uris.posts.edges.find(({ node }) => node.uri === joinedUri);
  const id = post.node.id;
  return getPostById(id);
};

export const getPostPaths = async () => {
  const wpgraphql = getSiteMetadata().WPGraphQL;

  const query = /* GraphQL */ `
    query {
      posts {
        edges {
          node {
            id
            uri
          }
        }
      }
    }
  `;

  const data = await request(wpgraphql, query);
  return data.posts.edges.map(edge => edge.node.uri);
};
