
import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList(questions) {
  const questionD = questions.questions;
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    setQuestionsData(questionD);
  }, [questions]);
  const question = questionsData.map((d, i) => {
    return (
      <QuestionItem
        question={d}
        key={i}
        idt={Math.random()}
        deletF={deleteList}
      />
    );
  });
  function deleteList(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const newQD = questionsData.filter((list) => list.id !== id);
    setQuestionsData(newQD);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{question}</ul>
    </section>
  );
}

export default QuestionList;