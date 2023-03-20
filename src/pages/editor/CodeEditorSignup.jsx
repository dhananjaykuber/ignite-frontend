import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeEditorVertficationPopup from './CodeEditorVertficationPopup';
import { setError } from '../../redux/toastSlice';
import styles from '../../styles/pages/Register.module.css';

const CodeEditorSignup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [registrationid, setRegistrationid] = useState('');
  const [contact, setContact] = useState('');

  const [openVertficationPopup, setOpenVertficationPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('codetoken')) {
      navigate('/editor/exam');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/auth/login`,
        {
          qr_id: parseInt(registrationid),
          contact: contact,
        }
      );

      console.log(response.data);
      localStorage.setItem('codetoken', response.data.access_token);
      navigate('/editor/exam');
    } catch (error) {
      dispatch(setError("Invalid registration id and contact number'"));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register} style={{ padding: '0px' }}>
      <img src="/ignite-logo.png" alt="ignite-logo" style={{ width: 150 }} />

      {openVertficationPopup && (
        <CodeEditorVertficationPopup
          setOpenVertficationPopup={setOpenVertficationPopup}
        />
      )}

      <h1>Bug Bounty Round - II</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="registerid"
              className={styles.formcontrol}
              required
              value={registrationid}
              onChange={(e) => setRegistrationid(e.target.value)}
            />
            <label htmlFor="registerid" className={styles.floatinglabel}>
              Registration ID <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="contact"
              className={styles.formcontrol}
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <label htmlFor="contact" className={styles.floatinglabel}>
              Contact <span>*</span>
            </label>
          </div>
        </div>
        <button disabled={loading} style={{ margin: 0 }}>
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CodeEditorSignup;
