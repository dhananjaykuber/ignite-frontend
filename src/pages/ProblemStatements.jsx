import React from 'react';

const ProblemStatements = () => {
  return (
    <div style={{ margin: '200px 0px', padding: '30px' }}>
      <h1>Hackathon Problem Statements</h1>
      <ol>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Develop a solution to track real-time location of (PMPML) buses,
          displaying their number, (current) route, and intermediate stops.
        </li>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Build a platform that onboards and lists medical stores/pharmacists,
          where a user or customer can check stores nearest to them. The
          platform allows the customer to search for a medicine. This search
          alerts the medical stores/pharmacists in and around their locality
          within a 5km radius, about the customer's requirement to which the
          store can respond with availability status and their selling
          price(whether MRP or Discounted)
        </li>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Build a platform for 'problem-solvers' where people who want to tackle
          real-world problems can come together, have discussions and also share
          threads with potential investors registered on the platform itself.
        </li>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Build a web application which will have all the textual NLP features
          like grammar checking, paraphrasing and text-generation, text
          summarization, sentiment analysis. You can use any online pre-trained
          model or open source API for this.
        </li>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Social media application for college where students can share their
          achievements and activities. Others can like, comment and share the
          posts on their timelines.
        </li>
        <li style={{ margin: '20px', fontSize: '1.5rem' }}>
          Develop a tool for real estate agents for house price evaluation based
          on provided parameters like area, age of property. You have to develop
          an UI to accept the parameters and give prediction based on it. You
          can decide which features/ columns you want to use.
        </li>
      </ol>
    </div>
  );
};

export default ProblemStatements;
