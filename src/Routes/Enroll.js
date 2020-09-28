import React from 'react';
import { firestore } from '../firebase';

class Enroll extends React.Component {
    state = {
        person: {
            name: '',
            telephone: '',
            email: '',
            address: '',
        },
        people: [],
    };

    componentDidMount() {
        const people = [...this.state.people];
        firestore
            .collection('address')
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    const person = doc.data();
                    people.push({
                        id: doc.id,
                        name: person.name,
                        telephone: person.telephone,
                        email: person.email,
                        address: person.address,
                    });
                    this.setState({
                        people,
                    });
                });
            });
    }

    switchModify = false;
    switchModifyIdx = null;

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

    handleSubmit = (e) => {
        e.preventDefault();

        /*this.setState({
            person: {
                name: '',
                telephone: '',
                email: '',
                address: '',
            },
            people: this.switchModify
                ? [
                      ...this.state.people.slice(0, this.switchModifyIdx),
                      this.state.person,
                      ...this.state.people.slice(
                          this.switchModifyIdx + 1,
                          this.state.people.length
                      ),
                  ]
                : this.state.people.concat(this.state.person),
        });*/
        firestore
            .collection('address')
            .add(this.state.person)
            .then((doc) => {
                const address = [...this.state.people, this.state.person];
                this.setState({
                    people: address,
                    person: {
                        id: '',
                        name: '',
                        telephone: '',
                        email: '',
                        address: '',
                    },
                });
            });

        this.switchModify = false;
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

    handleModify = (id) => {
        console.log(id);
        console.log(firestore.collection('address').doc(id));
        console.log(this.state.people);

        firestore
            .collection('address')
            .doc(id)
            .get()
            .then(() => {
                const item = this.state.people.filter((person) => person.id === id);
                console.log(item);
                /*this.setState({
                    person: {
                        name: item.name,
                        telephone: item.telephone,
                        email: item.email,
                        address: item.address,
                    },
                });*/
            });

        /*let modifyPerson = this.state.people[id];
        this.setState({
            person: {
                name: modifyPerson.name,
                telephone: modifyPerson.telephone,
                email: modifyPerson.email,
                address: modifyPerson.address,
            },
        });*/
        this.switchModify = true;
        this.switchModifyIdx = id;
    };

    handleDelete = (id) => {
        console.log(firestore.collection('address').doc(id));
        firestore
            .collection('address')
            .doc(id)
            .delete()
            .then(() => {
                const people = this.state.people.filter((person) => person.id !== id);
                this.setState({ people });
            });

        /*this.setState({
            people: [
                ...this.state.people.slice(0, idx),
                ...this.state.people.slice(idx + 1, this.state.people.length),
            ],
        });*/
    };

    render() {
        const { person, people } = this.state;
        return (
            <>
                <form className='enroll-form' onSubmit={this.handleSubmit}>
                    <fieldset className='uk-fieldset'>
                        <legend className='uk-legend'>등록</legend>
                        {Object.keys(person).map((info, idx) => (
                            <div className='uk-margin' key={idx}>
                                <input
                                    type='text'
                                    className='uk-input'
                                    id={info}
                                    value={this.state.person[info]}
                                    placeholder={this.handleTitle(info)}
                                    onChange={this.handleChange}
                                />
                            </div>
                        ))}
                        <button type='submit' className='uk-button uk-button-default uk-margin'>
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
                            {people.map((person) => (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>{person.telephone}</td>
                                    <td>{person.email}</td>
                                    <td>{person.address}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='uk-button uk-button-secondary uk-button-small uk-margin-small-right'
                                            onClick={() => this.handleModify(person.id)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type='button'
                                            className='uk-button uk-button-secondary uk-button-small'
                                            onClick={() => this.handleDelete(person.id)}
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
