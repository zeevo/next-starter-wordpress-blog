import React from 'react';
import Head from 'next/head';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        <Head defaultTitle="Gatsby Starter Zeevo">
          <title>Gatsby Starter Zeevo</title>
        </Head>
        {children}
      </div>
    );
  }
}

export default Layout;
