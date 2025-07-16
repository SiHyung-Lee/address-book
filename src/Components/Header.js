import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Menu } from 'antd';
import { UnorderedListOutlined, FormOutlined } from '@ant-design/icons';

import Home from '../Routes/Home';
import Enroll from '../Routes/Enroll';

class Header extends React.Component {
  render() {
    return (
      <Router>
        <Menu className='uk-navbar-nav' mode='horizontal'>
          <Menu.Item icon={<UnorderedListOutlined />}>
            <Link to='/'>List</Link>
          </Menu.Item>
          <Menu.Item icon={<FormOutlined />}>
            <Link to='/enroll'>Register</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/enroll' component={Enroll} />
        </Switch>
      </Router>
    );
  }
}

export default Header;
