import { Button, Form, Input, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true); // Start loading here

    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      message.error("Please fill out all fields");
      setLoading(false);
      return;
    }

    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        "https://garments.kukaas.tech/api/v1/auth/sign-up",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201) {
        message.success("Registered successfully");
        navigate("/sign-in");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("User already exists");
      } else {
        message.error("An error occurred");
      }
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen mt-[50px]">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
          {/* left */}
          <div className="flex-1 mb-4">
            <Link to="/" className="font-bold hover:text-current text-4xl ">
              <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Stitch
              </span>{" "}
              Perfect
            </Link>
            <p className="text-l mt-4 text-gray-600">
              Sign up with you email or google.
            </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <Form
              layout="vertical"
              className="flex flex-col font-bold"
              onFinish={handleRegister}
            >
              <Form.Item label="Name" required name="name">
                <Input
                  type="name"
                  placeholder="Enter name"
                  className="rounded-lg bg-slate-100"
                  size="large"
                />
              </Form.Item>
              <Form.Item label="Email" required name="email">
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="rounded-lg bg-slate-100"
                  size="large"
                />
              </Form.Item>
              <Form.Item label="Password" required name="password">
                <Input.Password
                  placeholder="Enter Password"
                  className="rounded-lg bg-slate-100"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                required
                name="confirmPassword"
              >
                <Input.Password
                  placeholder="Re-enter your Password"
                  className="rounded-lg bg-slate-100"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-gradient-to-r from-purple-500  to-pink-500 "
                  size="large"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-blue-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SignUp;
