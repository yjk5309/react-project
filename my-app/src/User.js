import axios from 'axios'
import {Button} from 'react-bootstrap';
import React,{useState, useEffect, useMemo, useCallback} from 'react'
import { Link } from 'react-router-dom';
import './Test.css';

export default function User() {
    //이름 성별
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    function nameSetting(e){
        setName(e.target.value);
    }

    function genderSetting(e){
        setGender(e.target.value);
    }

    //검사 예시
    const [checked, setChecked] = useState('');

    function handleCheck(e){
        setChecked(e.target.value);
    }

    var apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=6`

    //검사 진행
    const [questionList, setQuestionList] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [page, setPage] = useState(-2);

    const handleAnswer = (e) => {
        let result = [...answers];
        result[e.target.name - 1] = e.target.value; 
        setAnswers(result); 
      };

    const fetchQuestions = useCallback(async () =>{
        const response = await axios.get(apiUrl);
        setQuestionList(response.data.RESULT);
    }, [apiUrl])

    useEffect(() => {
        fetchQuestions();
      }, [fetchQuestions]);

      function handleNextPage(){
        setPage(page+1);
    }

    function handlePrevPage(){
        setPage(page-1)
    }

    const visibleQuestion = useMemo(() => {
        return questionList.slice(page*5,(page+1)*5)
    },[page,questionList]);

    const exampleQuestion = useMemo(() => {
        return questionList[0]
    },[questionList]);

    console.log(name);
    console.log(gender);
    console.log(answers);

    const isButtonDisabled = useMemo(() => {
        let isDisabled = false;
        visibleQuestion.forEach((question) => {
          const index = parseInt(question.qitemNo, 10);
          if (!answers[index - 1]) {
            isDisabled = true;
          }
        });
        return isDisabled;
      }, [answers, visibleQuestion]);

    const handleSubmit = e =>{
        e.preventDefault();
        var formatAnswers = "";

        for(var i =0;i<answers.length;i++){
            var answer = "B"+(i+1).toString()+"="+answers[i].toString()+" ";
            formatAnswers+=answer;
        }
        console.log(formatAnswers);
        var timestamp = new Date().getTime();
        var data = { 
            "apikey": "0ae61054823ff25204fc658195732555",
            "qestrnSeq": "6", //검사번호
            "trgetSe": "100209", //일반인
            "name": name,
            "gender": gender,
            "startDtm": timestamp.toString(),
            "answers": formatAnswers
        }
        console.log(data);
        
        async function responseGet(){
            const response = await axios.post(`http://www.career.go.kr/inspct/openapi/test/report`, 
            data, {headers: {'Content-Type': 'application/json'}});
            console.log(response.data.RESULT);
    }
    responseGet();
    }
    //post로 데이터를 받아오기까지 성공했는데 받아온 것들을 넘겨주는 방법?(props? useParams?)

    return(
        <>
        <div>
            {page === -2 &&
            <div>
                <h2>직업 가치관 검사</h2>
                <p>이름<br/>
                <input type='text' name='name' required onChange={nameSetting} /></p>
                <p>성별<br/>
                <input type='radio' name='gender' value='100323' onChange={genderSetting} />남성
                <input type='radio' name='gender' value='100324' onChange={genderSetting} />여성</p>
                <Button disabled={!name || !gender} onClick={handleNextPage}>검사 시작</Button>
            </div>}
            {page === -1 &&
             <div>
             <h2>검사 예시</h2>
             <h4>{exampleQuestion.question}</h4>
            <div>
                <label>
                <input type='radio' name='answer' value='1' onChange={handleCheck} />{exampleQuestion.answer01}
                </label>
                <label>
                <input type='radio' name='answer' value='2' onChange={handleCheck} />{exampleQuestion.answer02}
                </label>
            </div>
             <Button onClick={handlePrevPage}>이전</Button>
             <Button onClick={handleNextPage} disabled={!checked}>다음</Button>
             </div>
            }
            {page >= 0 &&
            <div>
            <h2>검사 진행</h2>
            {visibleQuestion.map(
                (visibleQuestion) => (<div>
                    <div id="question">
                        <p>{visibleQuestion.question}</p>
                        <div>
                            <label>
                            <input type='radio' name={visibleQuestion.qitemNo}
                             value={visibleQuestion.answerScore01}
                             onChange={handleAnswer}
                             checked = {answers[visibleQuestion.qitemNo-1] === visibleQuestion.answerScore01 } />
                             {visibleQuestion.answer01}</label>
                            <label>
                            <input type='radio' name={visibleQuestion.qitemNo}
                             value={visibleQuestion.answerScore02}
                             onChange={handleAnswer} 
                             checked = {answers[visibleQuestion.qitemNo-1] === visibleQuestion.answerScore02 }/>
                            {visibleQuestion.answer02}</label>
                        </div>
                    </div>
                </div>)
            )
            }
            <Button onClick={handlePrevPage}>이전</Button>
            {page === 5 ?
              <Link to='/completion'>
                  <Button onClick={handleSubmit} disabled={isButtonDisabled}>완료</Button></Link>
            :  <Button onClick={handleNextPage} disabled={isButtonDisabled}>다음</Button>
            }
            </div>
        }
            
        </div>
        </>
    )
    
    
}