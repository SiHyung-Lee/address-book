import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from '../Routes/Home';
import Enroll from '../Routes/Enroll';

class Header extends React.Component {
    state = {
        people2: [
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
        return (
            <Router>
                <nav className='uk-navbar-container'>
                    <div className='uk-navbar-left'>
                        <ul className='uk-navbar-nav'>
                            <li>
                                <Link to='/'>목록</Link>
                            </li>
                            <li>
                                <Link to='/enroll'>등록</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} people={this.state.people2} />
                    <Route path='/enroll' component={Enroll} />
                </Switch>
            </Router>
        );
    }
}

export default Header;
