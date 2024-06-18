import { Avatar, Button, Form, Input, Typography } from "antd";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <Typography.Title level={3} className="text-center my-7">
        Profile
      </Typography.Title>
      <Form
        className="flex flex-col"
        initialValues={{

          name: currentUser.name,
          email: currentUser.email,
        }}
      >
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <Avatar
            src={currentUser?.photo}
            alt={currentUser?.name}
            className="w-full rounded-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <Form.Item name="name" className="mt-5">
          <Input
            type="text"
            placeholder="Name"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item name="email">
          <Input
            type="email"
            placeholder="Email"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            type="password"
            placeholder="Password"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="w-full bg-gradient-to-b from-purple-500 to-blue-500" size="large">Update</Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between text-red-500">
        <span className="cursor-pointer hover:text-red-400">Delete Account</span>
        <span className="cursor-pointer hover:text-red-400">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
