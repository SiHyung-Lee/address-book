import React from 'react';

class Enroll extends React.Component {
    state = {
        person: {
            name: '',
            telephone: '',
            email: '',
            address: '',
        },
        people: [
            {
                name: '이시형',
                telephone: '01047243923',
                email: 'buzzcatfish@gmail.com',
                address: '경기도 광명시 철산동',
            },
            {
                name: '조상우',
                telephone: '01012341234',
                email: 'mail@naver.com',
                address: '서울시 서초구 서초동',
            },
            {
                name: '류보라',
                telephone: '01056785678',
                email: 'afdgg@yahoo.com',
                address: '대구시 남구 대명동',
            },
            {
                name: '송병욱',
                telephone: '01035641286',
                email: 'hre@daum.net',
                address: '경기도 부천시 소사구 범박동',
            },
        ],
    };

    handleChange = (event) => {
        this.setState({
            person: {
                name: event.target.value,
            },
        });
    };

    render() {
        const { person, people } = this.state;
        console.log(person);
        return (
            <>
                <div>
                    <ul className='uk-list uk-list-divider enroll-list'>
                        <li>
                            <strong className='uk-width-1-6'>이름</strong>
                            <input
                                type='text'
                                className='uk-width-1-2'
                                value={person.name}
                                onChange={this.handleChange}
                            />
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
                    <button
                        type='button'
                        className='uk-button uk-button-default'>
                        등록
                    </button>
                </div>
                <table className='uk-table uk-table-divider'>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>메일</th>
                            <th>주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, idx) => (
                            <tr key={idx}>
                                <td>{person.name}</td>
                                <td>{person.telephone}</td>
                                <td>{person.email}</td>
                                <td>{person.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default Enroll;
