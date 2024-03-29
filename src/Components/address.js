import React from 'react';
import { firestore } from '../firebase';
import { Row, Col, Button, Table, Space } from 'antd';

class Address extends React.Component {
    state = {
        person: {
            key: '',
            name: '',
            telephone: '',
            email: '',
            address: '',
        },
        people: [],
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
                    // console.log(person);
                    people.push({
                        key: doc.id,
                        name: person.name,
                        telephone: person.telephone,
                        email: person.email,
                        address: person.address,
                    });
                });
                this.setState({
                    person: {
                        key: '',
                        name: '',
                        telephone: '',
                        email: '',
                        address: '',
                    },
                    people,
                });
            });
    };

    handleChange = (event) => {
        let val = event.target.value;
        const id = event.target.id;
        const { person } = this.state;

        this.setState({
            person: {
                key: id === 'key' ? val : person.key,
                name: id === 'name' ? val : person.name,
                telephone: id === 'telephone' ? val : person.telephone,
                email: id === 'email' ? val : person.email,
                address: id === 'address' ? val : person.address,
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
                const person = this.state.people.filter((person) => person.key === id)[0];
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
                const people = this.state.people.filter((person) => person.key !== id);
                this.setState({ people });
            });
    };

    render() {
        const { people } = this.state;

        const { Column } = Table;

        return (
            <>
                <Row justify='space-around' align='middle'>
                    <Col span={22}>
                        <Table dataSource={people}>
                            <Column title='Name' dataIndex='name' key='name' />
                            <Column title='Telephone' dataIndex='telephone' key='telephone' />
                            <Column title='Email' dataIndex='email' key='email' />
                            <Column title='Address' dataIndex='address' key='address' />
                            <Column
                                title='Action'
                                key='action'
                                render={(record) => (
                                    <Space size='middle'>
                                        <Button onClick={() => this.handleModify(record.key)}>
                                            Modify
                                        </Button>
                                        <Button onClick={() => this.handleDelete(record.key)}>
                                            Delete
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Address;
