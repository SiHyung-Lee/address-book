import React, { useState } from 'react';
import { firestore } from '../firebase';
import { Row, Col, Form, Input, Button, Table, Space, message, Spin } from 'antd';
import useAddressData from '../hooks/useAddressData';

const Enroll = () => {
  const [form] = Form.useForm();
  const { people, setPeople, loading, refetch } = useAddressData();
  const [editingKey, setEditingKey] = useState(null);

  const handleSubmit = async (values) => {
    try {
      if (editingKey) {
        await firestore.collection('address').doc(editingKey).update(values);
        message.success('Updated successfully');
      } else {
        await firestore.collection('address').add(values);
        message.success('Added successfully');
      }
      form.resetFields();
      setEditingKey(null);
      refetch();
    } catch (error) {
      console.error('Error submitting:', error);
      message.error('Failed to submit');
    }
  };

  const handleModify = (record) => {
    form.setFieldsValue({
      name: record.name,
      telephone: record.telephone,
      email: record.email,
      address: record.address,
    });
    setEditingKey(record.key);
  };

  const handleDelete = async (id) => {
    try {
      await firestore.collection('address').doc(id).delete();
      setPeople(people.filter(person => person.key !== id));
      message.success('Deleted successfully');
    } catch (error) {
      console.error('Error deleting:', error);
      message.error('Failed to delete');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingKey(null);
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
          <Button onClick={() => handleModify(record)}>Modify</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row justify='space-around' align='middle' style={{ marginTop: 20 }}>
        <Col span={22}>
          <Form 
            form={form}
            layout='horizontal' 
            onFinish={handleSubmit}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 21 }}
          >
            <Form.Item 
              label="Name" 
              name="name" 
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item 
              label="Telephone" 
              name="telephone"
              rules={[{ required: true, message: 'Please input telephone!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item 
              label="Email" 
              name="email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please input valid email!' }
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item 
              label="Address" 
              name="address"
              rules={[{ required: true, message: 'Please input address!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 21, offset: 2 }}>
              <Space>
                <Button type='primary' htmlType='submit'>
                  {editingKey ? 'Update' : 'Submit'}
                </Button>
                {editingKey && (
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      
      <Row justify='space-around' align='middle' style={{ marginTop: 20 }}>
        <Col span={22}>
          <Spin spinning={loading}>
            <Table dataSource={people} columns={columns} />
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default Enroll;