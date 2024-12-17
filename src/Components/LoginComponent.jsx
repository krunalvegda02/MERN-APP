import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const LoginUser = (values) => {
    setLoading(true);
    axios
      .post("/api/v1/users/login", values)
      .then((res) => {
        console.log("Login response:", res.data);
        setErrorMessage("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setErrorMessage("Invalid username or password. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md w-1/2 p-6 bg-gray-900 shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-white mb-4">
          Login
        </h1>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        <Form
          name="login"
          layout="vertical"
          onFinish={LoginUser}
          autoComplete="off"
        >
          {/* Username Field */}
          <Form.Item
            label={<p className="text-white text-lg font-semibold">Username</p>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username or email",
              },
            ]}
          >
            <Input placeholder="Enter username or email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label={<p className="text-white text-lg font-semibold">Password</p>}
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              block
              className="bg-violet-400 text-xl text-white font-bold"
            >
              {isLoading ? "" : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center ">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
