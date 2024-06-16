import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">MSC STITCH PERFECT</h1>
        </Link>
        <div className="menuCon flex">
          <div className="hidden md:flex">
            <Menu
              mode="horizontal"
              className="bg-slate-200 text-gray-900 font-semibold"
            >
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="sign-in">
                <Link to="/sign-in">Sign In</Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button className="md:hidden" type="primary" onClick={showDrawer}>
            <span className="barsBtn">
              <MenuOutlined />
            </span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <Menu mode="vertical">
              <Menu.Item key="home" onClick={onClose}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="about" onClick={onClose}>
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="sign-in" onClick={onClose}>
                <Link to="/sign-in">Sign In</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
