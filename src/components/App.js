
import React, { useState, useEffect, useRef } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 1,
  });
  const [serverData, setServerData] = useState([]);
  const prevQuestionRef = useRef();

  const post = (nQ) => {
    console.log("post12");
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nQ),
    }).then((res) => res.json());
  };

  useEffect(() => {
    prevQuestionRef.current = newQuestion;
  }, [newQuestion]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setServerData(data));
  }, [newQuestion]);

  function submit(nQ) {
    setNewQuestion(nQ);
    post(nQ);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQ={submit} />
      ) : (
        <QuestionList questions={serverData} />
      )}
    </main>
  );
}

export default App;