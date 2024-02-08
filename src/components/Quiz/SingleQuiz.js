import React from "react";
import { useState } from "react";

const SingleQuiz = ({ quiz, setSelectedOptions }) => {
  const { question, options } = quiz || {};
  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value)
        : [...prevSelectedOptions, value]
    );
  };
  // const handleSubmit = (event) => {};
  return (
    <>
      <div className="quiz">
        <h4 className="question">{question}</h4>

        <div className="quizOptions grid grid-cols-1 md:grid-cols-2">
          {options?.map((option) => (
            <label key={option.id} htmlFor={`option${option.id}_q2`}>
              <input
                type="checkbox"
                id={`option${option.id}_q2`}
                value={option.id}
                onChange={handleOptionChange}
              />
              {option?.option}
            </label>
          ))}
          {/* <button type="submit">Submit</button> */}
        </div>
      </div>
    </>
  );
};

export default SingleQuiz;
