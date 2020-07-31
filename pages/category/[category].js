import React from "react";
import Head from "next/head";
import { graphql } from "gatsby";

import parse from "html-react-parser";

import Layout from "../components/Layout";
import CategoryTemplateDetails from "../../components/CategoryTemplateDetails";

function CategoryTemplate(props) {
  const { data, pageContext } = props;
  const { title } = data.wp.generalSettings;
  const { category } = pageContext;

  return (
    <Layout>
      <div>
        <Head>
          <title>{`${category} - ${parse(title)}`}</title>
          <meta name="description" content={`${title} - ${category}`} />
        </Head>
        <CategoryTemplateDetails {...props} />
      </div>
    </Layout>
  );
}

export const getStaticPaths = () => {};
export const getStaticProps = () => {};

export default CategoryTemplate;
