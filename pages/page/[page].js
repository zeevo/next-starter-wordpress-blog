import React from "react";
import Head from "next/head";

import parse from "html-react-parser";

import Layout from "../components/Layout";
import PageTemplateDetails from "../../components/PageTemplateDetails";

function PageTemplate(props) {
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
        <PageTemplateDetails {...props} />
      </div>
    </Layout>
  );
}

export const getStaticPaths = () => {};
export const getStaticProps = () => {};

export default PageTemplate;
