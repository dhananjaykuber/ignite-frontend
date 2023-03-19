import React, { useEffect, useState } from 'react';
import Question from '../../components/editor/Question';
import Editor from '../../components/editor/Editor';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import styles from '../../styles/pages/Editor.module.css';

const langs = ['cpp'];

const CodeEditor = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('hello all');

  const [language, setLanguage] = useState('cpp');

  // code editor data
  const [question, setQuestion] = useState();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState();

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
  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  useEffect(() => {
    // get question ids of 7 questions
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/questions/test`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
              'Access-Control-Allow-Origin': '*',
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
    console.log('first');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/submissions/accept`,
        {
          typed_code: code,
          language: language,
          question_id: JSON.parse(localStorage.getItem('codingquestions'))[
            questionIndex
          ],
          submission_type: 'run',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      console.log(response.data);
      setOutput(response.data);
    } catch (error) {
      console.log(error.response.data);
      setOutput(error.response.data);
    }

    setShowOutput(true);
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
          onClick: async () => {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/submissions/accept`,
                {
                  typed_code: code,
                  language: language,
                  question_id: JSON.parse(
                    localStorage.getItem('codingquestions')
                  )[questionIndex],
                  submission_type: 'submit',
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                      'codetoken'
                    )}`,
                    'Access-Control-Allow-Origin': '*',
                  },
                }
              );

              console.log(response.data);
              notifySuccess('Code submitted successfully');
            } catch (error) {
              console.log(error.response.data);
              notifySuccess('Code submitted successfully');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
    //
  };

  const handleSync = async () => {
    console.log('sync');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/submissions/accept`,
        {
          typed_code: code,
          language: language,
          question_id: JSON.parse(localStorage.getItem('codingquestions'))[
            questionIndex
          ],
          submission_type: 'sync',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      console.log(response.data);
      notifySuccess(response.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className={styles.editorHeader}>
        <img
          src="/ignite-logo.png"
          alt="ignite-logo"
          style={{ width: '100px' }}
        />
        <h2>28:08</h2>
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
                    onClick={() => {
                      handleQuestionChange(index);
                      setShowOutput(false);
                    }}
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
            <button onClick={handleSync}>Sync</button>

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
                  output?.success ? styles.accepted : styles.notAccepted
                }
              >
                {output?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
