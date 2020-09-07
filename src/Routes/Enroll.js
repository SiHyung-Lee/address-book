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
                name: val && event.target.id === 'name' ? val : this.state.person.name,
                telephone:
                    val && event.target.id === 'telephone' ? val : this.state.person.telephone,
                email: val && event.target.id === 'email' ? val : this.state.person.email,
                address: val && event.target.id === 'address' ? val : this.state.person.address,
            },
        });
    };

    handleSubmit = () => {
        this.setState({
            people: this.state.people.concat(this.state.person),
        });
    };

    handleTitle = (info) => {
        let title;
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

    handleModify = (idx) => {
        this.setState({
            people: [],
        });
    };

    handleDelete = (idx) => {
        this.setState({
            people: [
                ...this.state.people.slice(0, idx),
                ...this.state.people.slice(idx + 1, this.state.people.length),
            ],
        });
    };

    render() {
        const { person, people } = this.state;
        console.log(people);
        return (
            <>
                <form className='enroll-form'>
                    <fieldset className='uk-fieldset'>
                        <legend className='uk-legend'>등록</legend>
                        {Object.keys(person).map((info, idx) => (
                            <div className='uk-margin' key={idx}>
                                <input
                                    type='text'
                                    className='uk-input'
                                    id={info}
                                    value={info.key}
                                    placeholder={this.handleTitle(info)}
                                    onChange={this.handleChange}
                                />
                            </div>
                        ))}
                        <button
                            type='button'
                            className='uk-button uk-button-default uk-margin'
                            onClick={this.handleSubmit}
                        >
                            등록
                        </button>
                    </fieldset>
                </form>

                <div className='enroll-list'>
                    <table className='uk-table uk-table-divider'>
                        <colgroup>
                            <col width='10%' />
                            <col width='15%' />
                            <col width='25%' />
                            <col width='' />
                            <col width='20%' />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>연락처</th>
                                <th>메일</th>
                                <th colSpan='2'>주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((person, idx) => (
                                <tr key={idx}>
                                    <td>{person.name}</td>
                                    <td>{person.telephone}</td>
                                    <td>{person.email}</td>
                                    <td>{person.address}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='uk-button uk-button-secondary uk-button-small uk-margin-small-right'
                                            onClick={() => this.handleModify(idx)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type='button'
                                            className='uk-button uk-button-secondary uk-button-small'
                                            onClick={() => this.handleDelete(idx)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Enroll;
