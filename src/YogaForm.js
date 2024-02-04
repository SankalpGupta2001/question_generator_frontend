// src/YogaForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import { jsPDF } from "jspdf";
const excludeWords = /\b(|\*)+\b/g;

const YogaForm = ({ onGenerate }) => {

  const [topic,setTopic] = useState('');
  const [questiontype,setQuestionType] = useState('mcq');
  const [generatedRoutines, setGeneratedRoutines] = useState([]);



  const handleGenerate = async () => {
    try {


      console.log(topic,"topic",questiontype,"questionType");
      const response = await axios.post('https://question-generator-do61.onrender.com/generate-questions', {
        topic:topic,
        questionType:questiontype
      });
      

      onGenerate(response.data.questions);
      setGeneratedRoutines(response.data.questions);
    } catch (error) {
      console.error('Error generating routine:', error);
    }
  };

 
  return (
    <div className="yoga-form" >
      <h2>Question Generator</h2>
      <div className="form-group">
        <label className="label">Topic</label>
        <input
          type="text"
          className="input-field"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">QuestionType</label>
        <select
          className="select-field"
          value={questiontype}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="mcq">MCQ</option>
          <option value="truefalse">True or False</option>
          <option value="fillintheblanks">Fill in the Blanks</option>
          <option value="subjective">Subjective</option>

        </select>
      </div>
      <div className="button-group">
        <button className="generate-button" onClick={handleGenerate}>
          Generate Questions
        </button>
        
     </div>
    </div>

  );
};

export default YogaForm;
