import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../redux/adminSlice';
import { setError } from '../../redux/toastSlice';
import styles from '../../styles/pages/Register.module.css';

const Admin = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.admin);

  const navigate = useNavigate();

  const [adminData, setData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (data) {
      navigate('/admin/dashboard');
    }
  }, [data]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/admin/login`,
        adminData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('admin', response.data.token);
      dispatch(setAdmin(response.data.token));
      navigate('/admin/dashboard');
    } catch (error) {
      dispatch(setError('Invalid username and password'));
      console.log(error);
    }
  };

  return (
    <div className={styles.register} style={{ paddingTop: 0 }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="text"
              id="username"
              className={styles.formcontrol}
              required
              value={adminData.username}
              onChange={(e) =>
                setData({ ...adminData, username: e.target.value })
              }
            />
            <label htmlFor="username" className={styles.floatinglabel}>
              Username <span>*</span>
            </label>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.floatinglabelgroup}>
            <input
              type="password"
              id="password"
              className={styles.formcontrol}
              required
              value={adminData.password}
              onChange={(e) =>
                setData({ ...adminData, password: e.target.value })
              }
            />
            <label htmlFor="password" className={styles.floatinglabel}>
              Password<span>*</span>
            </label>
          </div>
        </div>
        <button style={{ marginTop: 0 }}>Login</button>
      </form>
    </div>
  );
};

export default Admin;
