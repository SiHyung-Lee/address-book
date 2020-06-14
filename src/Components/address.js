import React from 'react';
import styled from 'styled-components';
import { List, Avatar } from 'antd';

class Address extends React.Component {
    state = {
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

    render() {
        const { people } = this.state;
        console.log(this.state);
        return (
            <List
                itemLayout='horizontal'
                dataSource={people}
                renderItem={(person) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            }
                            title={person.name}
                            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                        />
                    </List.Item>
                )}
            />
        );
    }
}

export default Address;
