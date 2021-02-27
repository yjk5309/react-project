import React, {useState ,useContext, useCallback, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {UrlContext} from './Context'

export default function Result() {

    const {url, setUrl} = useContext(UrlContext);

    var apiUrl = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${url}`;

    const [results, setReults] = useState([]);

    const fetchResults = useCallback(async () =>{
        const response = await axios.get(apiUrl);
        setReults(response.data.RESULT);
        console.log(response);
    }, [apiUrl])

    useEffect(() => {
        fetchResults();
      }, [fetchResults]);

    return(
        <div>
            <h2>검사 결과</h2>
            <p>
            </p>
            <Link><Button>다시 검사하기</Button></Link>
        </div>
    )
}