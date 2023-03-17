import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/pages/Sponsors.module.css';

const Sponsors = () => {
  return (
    <div className={styles.sponsors}>
      <Helmet>
        <title>Mpulse Ignite 2023 | Sponsors</title>
      </Helmet>

      <h1>Sponsors</h1>

      <h2>Title Sponsor</h2>
      <img
        src="/sponsors/virtuthink.png"
        alt="virtuthink"
        style={{ marginBottom: 80, width: '300px' }}
        data-aos="fade-in"
      />

      <h2>Associate Sponsors</h2>
      <div className={styles.otherSponsors}>
        <img src="/sponsors/ogtech.png" alt="ogtech" />
        <img src="/sponsors/linkcode.jpg" alt="ogtech" />
        <img src="/sponsors/techr.jpg" alt="ogtech" />
      </div>
    </div>
  );
};

export default Sponsors;
