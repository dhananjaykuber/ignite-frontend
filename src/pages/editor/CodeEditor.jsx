import React, { useEffect, useState } from 'react';
import Question from '../../components/editor/Question';
import Editor from '../../components/editor/Editor';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from '../../styles/pages/Editor.module.css';
import { useNavigate } from 'react-router-dom';

const langs = ['cpp', 'c', 'python'];

const CodeEditor = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('hello all');

  const [language, setLanguage] = useState('cpp');

  // code editor data
  const [questions, setQuestions] = useState([
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum0(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '1 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 1',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum1(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '2 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 2',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum2(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '3 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 3',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum3(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '4 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 4',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum4(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '5 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 5',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum5(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '6 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 6',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
    {
      message: 'Question found successfully',
      question: {
        _id: '39a16793-dadf-4905-922c-4155cd6a3461',
        current_code:
          'class Solution:\n    def twoSum6(self, nums: List[int], target: int) -> List[int]:\n        dict_of_x={}\n        len_of_nums=len(nums)\n        i=0\n        while i<len_of_nums:\n            val= target - nums[i]\n            if(val in dict_of_x):\n                return [dict_of_x[val],i]\n            dict_of_x[nums[i]]=i\n            i+=1',
        default_code: {
          python: 'def twoSum(nums: List[int], target: int) -> List[int]:',
        },
        difficulty: 2,
        function_name: 'twoSum',
        in_progress: true,
        question_description:
          '7 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
        question_title: 'Two Sum 7',
        tags: [],
        test_cases: [
          {
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
        ],
      },
      success: true,
    },
  ]);

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
    const getQuestions = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_FLASK_BACKEND}/api/codebro/questions/test`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('codetoken')}`,
          },
        }
      );

      console.log(response.data);
    };

    if (!localStorage.getItem('codetoken')) {
      navigate('/editor/login');
    } else {
      getQuestions();
    }
  }, []);

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // question navigation
  const nextQuestion = () => {
    if (questionIndex !== questions.length - 1) {
      setCode(questions[questionIndex].question.current_code);
      setQuestionIndex((questionIndex) => questionIndex + 1);
      setShowOutput(false);
    }
  };
  const prevQuestion = () => {
    if (questionIndex !== 0) {
      setCode(questions[questionIndex].question.current_code);
      setQuestionIndex((questionIndex) => questionIndex - 1);
      setShowOutput(false);
    }
  };

  // get all questions
  const getQuestions = async () => {
    setCode(questions[questionIndex]?.question?.current_code);
  };

  // handle editor change event
  function handleCodeChange(value) {
    setCode(value);
    // console.log(value);
  }

  useEffect(() => {
    getQuestions();
  }, []);

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
    <div className={styles.editorPage}>
      <div className={styles.header}>
        <img
          src="/ignite-logo.png"
          alt="ignite-logo"
          style={{ width: '55px' }}
        />
      </div>
      <div className={styles.container}>
        <div className={`${styles.left} ${styles.leftHeader}`}>
          <div className={styles.buttons}>
            <button className={styles.navButton} onClick={prevQuestion}>
              <FaAngleLeft />
            </button>

            {questions?.map((question, index) => (
              <button
                className={index === questionIndex && styles.activeQuestion}
                onClick={() => setQuestionIndex(index)}
                key={index}
              >
                Q. {index + 1}
              </button>
            ))}

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
        {/* <Question
          questionIndex={questionIndex}
          question={questions[questionIndex].question}
        /> */}

        <div className={styles.right}>
          {/* <Editor
            language={language}
            code={questions[questionIndex].question.current_code}
            handleCodeChange={handleCodeChange}
          /> */}

          <div className={` ${showOutput ? styles.output : styles.hideOutput}`}>
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
  );
};

export default CodeEditor;
