import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const List = styled.div``;

const Title = styled.strong``;

const Content = styled.p``;

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
        return people.map((person, idx) => (
            <Card key={idx} title='Default Card' style={{ width: 300 }}>
                <List>
                    <Title>name</Title>
                    <Content>{person.name}</Content>
                </List>
                <List>
                    <Title>telephone</Title>
                    <Content>{person.telephone}</Content>
                </List>
                <List>
                    <Title>email</Title>
                    <Content>{person.email}</Content>
                </List>
                <List>
                    <Title>address</Title>
                    <Content>{person.address}</Content>
                </List>
            </Card>
        ));
    }
}

export default Address;
