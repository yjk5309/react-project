import axios from 'axios'
import {Button} from 'react-bootstrap';
import React,{useState, useEffect, useMemo, useCallback} from 'react'
import { Link } from 'react-router-dom';
import './Test.css';

export default function Test() {

    var apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=6`

    const [questionList, setQuestionList] = useState([]);
    const [answer, setAnswerList] = useState({id:'', answer:''});
    const [page, setPage] = useState(0);
    const [check, setCheck] = useState(0);

    const handleAnswer = e =>{
        setAnswerList(state =>({...state, [e.target.name]: e.target.value}));
        setCheck(check+1);
      }
    
    function handleNextPage(){
        setPage(page+1)
    }

    function handlePrevPage(){
        setPage(page-1)
    }

    const fetchQuestions = useCallback(async () =>{
        const response = await axios.get(apiUrl);
        setQuestionList(response.data.RESULT);
    }, [apiUrl])

    useEffect(() => {
        fetchQuestions();
      }, [fetchQuestions]);
    
    const q = questionList.map(
        (questionList) => (<div>
            <div id="question">
                <p>{questionList.question}</p>
                <div>
                    <input type='radio' name={`B${questionList.qitemNo}`} value={questionList.answerScore01}
                     onChange={handleAnswer} />{questionList.answer01}
                    <input type='radio' name={`B${questionList.qitemNo}`} value={questionList.answerScore02}
                     onChange={handleAnswer} />{questionList.answer02}
                </div>
            </div>
        </div>)
    )

    const visibleQuestion = useMemo(() => {
        return q.slice(page*5,(page+1)*5)
    },[page,q]);
    console.log(answer);

    // const isButtonDisabled = useMemo(() => {
    //     let isDisabled = false;
    //     visibleQuestion.forEach((question) => {
    //       const index = parseInt(question.qitemNo, 10);
    //       if (!answer[index - 1]) {
    //         isDisabled = true;
    //       }
    //     });
    //     return isDisabled;
    //   }, [answer, visibleQuestion]);

    return(
        <div>
            검사시작
            {visibleQuestion}
            {page ?
            <Button onClick={handlePrevPage}>이전</Button>
            : <Link to='/example'><Button onClick={handlePrevPage}>이전</Button></Link>}
            {page === 5 ?
              <Link to='/completion'>
                  <Button onClick={handleNextPage}>완료</Button></Link>
            :  <Button onClick={handleNextPage} >다음</Button>
            }
        </div>
    )
    
    
}