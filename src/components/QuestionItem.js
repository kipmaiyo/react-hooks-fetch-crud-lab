
import React from "react";

function QuestionItem({ question, deletF }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function updateCorrect(e) {
    console.log(e.target.value);
    const newCorrect = e.target.value;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrect }),
    });
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateCorrect}>
          {options}
        </select>
      </label>
      <button onClick={() => deletF(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;