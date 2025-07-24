import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { UnorderedListOutlined, FormOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <Menu className="uk-navbar-nav" mode="horizontal">
      <Menu.Item icon={<UnorderedListOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item icon={<FormOutlined />}>
        <Link to="/enroll">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
