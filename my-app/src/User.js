import React from 'react'
import { Link } from 'react-router-dom';

export default function User({name, sex}) {
    return(
        <div>
            <h2>직업 가치관 검사</h2>
        <p>이름<br/>
        <input type='text' name='name' required /></p>
        <p>성별<br/>
        <input type='radio' name='sex' value='남성' />남성
        <input type='radio' name='sex' value='여성' />여성</p>
        <Link to='/exam'><button>검사 시작</button></Link>
        </div>
    )
}