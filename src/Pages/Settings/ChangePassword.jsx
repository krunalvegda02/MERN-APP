import React from "react";
import { Container } from "../../index";
import { Form, Button, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";

function ChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const changePassword = () => {
    setLoading(true);
    form.validateFields().then((values) => {
      console.log(values);

      axios
        .post("/api/v1/users/password-change", values)
        .then((res) => {
          // console.log("res",res);
          setLoading(false);
          message.success("Password changed successfully!");
          form.resetFields();
        })
        .catch((err) => {
          console.log("API ERROR:", err);
          setLoading(false);
        });
    });

    setLoading(true);
  };
  return (
    <Container>
      <div className="mt-24 p-6 px-40">
        <div className="">
          <p className="text-3xl text-start mb-10 font-semibold text-white">
            Change Your Password
          </p>
          <Form
            form={form}
            onFinish={changePassword}
            layout="vertical"
            name="Change Password"
          >
            <Form.Item
              name="oldPassword"
              label={<p className="text-white">Old Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please enter your old password.",
                },
              ]}
              className="text-white"
            >
              <Input.Password placeholder="Enter Old Password"></Input.Password>
            </Form.Item>
            <Form.Item
              name="newPassword"
              label={<p className="text-white">New Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please enter your new password.",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters.",
                },
              ]}
            >
              <Input.Password placeholder="Enter New Password"></Input.Password>
            </Form.Item>
            <Form.Item label={null} className="text-right">
              <Button
                className="bg-violet-600 p-5 px-10 text-lg text-white font-semibold "
                type="submit"
                htmlType="submit"
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined className="text-white " />}
                    size="default"
                  />
                ) : (
                  "Change Password"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default ChangePassword;
