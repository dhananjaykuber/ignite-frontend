import React from 'react';
import styles from '../../styles/pages/Editor.module.css';

const Question = ({ questionIndex, question }) => {
  return (
    <div
      className={`${styles.left} ${styles.question}`}
      style={{ paddingBottom: '80px' }}
    >
      <h2>
        {questionIndex + 1} &#41; &nbsp;{question.question_title}
      </h2>
      <p>{question.question_description}</p>
    </div>
  );
};

export default Question;
