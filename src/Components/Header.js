import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from '../Routes/Home';
import Regi from '../Routes/Regi';

class Header extends React.Component {
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
                                <Link to='/regi'>등록</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/regi' component={Regi} />
                </Switch>
            </Router>
        );
    }
}

export default Header;
