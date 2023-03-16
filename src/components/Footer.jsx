import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInstagram } from 'react-icons/ai';
import styles from '../styles/components/Layout.module.css';

const Footer = () => {
  return (
    <footer>
      <Link to="/">
        <img src="/ignite-logo.png" alt="ignite-logo" />
      </Link>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/sponsors">Sponsors</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to={'https://www.instagram.com/mpulseignite/'}
              target="_blank"
            >
              <AiOutlineInstagram className={styles.socialIcon} />
            </Link>
          </li>
        </ul>
      </div>
      <p>Powered by Mpulse IgnITe 2023</p>
    </footer>
  );
};

export default Footer;
