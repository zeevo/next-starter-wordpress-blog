import React from 'react';
import Link from 'next/link';

const Navbar = props => (
  <nav className="header__nav text-right container">
    {/* <Link to="/" className="header__logo"></Link> */}
    <ul>
      {props.menu.map((item, i) => {
        if (item.external) {
          return (
            <a key={i} href={item.uri} className="header__item__link fade hide-mobile">
              {item.title}
            </a>
          );
        }
        return (
          <Link key={i} href={item.uri}>
            <a className="header__item__link fade hide-mobile">{item.title}</a>
          </Link>
        );
      })}
    </ul>
  </nav>
);

export default Navbar;
