import React from 'react';
import { firestore } from '../firebase';
import { Row, Col, Button, Table, Space, Spin } from 'antd';
import useAddressData from '../hooks/useAddressData';

const Address = () => {
  const { people, setPeople, loading } = useAddressData();

  const handleDelete = async (id) => {
    try {
      await firestore.collection('address').doc(id).delete();
      setPeople(people.filter(person => person.key !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Row justify='space-around' align='middle'>
      <Col span={22}>
        <Spin spinning={loading}>
          <Table dataSource={people} columns={columns} />
        </Spin>
      </Col>
    </Row>
  );
};

export default Address;