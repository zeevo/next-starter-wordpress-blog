import React from 'react';
import Link from 'next/link';

const Filter = props => {
  const { topic } = props;
  return (
    <li className="header__tab">
      <Link href="/category/[category]" as={`/category/${topic.toLowerCase()}`}>
        <a className="header__tab__link faded faded--60">{topic}</a>
      </Link>
    </li>
  );
};

const Categories = props => {
  const { categories } = props;
  return (
    <div className="header__tabs-wrap">
      <div className="container container--narrow">
        <ul className="header__tabs">
          <li className="header__tab">
            <Link href="/">
              <a className="header__tab__link faded faded--60">All</a>
            </Link>
          </li>
          {categories.map(topic => (
            <Filter key={topic} topic={topic} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
