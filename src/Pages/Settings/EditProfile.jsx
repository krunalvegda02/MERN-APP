import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Container } from "../../index";

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const EditProfile = () => {};
  return (
    <Container>
      <div className="flex justify-center align-middle mt-10">
        <div className="p-10  w-2/3 bg-red-300 rounded-xl ">
          <Form
            onFinish={EditProfile}
            layout="vertical"
            name="edit profile"
            Form={form}
          >
            <Form.Item
              name="username"
              label={<p>E-mail</p>}
              rules={[{ required: true, message: "Please enter a username" }]}
            >
              <Input placeholder="Enter your email"></Input>
            </Form.Item>

            <Form.Item
              name="username"
              label={<p>username</p>}
              rules={[{ required: true, message: "Please enter a username" }]}
            >
              <Input placeholder="Enter your username"></Input>
            </Form.Item>
            <Form.Item
              name="fullname"
              label={<p>fullname</p>}
              rules={[{ required: true, message: "Please enter a Fullname" }]}
            >
              <Input placeholder="Enter your Fullname"></Input>
            </Form.Item>
            <Form.Item>
          
              <Button type="primary" className=""> Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
