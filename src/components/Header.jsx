import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Drawer, Dropdown, Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menu = (
    <>
      <Menu>
        <Menu.Item key="0">
          <div className="p-2 border-b border-gray-200">
            <div className="text-sm">
              <span className="font-bold">Name:</span> {currentUser?.name}
            </div>
            <div className="text-m">
              <span className="font-bold">Email:</span> {currentUser?.email}
            </div>
          </div>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/dashboard?tab=profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="#" className="text-red-500 hover:text-red-800">
            Sign Out
          </a>
        </Menu.Item>
      </Menu>
    </>
  );

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
              className="bg-slate-200 text-gray-900 font-semibold flex items-center"
              overflowedIndicator={null}
            >
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">About</Link>
              </Menu.Item>
              {currentUser ? (
                <Menu.Item key="profile">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        src={currentUser?.photo}
                        alt={currentUser?.name}
                        className="max-w-9 max-h-9"
                      />
                    </a>
                  </Dropdown>
                </Menu.Item>
              ) : (
                <Menu.Item key="sign-in">
                  <Link to="/sign-in">Sign In</Link>
                </Menu.Item>
              )}
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
              {currentUser ? (
                <Menu.Item key="profile" onClick={onClose}>
                  <Link to="/dashboard?tab=profile">Profile</Link>
                </Menu.Item>
              ) : (
                <Menu.Item key="sign-in" onClick={onClose}>
                  <Link to="/sign-in">Sign In</Link>
                </Menu.Item>
              )}
            </Menu>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
