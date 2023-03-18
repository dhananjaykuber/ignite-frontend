import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Events.module.css';

const Appear = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.events}>
      <div className={styles.allEvents}>
        <div className={styles.event}>
          <div className={styles.content}>
            <div className={styles.contentOverlay}></div>
            <img src="/events/bugbounty.png" alt="bug bounty" />
            <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
              <h4>
                Bug Bounty <br />
                Round - I
              </h4>
              <button
                onClick={() => {
                  navigate('/quiz/bugbounty?name=Bug Bounty');
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
        <div className={styles.event}>
          <div className={styles.content}>
            <div className={styles.contentOverlay}></div>
            <img src="/events/mockplacement.png" alt="Mock Placement" />
            <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
              <h4>Mock Placement</h4>
              <button
                onClick={() => {
                  navigate('/quiz/aptitude?name=Mock Placement');
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
        <div className={styles.event}>
          <div className={styles.content}>
            <div className={styles.contentOverlay}></div>
            <img
              src="/events/programming.png"
              alt="Bug Bounty Round II"
              style={{ width: 150 }}
            />
            <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
              <h4>
                Bug Bounty <br />
                Round - II
              </h4>
              <button
                onClick={() => {
                  navigate('/editor/login');
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appear;
