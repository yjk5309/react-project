import React, { useState, useContext, useCallback, useEffect, PureComponent } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { UrlContext } from './Context'
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  } from 'recharts';

export default function Result() {

    // const { url, setUrl } = useContext(UrlContext);
    //useParams로 사용 변경
    const { seq } = useParams();

    var apiUrl = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

    const [user, setUser] = useState({});
    const [score, setScore] = useState('');
    const [firstScore, setFirstScore] = useState('');
    const [secondScore, setSecondScore] = useState('');
    const [data, setData] =useState(null);

    const fetchResults = useCallback(async () => {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        setUser(response.data.inspct);
        setScore(response.data.result.wonScore);

        const splitScore = score.split(' ');

        var eachScore = [];
        for(var i=0;i<splitScore.length-1;i++){
            eachScore.push(parseInt(splitScore[i].substr(2,3),10));
        };
        console.log(eachScore);

        const data = [
            {
              subject: '능력발휘', A: eachScore[0], B: 110, fullMark: 7,
            },
            {
              subject: '자율성', A: eachScore[1], B: 130, fullMark: 7,
            },
            {
              subject: '보수', A: eachScore[2], B: 130, fullMark: 7,
            },
            {
              subject: '안정성', A: eachScore[3], B: 100, fullMark: 7,
            },
            {
              subject: '사회적 인정', A: eachScore[4], B: 90, fullMark: 7,
            },
            {
              subject: '사회봉사', A: eachScore[5], B: 85, fullMark: 7,
            },
            {
                subject: '자기계발', A: eachScore[6], B: 85, fullMark: 7,
            },
            {
                subject: '창의성', A: eachScore[7], B: 85, fullMark: 7,
            },
          ];
        setData(data);

        let eachScore2 = eachScore.slice(); //배열 깊은 복사같은 얕은 복사
        let sorts = eachScore2.sort((a,b) => b - a);
        console.log(sorts);
        let firstScoreIndex = eachScore.indexOf(sorts[0]);
        let secondScoreIndex = eachScore.indexOf(sorts[1]);
        setFirstScore(firstScoreIndex+1);
        setSecondScore(secondScoreIndex+1);

    }, [apiUrl, firstScore, score, secondScore]) //deps 추가로 해결
    
    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    const [jabs, setJabs] = useState([]);
    const [majors, setMajors] = useState([]);

    const fetchJabs = useCallback(async () => {
      var jabUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstScore}&no2=${secondScore}`
      var majorUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${firstScore}&no2=${secondScore}`

      // const careers = ['중졸이하','고졸','전문대졸','대졸','대학원졸'];
      // const majors = ['계열무관','인문','사회','교육','공학','자연','의학','예체능'];

      const jabResponse = await axios.get(jabUrl);
      console.log(jabResponse.data);
      setJabs(jabResponse.data);

      const majorResponse = await axios.get(majorUrl);
      setMajors(majorResponse.data);

    }, [firstScore, secondScore]) //deps 추가로 해결
    
    useEffect(() => {
      fetchJabs();
    }, [fetchJabs]);

    return (
        <div>
            <h2>직업 가치관 검사 결과표</h2>
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 
                따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 
                직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 
                또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
            <p>
                이름: {user.nm}
            </p>
            <p>
                성별: {user.sexdstn === 100324 ? '여성' : '남성'}
            </p>
            <p>
                검사일: {user.registDt}
            </p>
            <h3>직업 가치관 결과</h3>
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="result" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
            <h3>가치관과 관련이 높은 직업</h3>
            <h4>종사자 평균 학력별</h4>
            {jabs.map(
                (jabs) => (<div>
                    <a href ={ `http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${jabs[0]}`}>
                      {jabs[1]}</a>
                </div>)
            )
                }
            <h4>종사자 평균 전공별</h4>
            <Link to='/'><Button>다시 검사하기</Button></Link>
        </div>
    )
}