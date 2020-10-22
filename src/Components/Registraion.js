import React from 'react';
import { Row, Col, Form, Input, Button, Table, Space } from 'antd';

class Registraion extends React.Component {
    render() {
        console.log(this.props);
        const { person, people } = this.state;

        const formLayout = 'horizontal';
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                      labelCol: { span: 2 },
                      wrapperCol: { span: 21 },
                  }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                      wrapperCol: { span: 21, offset: 2 },
                  }
                : null;

        const { Column } = Table;

        return (
            <>
                <Row justify='space-around' align='middle'>
                    <Col span={22}>
                        <Form layout={formLayout}>
                            {Object.keys(person).map((info, idx) =>
                                info === 'key' ? (
                                    ''
                                ) : (
                                    <Form.Item
                                        key={idx}
                                        label={this.handleTitle(info)}
                                        {...formItemLayout}
                                    >
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
                    </Col>
                </Row>
            </>
        );
    }
}

export default Registraion;
