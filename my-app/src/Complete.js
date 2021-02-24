import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default function Complete() {

    return(
        <div>
            <h2>검사가 완료되었습니다</h2>
            <Button>결과보기</Button>
        </div>
    )
}