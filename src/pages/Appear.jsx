import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Events.module.css';

const Appear = () => {
  const navigate = useNavigate();
  const [bugbounty, setBugBounty] = useState(false);
  const [aptitude, setAptitude] = useState(false);
  const [bugbounty2, setBugBounty2] = useState(false);

  useEffect(() => {
    const bugBounty = async () => {
      try {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/bugbounty`
          );

          setBugBounty(response.data.live);
          console.log(response.data.live);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const aptitude = async () => {
      try {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/aptitude`
          );

          setAptitude(response.data.live);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const bugBounty2 = async () => {
      try {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/bugbounty2`
          );

          setBugBounty2(response.data.live);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    bugBounty();
    aptitude();
    bugBounty2();
  }, []);

  return (
    <div className={styles.events}>
      <div className={styles.allEvents}>
        {bugbounty && (
          <div className={styles.event}>
            <div className={styles.content}>
              <div className={styles.contentOverlay}></div>
              <img src="/events/bugbounty.png" alt="bug bounty" />
              <div
                className={`${styles.contentDetails} ${styles.contentFadeIn}`}
              >
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
        )}
        {aptitude && (
          <div className={styles.event}>
            <div className={styles.content}>
              <div className={styles.contentOverlay}></div>
              <img src="/events/mockplacement.png" alt="Mock Placement" />
              <div
                className={`${styles.contentDetails} ${styles.contentFadeIn}`}
              >
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
        )}
        {bugbounty2 && (
          <div className={styles.event}>
            <div className={styles.content}>
              <div className={styles.contentOverlay}></div>
              <img
                src="/events/programming.png"
                alt="Bug Bounty Round II"
                style={{ width: 150 }}
              />
              <div
                className={`${styles.contentDetails} ${styles.contentFadeIn}`}
              >
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
        )}
      </div>
    </div>
  );
};

export default Appear;
