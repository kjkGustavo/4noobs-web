import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Link, useHistory } from 'react-router-dom';

import getMarkdown from '../utils/getMarkdown';

function RouterLink(props) {
  return props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  );
}

function ResponsiveTable(props) {
  return (
    <div className="table-container">
      <table>{props.children}</table>
    </div>
  );
}

function Page({ match }) {
  const history = useHistory();

  const [markdown, setMardown] = useState('');

  useEffect(() => {
    getMarkdown(match, history).then((response) => {
      setMardown(response);
    });
  }, [match, history]);

  return (
    <main>
      <ReactMarkdown
        source={markdown}
        escapeHtml={false}
        renderers={{
          link: RouterLink,
          table: ResponsiveTable,
        }}
      />
    </main>
  );
}

export default Page;
