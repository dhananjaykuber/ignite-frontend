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
import convert from 'convert-seconds';
import styles from '../../styles/pages/Editor.module.css';

const langs = ['cpp'];

const CodeEditor = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('hello all');

  const [language, setLanguage] = useState('cpp');

  const [runLoading, setRunLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // code editor data
  const [question, setQuestion] = useState();

  let time = 0;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState();
  const [submitted, setSubmitted] = useState(false);

  const [curentTime, setCurrentTime] = useState(0);

  const notifyError = (message) => {
    toast.warn(message, {
      position: 'top-center',
      autoClose: 1000,
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
    // syncing
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/codebro/submissions/accept`,
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
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/auth/increase_time`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            },
          }
        );

        console.log('time icreased: ', response.data);
      } catch (error) {
        console.log(error);
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // get time of user
    const getTime = async () => {
      console.log('localstorage time is: ', localStorage.getItem('codetime'));

      if (localStorage.getItem('codetime') !== null) {
        time = parseInt(localStorage.getItem('codetime'));
        setCurrentTime(parseInt(localStorage.getItem('codetime')));
        localStorage.setItem(
          'codetime',
          parseInt(localStorage.getItem('codetime'))
        );

        const intervalId = setInterval(() => {
          setCurrentTime((prev) => prev + 1);

          time += 1;

          if (time >= 2400 * 2) {
            handleEndExam(true);
            navigate('/quiz/Bug Bounty Round II/submit');
            window.location.reload();
            return;
          }

          localStorage.setItem('codetime', time);
        }, 1000);

        return;
        return () => {
          clearInterval(intervalId);
        };
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/auth/get_time`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            },
          }
        );

        console.log('time is: ', response.data.time);

        if (response.data.time > 0) {
          time = response.data.time * 2;
          setCurrentTime(response.data.time * 2);
          localStorage.setItem('codetime', response.data.time * 2);
        } else {
          time = response.data.time;
          setCurrentTime(response.data.time);
          localStorage.setItem('codetime', response.data.time);
        }

        const intervalId = setInterval(() => {
          setCurrentTime((prev) => prev + 1);

          time += 1;

          if (time >= 2400 * 2) {
            handleEndExam(true);
            navigate('/quiz/Bug Bounty Round II/submit');
            window.location.reload();

            return;
          }

          localStorage.setItem('codetime', time);
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      } catch (error) {
        console.log(error);
      }
    };

    // get question ids of 7 questions
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/codebro/questions/test`,
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
        // console.log(response.data.questions);

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
          `${
            process.env.REACT_APP_FLASK_STUDYBRO_BACKEND
          }/api/codebro/questions/${
            JSON.parse(localStorage.getItem('codingquestions'))[questionIndex]
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
            },
          }
        );

        console.log('submitted: ', response.data.question.submitted);

        setSubmitted(response.data.question.submitted);

        if (response.data.question.submitted) {
          notifyError('You have already submitted the code');
        }

        console.log(response.data.question);
        setQuestion(response.data.question);

        if (response.data.question.submitted) {
          setCode(response.data.question.current_code);
          console.log('current code');
        } else {
          setCode(response.data.question.default_codes[language]);
          console.log('default code');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem('codetoken')) {
      navigate('/editor/login');
    } else {
      getTime();
      getQuestions();
    }
  }, []);

  // get signle question by id (for button click)
  const getSingleQuestion = async (index) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_FLASK_STUDYBRO_BACKEND
        }/api/codebro/questions/${
          JSON.parse(localStorage.getItem('codingquestions'))[index]
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
          },
        }
      );

      console.log('submitted: ', response.data.question.submitted);

      console.log(response.data.question);

      if (response.data.question.submitted) {
        notifyError('You have already submitted the code');
      }

      setSubmitted(response.data.question.submitted);

      console.log(response.data.question);
      setQuestion(response.data.question);

      if (response.data.question.submitted) {
        setCode(response.data.question.current_code);
        console.log('current code');
      } else {
        setCode(response.data.question.default_codes[language]);
        console.log('default code');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestionChange = (index) => {
    setQuestionIndex(index);
    getSingleQuestion(index);
    setSubmitted(false);
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
      setSubmitted(false);
    }
  };
  const prevQuestion = () => {
    if (questionIndex !== 0) {
      getSingleQuestion(questionIndex - 1);
      setQuestionIndex((questionIndex) => questionIndex - 1);
      setShowOutput(false);
      setSubmitted(false);
    }
  };

  // handle editor change event
  function handleCodeChange(value) {
    setCode(value);
  }

  // helper functions
  const handleRun = async () => {
    setRunLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/codebro/submissions/accept`,
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
    } finally {
      setRunLoading(false);
    }

    setShowOutput(true);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
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
                `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/codebro/submissions/accept`,
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

              setSubmitted(true);
              console.log(response.data.message);
              notifySuccess(response.data.message);
            } catch (error) {
              console.log(error);
              notifySuccess('Code submitted successfully');
            } finally {
              setSubmitLoading(false);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            setSubmitLoading(false);
          },
        },
      ],
    });
    //
  };

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FLASK_STUDYBRO_BACKEND}/api/codebro/submissions/accept`,
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
    } finally {
      setSyncLoading(false);
    }
  };

  const handleEndExam = async (submit) => {
    // clear localstorage of exam
    if (submit) {
      // write here to end exam
      console.log('ending your exam');
      localStorage.clear();
      return;
    }

    // alert popup
    confirmAlert({
      title: 'Confirm to end exam',
      message:
        'Are you sure to do this? After ending exam, you will not be able attempt it again.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            alert(curentTime / 2);
          },
        },
        {
          label: 'No',
          onClick: () => {
            alert('No');
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className={styles.editorHeader}>
        <img src="/codebro.png" alt="ignite-logo" style={{ width: '200px' }} />
        <h2>
          {convert(2400 - curentTime / 2).minutes.toString().length === 1 && 0}
          {convert(2400 - curentTime / 2).minutes}:
          {convert(2400 - curentTime / 2).seconds.toString().length === 1 && 0}
          {convert(2400 - curentTime / 2).seconds}
        </h2>
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

              <button
                style={{ background: 'red' }}
                onClick={() => handleEndExam(false)}
              >
                End Exam
              </button>
            </div>
          </div>
          <div className={styles.right}>
            {!submitted && (
              <>
                <div className={styles.options}>
                  <select onChange={onLanguageChange}>
                    {langs.map((lang) => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSync}
                  disabled={syncLoading || submitted}
                >
                  {syncLoading ? 'Syncing' : 'Sync'}
                </button>

                <div className={styles.run}>
                  <button
                    onClick={handleRun}
                    disabled={runLoading || submitted}
                  >
                    {runLoading ? 'Running' : 'Run'}
                  </button>
                  <button
                    className={styles.submit}
                    onClick={handleSubmit}
                    disabled={submitLoading || submitted}
                  >
                    {submitLoading ? 'Submiting' : 'Submit'}
                  </button>
                </div>
              </>
            )}
            {submitted && <h5>You have already submitted the code</h5>}
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
              disabled={submitted || submitLoading || syncLoading || runLoading}
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
