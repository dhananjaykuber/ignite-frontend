import React, { useEffect, useState } from 'react';
import Question from '../../components/editor/Question';
import Editor from '../../components/editor/Editor';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from '../../styles/pages/Editor.module.css';

const langs = ['cpp', 'c', 'python'];

const CodeEditor = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('hello all');

  const [language, setLanguage] = useState('cpp');

  // code editor data
  const [question, setQuestion] = useState();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState({
    accepted: false,
    message:
      'Error: Traceback (most recent call last):\n  File "/Users/kaushalphulgirkar/Documents/Projects/StudyBro-backend/app/api/codebro/python_helper.py", line 66, in handle_python_submission\n    result = eval(f"solution.{question[\'function_name\']}(**{args})")\n  File "<string>", line 1, in <module>\nNameError: name \'solution\' is not defined\n',
    test_case: {
      args: [
        {
          data_type: 'list',
          key: 'nums',
          value: [2, 7, 11, 15],
        },
        {
          data_type: 'int',
          key: 'target',
          value: 9,
        },
      ],
      expected: {
        data_type: 'list',
        value: [0, 1],
      },
    },
  });

  useEffect(() => {
    // get question ids of 7 questions
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/questions/test`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            },
          }
        );

        localStorage.setItem(
          'codingquestions',
          JSON.stringify(response.data.questions)
        );
        console.log(response.data.questions);

        // get single question
        getSingleQuestion();
      } catch (error) {
        console.log(error);
        navigate('/editor/login');
        localStorage.clear();
      }
    };

    // get signle question by id
    const getSingleQuestion = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/questions/${
            JSON.parse(localStorage.getItem('codingquestions'))[questionIndex]
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            },
          }
        );

        console.log(response.data.question);
        setQuestion(response.data.question);
        setCode(response.data.question.default_codes[language]);
        console.log(response.data.question.default_codes[language]);
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem('codetoken')) {
      navigate('/editor/login');
    } else {
      getQuestions();
    }
  }, []);

  // get signle question by id (for button click)
  const getSingleQuestion = async (index) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/questions/${
          JSON.parse(localStorage.getItem('codingquestions'))[index]
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
          },
        }
      );

      console.log(response.data.question);
      setQuestion(response.data.question);
      setCode(response.data.question.default_codes[language]);
      console.log(response.data.question.default_codes[language]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestionChange = (index) => {
    setQuestionIndex(index);
    getSingleQuestion(index);
  };

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // question navigation
  const nextQuestion = () => {
    if (
      questionIndex !==
      JSON.parse(localStorage.getItem('codingquestions')).length - 1
    ) {
      getSingleQuestion(questionIndex + 1);
      setQuestionIndex((questionIndex) => questionIndex + 1);
      setShowOutput(false);
    }
  };
  const prevQuestion = () => {
    if (questionIndex !== 0) {
      getSingleQuestion(questionIndex - 1);
      setQuestionIndex((questionIndex) => questionIndex - 1);
      setShowOutput(false);
    }
  };

  // handle editor change event
  function handleCodeChange(value) {
    setCode(value);
  }

  // helper functions
  const handleRun = async () => {
    setShowOutput(true);
    console.log(code);
  };

  const handleSubmit = async () => {
    // alert popup
    confirmAlert({
      title: 'Confirm to submit',
      message:
        'Are you sure to do this? After submitting, you will not be able to edit the code again.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setShowOutput(true),
        },
        {
          label: 'No',
          // onClick: () => alert('Click No'),
        },
      ],
    });
    //
  };

  const handleSync = async () => {};

  return (
    <div>
      <div className={styles.editorHeader}>
        <img
          src="/ignite-logo.png"
          alt="ignite-logo"
          style={{ width: '100px' }}
        />
        <h2 style={{ color: '#fdfdfd', fontWeight: '500' }}>Mpulse Ignite</h2>
      </div>
      <div className={styles.editorPage}>
        <div className={styles.container}>
          <div className={`${styles.left} ${styles.leftHeader}`}>
            <div className={styles.buttons}>
              <button className={styles.navButton} onClick={prevQuestion}>
                <FaAngleLeft />
              </button>

              {JSON.parse(localStorage.getItem('codingquestions'))?.map(
                (question, index) => (
                  <button
                    className={index === questionIndex && styles.activeQuestion}
                    onClick={() => handleQuestionChange(index)}
                    key={index}
                  >
                    Q. {index + 1}
                  </button>
                )
              )}

              <button className={styles.navButton} onClick={nextQuestion}>
                <FaAngleRight />
              </button>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.options}>
              <select onChange={onLanguageChange}>
                {langs.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <button>Sync</button>

            <div className={styles.run}>
              <button onClick={handleRun}>Run</button>
              <button className={styles.submit} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.rightContainer}`}>
          <Question
            // questionIndex={questionIndex}
            question={question}
          />

          <div className={styles.right}>
            <Editor
              language={language}
              code={code}
              handleCodeChange={handleCodeChange}
            />

            <div
              className={` ${showOutput ? styles.output : styles.hideOutput}`}
            >
              <AiFillCloseCircle
                className={styles.close}
                onClick={() => setShowOutput(false)}
              />
              <p
                className={
                  output?.accepted ? styles.accepted : styles.notAccepted
                }
              >
                {output.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
