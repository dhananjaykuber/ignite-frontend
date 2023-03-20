import React, { useEffect, useState } from 'react';
import axios from 'axios';
import convert from 'convert-seconds';
import styles from '../../styles/pages/Admin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccess } from '../../redux/toastSlice';

const options = ['bugbounty', 'aptitude'];

const CodeBro = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.admin);

  const [state, setState] = useState('bugbounty');

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    handleLoad('bugbounty');
  }, []);

  const onEventChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
    handleLoad(e.target.value);
  };

  const handleLoad = async (state) => {
    setEntries([]);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/get-entries/${state}`,
        {
          headers: {
            Authorization: `Bearer ${data}`,
          },
        }
      );

      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTest = async (_id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/admin//reset-test/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${data}`,
          },
        }
      );

      console.log(response.data);
      dispatch(setSuccess('Test reset successfully'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Coding Entries</h3>
      <div className={styles.options}>
        <select
          onChange={onEventChange}
          style={{ marginBottom: 0, marginLeft: 10 }}
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button onClick={() => handleLoad(state)}>Reload</button>
        <h4
          style={{
            color: '#fdfdfd',
            fontWeight: 500,
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Total: {entries?.length} {`(${state})`}
        </h4>
      </div>

      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Category</th>
          <th>Submitted</th>
          <th>Time</th>
          <th>Score</th>
          <th>Reset Test</th>
        </tr>
        {entries.map((entry) => (
          <tr key={entry._id}>
            <td>{entry.name}</td>
            <td>{entry.email}</td>
            <td>{entry.contact}</td>
            <td>{entry.category}</td>
            <td>{entry.submitted ? 'Yes' : 'No'}</td>
            <td>
              {convert(entry.time).minutes.toString().length === 1 && 0}
              {convert(entry.time).minutes}:
              {convert(entry.time).seconds.toString().length === 1 && 0}
              {convert(entry.time).seconds} mins
            </td>
            <td>{entry.score}</td>
            <td>
              <button onClick={() => resetTest(entry._id)}>Reset</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CodeBro;
