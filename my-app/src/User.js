import React,{useState} from 'react'
import { Link } from 'react-router-dom';

export default function User() {

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    function nameSetting(e){
        setName(e.target.value);
    }

    function genderSetting(e){
        setGender(e.target.value);
    }

    return(
        <div>
            <h2>직업 가치관 검사</h2>
        <p>이름<br/>
        <input type='text' name='name' required onChange={nameSetting} /></p>
        <p>성별<br/>
        <input type='radio' name='gender' value='100323' onChange={genderSetting} />남성
        <input type='radio' name='gender' value='100324' onChange={genderSetting} />여성</p>
        <Link to='/exam'><button disabled={!name || !gender}>검사 시작</button></Link>
        </div>
    )
}