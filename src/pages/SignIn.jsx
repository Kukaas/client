import { Button, Form, Input, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginStart, loginFailure, loginSuccess } from "../redux/user/userslice";
import { useDispatch, useSelector } from "react-redux";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.user);

  const handleLogin = async (values) => {
    dispatch(loginStart());

    if (
      !values.email ||
      !values.password 
    ) {
      message.error("Please fill out all fields");
      dispatch(loginFailure());
      return;
    }

    try {
      const res = await axios.post(
        "https://garments.kukaas.tech/api/v1/auth/sign-in",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
        message.success("Sign in successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch(loginFailure(error.message));
        message.error("User not found");
      } else if (error.response && error.response.status === 400) {
        dispatch(loginFailure(error.message));
        message.error("Wrong email or password");
      } else {
        dispatch(loginFailure(error.message));
        message.error("Something went wrong");
      } 
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen mt-[70px]">
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
              Sign in with you email and password or google.
            </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <Form
              layout="vertical"
              className="flex flex-col font-bold"
              onFinish={handleLogin}
            >
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
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-gradient-to-r from-purple-500  to-pink-500 "
                  size="large"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SignIn;
