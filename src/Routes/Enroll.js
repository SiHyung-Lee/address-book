import React from 'react';
import { firestore } from '../firebase';
import { Form, Input, Button, Table, Space } from 'antd';

class Enroll extends React.Component {
    state = {
        person: {
            key: '',
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

    updateData = async () => {
        const people = [];
        await firestore
            .collection('address')
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    const person = doc.data();
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

        return (
            <>
                <Form layout={formLayout}>
                    {Object.keys(person).map((info, idx) =>
                        info === 'key' ? (
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
            </>
        );
    }
}

export default Enroll;
