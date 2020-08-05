import React from 'react';
import moment from 'moment';

import Navbar from './Navbar';

export default function Header(props) {
  const { title, subtitle, date, menu, background, children } = props;

  const finalBackground = background || '/background.jpg';

  return (
    <header className="header header--cover" style={{ backgroundImage: `url(${finalBackground})` }}>
      <Navbar menu={menu} />
      <section className="header__header container">
        <h1>{title}</h1>
        {subtitle ? <h3 style={{ fontWeight: 'normal' }}>{subtitle}</h3> : null}
        {date ? moment(date).format('MMMM D, YYYY') : null}
      </section>
      {children}
    </header>
  );
}
