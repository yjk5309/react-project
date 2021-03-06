import axios from 'axios'
import {Button, ProgressBar} from 'react-bootstrap';
import React,{useState, useEffect, useMemo, useCallback, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Test.css';
import {UrlContext} from './Context'

export default function User() {
    //이름 성별
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [invalidMessage, setInvalidMessage] = useState("")

    function handleNameChange(e) {
        console.log(e.target.value);
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
        if (regex.test(e.target.value)) {
          setName(e.target.value);
          setInvalidMessage("");
        } else if (e.target.value === '') {
          setName("");
          setInvalidMessage("이름은 필수값입니다");
        } else {
          setName("");
          setInvalidMessage("이름은 한글과 영어만 가능합니다")
        }
      }
    

    function handleGender(e){
        setGender(e.target.value);
    }

    //검사 예시
    const [checked, setChecked] = useState('');

    function handleCheck(e){
        setChecked(e.target.value);
    }

    const apiKey = process.env.REACT_APP_API_KEY;
    var apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=${apiKey}&q=6`

    //검사 진행
    const [questionList, setQuestionList] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [page, setPage] = useState(-2);
    const {url, setUrl} = useContext(UrlContext);
    const history = useHistory();
    const [now, setNow] = useState(0);

    const handleAnswerChange = (e) => {
        let result = [...answers];
        result[e.target.name - 1] = e.target.value;
        setAnswers(result);
        if((result.length !== answers.length) && (answers.length <= 11)){
            setNow(now+3);
        }else if((result.length !== answers.length) && (answers.length > 11)){
            setNow(now+4);
        }
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

    

    const handleSubmit = async e =>{
        var formatAnswers = "";

        for(var i =0;i<answers.length;i++){
            var answer = "B"+(i+1).toString()+"="+answers[i].toString()+" ";
            formatAnswers+=answer;
        }
        console.log(formatAnswers);
        var timestamp = new Date().getTime();
        var data = { 
            "apikey": apiKey,
            "qestrnSeq": "6", //검사번호
            "trgetSe": "100209", //일반인
            "name": name,
            "gender": gender,
            "startDtm": timestamp.toString(),
            "answers": formatAnswers
        }
        console.log(data);

        const response = await axios.post(`http://www.career.go.kr/inspct/openapi/test/report`, 
        data, {headers: {'Content-Type': 'application/json'}});
        console.log(response.data.RESULT.url.split('=')[1]);
        setUrl(response.data.RESULT.url.split('=')[1]);
        const seq = response.data.RESULT.url.split('=')[1]

        history.push('/completion/'+seq)
    }

    const progressInstance = <ProgressBar now={now} label={`${now}%`} />

    return(
        <>
        <div>
            {page === -2 &&
            <div>
                <h2>직업 가치관 검사</h2>
                <p>이름<br/>
                <input
                className={invalidMessage ? "is-invalid " : name ? "is-valid" : ""} 
                type='text' name='name' required onChange={handleNameChange} value={name} />
                <br/>
                <small className="text-danger">{invalidMessage}</small></p>
                <p>성별<br/>
                <input type='radio' name='gender' value='100323' onChange={handleGender} checked={gender === '100323'} />남성
                <input type='radio' name='gender' value='100324' onChange={handleGender} checked={gender === '100324'} />여성</p>
                <Button disabled={!name || !gender} onClick={handleNextPage}>검사 시작</Button>
            </div>}
            {page === -1 &&
             <div>
             <h2>검사 예시</h2>
             {progressInstance}
             <br />
             <div className="div" id="question">
             <h5>{exampleQuestion.question}</h5>
            <div>
                <label>
                <input type='radio' name='answer' value='1' onChange={handleCheck} checked={checked === '1'} />{exampleQuestion.answer01}
                </label>
                <label>
                <input type='radio' name='answer' value='2' onChange={handleCheck} checked={checked === '2'} />{exampleQuestion.answer02}
                </label>
            </div>
            </div>
             <Button onClick={handlePrevPage}>이전</Button>&nbsp;
             <Button onClick={handleNextPage} disabled={!checked}>다음</Button>
             </div>
            }
            {page >= 0 &&
            <div>
            <h2>검사 진행</h2>
            {progressInstance}
            <br />
            {visibleQuestion.map(
                (visibleQuestion) => (<div className="div">
                    <div id="question">
                        <p>{visibleQuestion.question}</p>
                        <div>
                            <label>
                            <input type='radio' name={visibleQuestion.qitemNo}
                             value={visibleQuestion.answerScore01}
                             onChange={handleAnswerChange}
                             checked = {answers[visibleQuestion.qitemNo-1] === visibleQuestion.answerScore01 } />
                             {visibleQuestion.answer01}</label>
                            <label>
                            <input type='radio' name={visibleQuestion.qitemNo}
                             value={visibleQuestion.answerScore02}
                             onChange={handleAnswerChange} 
                             checked = {answers[visibleQuestion.qitemNo-1] === visibleQuestion.answerScore02 }/>
                            {visibleQuestion.answer02}</label>
                        </div>
                    </div>
                </div>)
            )
            }
            <div className="button">
            <Button onClick={handlePrevPage}>이전</Button>
            {page === 5 ?
              <Link to='/completion'>
                  <Button onClick={handleSubmit} disabled={isButtonDisabled}>완료</Button></Link>
            :  <Button onClick={handleNextPage} disabled={isButtonDisabled}>다음</Button>
            }
            </div>
            </div>
        }
            
        </div>
        </>
    )
    
    
}