import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from '../../styles/pages/Editor.module.css';

const Editor = ({ language, code, handleCodeChange }) => {
  return (
    <MonacoEditor
      language={language}
      height="80vh"
      defaultValue="hello world"
      value={code}
      onChange={handleCodeChange}
      options={{
        theme: 'vs-dark',
        fontSize: 15,
        fontWeight: 500,
      }}
      className={styles.editor}
    />
  );
};

export default Editor;
