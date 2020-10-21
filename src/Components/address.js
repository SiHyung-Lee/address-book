import React from 'react';
import { Row, Col, Button, Table, Space } from 'antd';

class Address extends React.Component {
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
