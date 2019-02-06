import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './footer.scss';

function Footer({location: {pathname}}) {
  const hideFooter = pathname === '/login' || pathname === '/register'

  return (
    hideFooter ? null :
    <footer className="p-3 text-center">
      Copyright &copy; {new Date().getFullYear()} | FUTURE
    </footer>
  );
}

export default withRouter(Footer);

