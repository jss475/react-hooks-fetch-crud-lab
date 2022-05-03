import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [data, setData] = useState([])
  


  function handleDeleteClick(id){

    let configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`http://localhost:4000/questions/${id}`, configObj)
    .then(r => r.json())

    let questionList = data.filter(question => question.id !== id)
    setData(questionList)
  }

  //handle correct answer change
  function handleAnswerChange(id, qID){
    let configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'correctIndex': id
      })
    }

    fetch(`http://localhost:4000/questions/${qID}`, configObj)
    .then(r => r.json())
    .then(data => console.log(data))
  }


  //fetch the data
  useEffect(()=> {
    fetch('http://localhost:4000/questions')
    .then(r=> r.json())
    .then(data=> {
    console.log(data);
    setData(data)
    })
  },[])
  

  let questionList = data.map(question => {
    return <QuestionItem key = {question.id} question={question} handleDeleteClick={handleDeleteClick} handleAnswerChange = {handleAnswerChange}/>
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
