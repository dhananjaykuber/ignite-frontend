import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../styles/pages/Events.module.css';

const Appear = () => {
  const navigate = useNavigate();

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const bugBounty = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/bugbounty`
      );

      if (response.data.live) {
        navigate('/quiz/bugbounty?name=Bug Bounty');
      } else {
        notifyError('Bug Bounty Round I is not live yet');
      }
      console.log(response.data.live);
    } catch (error) {
      console.log(error);
    }
  };
  const aptitude = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/aptitude`
      );

      if (response.data.live) {
        navigate('/quiz/aptitude?name=Mock Placement');
      } else {
        notifyError('Aptitude for Mock Placement is not live yet');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const bugBounty2 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/check-live/bugbounty2`
      );

      if (response.data.live) {
        navigate('/editor/login');
      } else {
        notifyError('Bug Bounty Round II is not live yet');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <button onClick={bugBounty}>Start Test</button>
            </div>
          </div>
        </div>

        <div className={styles.event}>
          <div className={styles.content}>
            <div className={styles.contentOverlay}></div>
            <img src="/events/mockplacement.png" alt="Mock Placement" />
            <div className={`${styles.contentDetails} ${styles.contentFadeIn}`}>
              <h4>Mock Placement</h4>
              <button onClick={aptitude}>Start Test</button>
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
              <button onClick={bugBounty2}>Start Test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appear;
