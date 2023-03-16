import React, { useState } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import styles from '../styles/pages/Editor.module.css';
import Question from '../components/editor/Question';
import { FaAngleLeft, FaAngleRight, FaWindowClose } from 'react-icons/fa';

const langs = ['cpp', 'c', 'python'];

const CodeEditor = () => {
  const [code, setCode] = useState(``);

  const [language, setLanguage] = useState('cpp');

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRun = async () => {};

  const handleSubmit = async () => {};

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
            <button>Q. 1</button>
            <button>Q. 2</button>
            <button>Q. 3</button>
            <button>Q. 4</button>
            <button>Q. 5</button>
            <button>Q. 6</button>
            <button>Q. 7</button>
            <button className={styles.navButton}>
              <FaAngleLeft />
            </button>
            <button className={styles.navButton}>
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
            <button>Run</button>
            <button className={styles.submit}>Submit</button>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.rightContainer}`}>
        <Question />

        <div className={styles.right}>
          <MonacoEditor
            language={language}
            height="80vh"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            options={{
              theme: 'vs-dark',
              fontSize: 16,
              fontWeight: 500,
            }}
          />

          <div className={styles.output}>
            <FaWindowClose className={styles.close} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
