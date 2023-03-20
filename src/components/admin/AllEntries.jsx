import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/pages/Admin.module.css';
import { useSelector } from 'react-redux';

const options = [
  'Bug Bounty',
  'Mock Placement',
  'Design-X',
  'Hackathon',
  'Escape Room',
];

const AllEntries = () => {
  const { data } = useSelector((store) => store.admin);

  const [state, setState] = useState('Bug Bounty');

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    handleLoad('Bug Bounty');
  }, []);

  const onEventChange = (e) => {
    setState(e.target.value);
    handleLoad(e.target.value);
  };

  const handleLoad = async (state) => {
    setEntries([]);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/auth/registration/${state}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin')}`,
          },
        }
      );

      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>All Entries</h3>
      <div className={styles.options}>
        <select onChange={onEventChange} style={{ marginBottom: 0 }}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={() => handleLoad(state)}>Load</button>
      </div>

      <table border={1}>
        <tr>
          <th>QR ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
        </tr>
        {entries.map((entry) => (
          <tr key={entry.qr_id}>
            <td>{entry.qr_id}</td>
            <td>
              {entry.first_name} {entry.last_name}
            </td>
            <td>{entry.email}</td>
            <td>{entry.contact}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AllEntries;
