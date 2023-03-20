import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/pages/Admin.module.css';
import { setError, setSuccess } from '../../redux/toastSlice';

const options = ['bugbounty', 'aptitude'];

const ListQuestions = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.admin);

  const [state, setState] = useState('bugbounty');

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getQuestions('bugbounty');
  }, []);

  const onEventChange = (e) => {
    setState(e.target.value);
    getQuestions(e.target.value);
  };

  const getQuestions = async (state) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/category/get-questions/${state}`
      );

      setEntries(response.data);
    } catch (error) {
      dispatch(setError('Error occured while getting questions'));
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    console.log(_id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_NODE_BACKEND}/apinode/quiz/delete-quiz/${state}?id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${data}`,
          },
        }
      );

      dispatch(setSuccess(response.data.message));
    } catch (error) {
      console.log(error);
      dispatch(setError('Error occured while deleting question'));
    }
  };

  return (
    <div className={styles.list}>
      <h3>List Of Questions</h3>
      <div className={styles.options}>
        <select onChange={onEventChange} style={{ marginBottom: 0 }}>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        {/* <button onClick={getQuestions}>Load</button> */}
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

      <div className={styles.questions}>
        {entries?.map((entry) => (
          <div className={styles.question}>
            <button
              className={styles.delete}
              onClick={() => handleDelete(entry._id)}
            >
              Delete
            </button>

            <h6 dangerouslySetInnerHTML={{ __html: entry.question }}></h6>

            {entry.options.map((option) => (
              <p style={{ color: entry.answer === option && 'red' }}>
                {option}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListQuestions;
