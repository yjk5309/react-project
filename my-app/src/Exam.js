import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Exam() {

    var apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=6`

    const [q, setQ] = useState('');
    const [a, setA] = useState([]);
    const [checked, setChecked] = useState('');

    useEffect(() => {
        async function getQ(){
            const response = await axios.get(apiUrl);
            console.log(response.data.RESULT);
            const example = response.data.RESULT[0];
            setQ(example.question);
            setA([example.answer01, example.answer02]);
        }
        getQ();
    },[apiUrl]);

    function handleCheck(e){
        setChecked(e.target.value);
    }

    return(
        <div>
        <h2>검사 예시</h2>
        <h3>{q}</h3>
        <div>
            <input type='radio' name='answer' value='0' onChange={handleCheck} />{a[0]}
            <input type='radio' name='answer' value='1' onChange={handleCheck} />{a[1]}
        </div>
        <Link to='/test'><button disabled={!checked}>검사 시작</button></Link>
        </div>
    )
  }