import React from 'react';
import Head from 'next/head';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        <Head>
          <title>Next Starter Wordpress Blog</title>
          <html lang="en" />
        </Head>
        {children}
      </div>
    );
  }
}

export default Layout;
