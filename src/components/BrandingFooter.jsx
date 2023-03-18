import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/components/Layout.module.css';

const BrandingFooter = () => {
  const { pathname } = useLocation();

  return (
    <footer
      className={styles.footerSponsors}
      style={{
        background: pathname.includes('editor') ? '#000000' : '#2b2141',
      }}
    >
      <p>Technical Sponsors</p>
      <div>
        <img src="/sponsors/techr.jpg" alt="techr-logo" />
        <img src="/sponsors/ogtech.png" alt="ogtech-logo" />
      </div>
      <p>Powered by Mpulse Ignite (PES Modern College Of Engineering)</p>
    </footer>
  );
};

export default BrandingFooter;
