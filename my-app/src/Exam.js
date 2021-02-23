import axios from 'axios'
import React,{useState} from 'react'

export default function Exam() {

    var apiUrl = `https://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=심리검사변수`
    //왜 rejected 되는지
    const [ex, setEx] = useState([]);

    async function u(){
        const response = axios.get(apiUrl);
        console.log(response);
        setEx(response.data);
    }
    return(
        <div>
        <h2>검사 예시</h2>
        <h3>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</h3>
        <button onClick={u}>불러</button>
        <button>검사 시작</button>
        </div>
    )
  }