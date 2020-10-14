import React from 'react';
import { firestore } from '../firebase';
import { Form, Input, Button, Table } from 'antd';

class Enroll extends React.Component {
    state = {
        person: {
            id: '',
            name: '',
            telephone: '',
            email: '',
            address: '',
        },
        people: [],
        formLayout: 'horizontal',
    };

    componentDidMount() {
        this.updateData();
    }

    switchModify = false;
    switchModifyIdx = null;

    updateData = () => {
        const people = [];
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
                        person: {
                            id: '',
                            name: '',
                            telephone: '',
                            email: '',
                            address: '',
                        },
                        people,
                    });
                });
            });
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

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.switchModify) {
            firestore
                .collection('address')
                .doc(this.switchModifyIdx)
                .update(this.state.person)
                .then(() => {
                    this.updateData();
                });
        } else {
            firestore
                .collection('address')
                .add(this.state.person)
                .then(() => {
                    this.updateData();
                });
        }

        this.switchModify = false;
    };

    handleTitle = (info) => {
        let title;
        switch (info) {
            case 'id':
                title = 'ID';
                break;
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
        firestore
            .collection('address')
            .doc(id)
            .get()
            .then(() => {
                const person = this.state.people.filter((person) => person.id === id)[0];
                this.setState({
                    person,
                });
            });
        this.switchModify = true;
        this.switchModifyIdx = id;
    };

    handleDelete = (id) => {
        firestore
            .collection('address')
            .doc(id)
            .delete()
            .then(() => {
                const people = this.state.people.filter((person) => person.id !== id);
                this.setState({ people });
            });
    };

    render() {
        const { person, people } = this.state;

        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                      labelCol: { span: 4 },
                      wrapperCol: { span: 14 },
                  }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                      wrapperCol: { span: 14, offset: 4 },
                  }
                : null;

        const { Column } = Table;

        const data = people;
        console.log(data);
        return (
            <>
                <Form layout={formLayout}>
                    {Object.keys(person).map((info, idx) =>
                        info === 'id' ? (
                            ''
                        ) : (
                            <Form.Item key={idx} label={this.handleTitle(info)} {...formItemLayout}>
                                <Input
                                    id={info}
                                    value={this.state.person[info]}
                                    onChange={this.handleChange}
                                />
                            </Form.Item>
                        )
                    )}
                    <Form.Item {...buttonItemLayout}>
                        <Button type='primary' onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Table dataSource={data}>
                    <Column title='Name' dataIndex='name' key='name' />
                    <Column title='Telephone' dataIndex='telephone' key='telephone' />
                    <Column title='Email' dataIndex='email' key='email' />
                    <Column title='Address' dataIndex='address' key='address' />
                </Table>

                <div className='enroll-list'>
                    {/*<table className='uk-table uk-table-divider'>
                        <colgroup>
                            <col width='10%' />
                            <col width='15%' />
                            <col width='25%' />
                            <col width='' />
                            <col width='20%' />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cellphone</th>
                                <th>Email</th>
                                <th colSpan='2'>Address</th>
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
                                        <Button
                                            type='default'
                                            onClick={() => this.handleModify(person.id)}
                                        >
                                            Modify
                                        </Button>
                                        <Button
                                            type='default'
                                            onClick={() => this.handleDelete(person.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>*/}
                </div>
            </>
        );
    }
}

export default Enroll;
