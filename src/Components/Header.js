import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Home = () => {
    return <h2>Home</h2>;
};

const About = () => {
    return <h2>About</h2>;
};

const Regi = () => {
    return <h2>Regi</h2>;
};

class Header extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/about'>About</Link>
                            </li>
                            <li>
                                <Link to='/regi'>Regi</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/about'>
                            <About />
                        </Route>
                        <Route path='/regi'>
                            <Regi />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Header;
