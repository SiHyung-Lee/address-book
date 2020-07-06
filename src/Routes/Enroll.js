import React from 'react';

const Enroll = () => {
    return (
        <>
            <h2>Enroll</h2>
            <ul className='uk-list uk-list-divider enroll-list'>
                <li>
                    <strong className='uk-width-1-6'>이름</strong>
                    <input className='uk-width-1-2' />
                </li>
                <li>
                    <strong className='uk-width-1-6'>연락처</strong>
                    <input className='uk-width-1-2' />
                </li>
                <li>
                    <strong className='uk-width-1-6'>이메일</strong>
                    <input className='uk-width-1-2' />
                </li>
                <li>
                    <strong className='uk-width-1-6'>주소</strong>
                    <input className='uk-width-1-2' />
                </li>
            </ul>
        </>
    );
};

export default Enroll;
