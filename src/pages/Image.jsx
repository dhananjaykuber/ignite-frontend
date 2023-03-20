import React from 'react';
import { Link } from 'react-router-dom';

const Image = () => {
  return (
    <div>
      <img src="/rules.png" alt="rules" style={{ width: 500, margin: 150 }} />
      <Link to="/appear">Test</Link>
    </div>
  );
};

export default Image;
