import { Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DashSidebar = () => {
  return (
    <Menu
  defaultSelectedKeys={["1"]}
  mode="inline"
  className="w-full sm:w-full md:w-64 md:min-h-screen"
>
  <Menu.Item key="1" icon={<UserOutlined />}>
    <Link to="/dashboard?tab=profile">Profile</Link>
  </Menu.Item>
  <Menu.Item key="2" icon={<LogoutOutlined />}>
    Sign Out
  </Menu.Item>
</Menu>
  );
};

export default DashSidebar;
