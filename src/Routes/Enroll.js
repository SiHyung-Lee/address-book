import React from 'react';

class Enroll extends React.Component {
    state = {
        person: {
            name: 'a',
            telephone: 'b',
            email: 'c',
            address: 'd',
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
        let val = event.target.value;
        this.setState({
            person: {
                name:
                    val && event.target.id === 'name'
                        ? val
                        : this.state.person.name,
                telephone:
                    val && event.target.id === 'telephone'
                        ? val
                        : this.state.person.telephone,
                email:
                    val && event.target.id === 'email'
                        ? val
                        : this.state.person.email,
                address:
                    val && event.target.id === 'address'
                        ? val
                        : this.state.person.address,
            },
        });
    };

    handleSubmit = () => {
        this.setState({
            people: this.state.people.concat(this.state.person),
        });
    };

    handleTitle = (info) => {
        let title = '';
        switch (info) {
            case 'name':
                title = '이름';
                break;
            case 'telephone':
                title = '연락처';
                break;
            case 'email':
                title = '이메일';
                break;
            case 'address':
                title = '주소';
                break;
            default:
                title = '';
        }
        return title;
    };

    render() {
        const { person, people } = this.state;
        return (
            <>
                <div>
                    <ul className='uk-list uk-list-divider enroll-list'>
                        {Object.keys(person).map((info, idx) => (
                            <li key={idx}>
                                <strong className='uk-width-1-6'>
                                    {this.handleTitle(info)}
                                </strong>
                                <input
                                    type='text'
                                    className='uk-width-1-2'
                                    id={info}
                                    value={info.key}
                                    onChange={this.handleChange}
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        type='button'
                        className='uk-button uk-button-default'
                        onClick={this.handleSubmit}>
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
