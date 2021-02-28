import React, { useState, useContext, useCallback, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UrlContext } from './Context'

export default function Result() {

    // const { url, setUrl } = useContext(UrlContext);
    //useParams로 사용 변경
    const { seq } = useParams();

    var apiUrl = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

    const [user, setUser] = useState({});
    const [score, setScore] = useState('');
    const [sort, setSort] = useState('');

    const fetchResults = useCallback(async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        setUser(response.data.user);
        setScore(response.data.result.wonScore);

        var eachScore = [];
        for(var i=0;i<splitScore.length-1;i++){
            eachScore.push(splitScore[i].substr(2,3));
        };
        console.log(eachScore);

    }, [apiUrl])
    
    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    const splitScore = score.split(' ');

    return (
        <div>
            <h2>검사 결과</h2>
            <p>
                이름: {user.name}
            </p>
            <p>
                성별: {user.grade === '100324' ? '여성' : '남성'}
                {/* 왜 grade안에 들어가있는지 모르겠습니다.. */}
            </p>
            
                <p>차트그리기</p>
            <Link><Button>다시 검사하기</Button></Link>
        </div>
    )
}