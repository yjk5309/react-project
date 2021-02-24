import axios from 'axios'
import {Button} from 'react-bootstrap';
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Test.css';

export default function Test() {

    var apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=6`

    const [questionList, setQuestionList] = useState([]);
    const [answer, setAnswerList] = useState({id:'', answer:''});
    const [pageIndex, setPageIndex] = useState(0);

    const handleAnswer = e =>{
        setAnswerList(state =>({...state, [e.target.name]: e.target.value}))
      }
    
    function handlePage() {
        setPageIndex(pageIndex+5);
    }
    //문제를 5개씩 나누고 이동하는 부분 미완료

    useEffect(() => {
        axios
          .get(apiUrl)
          .then(response => {
              console.log(response.data.RESULT);
              setQuestionList(response.data.RESULT);
          });
      }, [apiUrl]);
    
    if(questionList !== []){
        const q = questionList.map(
            (questionList) => (<div>
                <div id="question">
                <p>{questionList.question}</p>
                <div>
                    <input type='hidden' name='id' onChange={handleAnswer} value={questionList.qitemNo} />
                    <input type='radio' name={questionList.qitemNo} value={questionList.answerScore01} onChange={handleAnswer} />{questionList.answer01}
                    <input type='radio' name={questionList.qitemNo} value={questionList.answerScore02} onChange={handleAnswer} />{questionList.answer02}
                </div>
                </div>
            </div>)
        )

        return(
            <div>
                검사시작
                {q[pageIndex]}
                {q[pageIndex+1]}
                {q[pageIndex+2]}
                {q[pageIndex+3]}
                {q[pageIndex+4]}
                <Button>이전</Button>
                <Button onChange={handlePage}>다음</Button>
            </div>
        )
    }
    
}