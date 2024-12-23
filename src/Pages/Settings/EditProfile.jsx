import React, { useState } from "react";
import { Form, Button, Input, Avatar, Upload, message } from "antd";
import { Container } from "../../index";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateLogin } from "../../redux/Current user data/userSlice";
import ImgCrop from "antd-img-crop";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatar, setAvatar] = useState(
    useSelector((state) => state.userData.avatar)
  );

  const handleFileChange = (e) => {
    console.log("e", e);

    if (e.file) {
      setAvatarFile(e.file);
    }
  };

  console.log("Set file:", avatarFile);

  //upload coverimage to database for update
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);


    axios
      .patch("/api/v1/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        dispatch(updateLogin(res.data.data))
        message.success("Avatar updated successfully!");
        setLoading(false);
        setAvatar(res.data.data.avatar);
        console.log(("API RES", res));
        console.log("set avatar rr", avatar);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        message.error("Failed to upload avatar.");
      });
  };

  //upload coverimage to database for update
  const uploadCoverImage = () => {};

  //Close model for coverImage upload
  const closeUploadCoverImage = () => {
    message.error("Failed to Upload CoverImage");
  };
  //Close model for avatar upload
  const closeModal = () => {
    message.error("Failed to Upload Avatar");
  };

  // Update Profile
  const EditProfile = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        axios.patch("/api/v1/users/update-account", values).then((res) => {
          console.log("API RES:", res.data.data);
          dispatch(updateLogin(res.data.data));
          message.success("Account updated succesfully");
          setLoading(false);
          form.resetFields();
          navigate("/profile");
        });
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        message.error("Failed to update Profile");
      });
  };

  return (
    <Container>
      <div className="flex justify-center align-middle mt-10">
        <div className="p-10  w-2/3 rounded-xl bg-red-300">
          <div>
            <p className="flex text-3xl text-white font-semibold mb-3">
              Edit Profile
            </p>
          </div>
          <div className="text-start ">
            <Avatar size={85} src={avatar}></Avatar>

            <ImgCrop
              showReset={true}
              resetText="Reset"
              cropShape="round"
              onModalCancel={closeModal}
              modalOk="Upload"
              modalTitle={
                <p className="text-2xl font-semibold ">Update Avatar</p>
              }
              // onChange={handleFileChange}
              onModalOk={uploadAvatar}
            >
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={() => false}
                maxCount={1}
                onChange={handleFileChange}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Change Avatar</Button>
              </Upload>
            </ImgCrop>
          </div>
          <div className="my-2 bg-white rounded h-10 w-1/2 border border-violet-500 border-dashed m-auto">
            <ImgCrop
              onModalOk={uploadCoverImage}
              onModalCancel={closeUploadCoverImage}
              modalOk="Upload"
              modalTitle="Update Cover Image"
            >
              <Upload
                name="coverImage"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={"/"}
                accept="image/*"
              >
                <div className="flex mt-1.5">
                  <UploadOutlined className="text-xl font-semibold pr-2" />
                  <p className="text-base font-semibold">
                    Click to Upload your Cover-Image
                  </p>
                </div>
              </Upload>
            </ImgCrop>
          </div>
          <Form
            onFinish={EditProfile}
            layout="vertical"
            name="edit profile"
            loading={loading}
            form={form}
          >
            <Form.Item
              name="username"
              label={<p className=" text-lg font-sans text-white">Username:</p>}
            >
              <Input
                placeholder="Enter your Username"
                className="h-9 text-white hover:bg-slate-700  placeholder-slate-400 bg-slate-700 focus:bg-slate-700"
              ></Input>
            </Form.Item>
            <Form.Item
              name="fullname"
              label={<p className="text-lg font-sans text-white">Fullname:</p>}
            >
              <Input
                placeholder="Enter your Fullname"
                className="h-9 text-white placeholder-slate-400 hover:bg-slate-700 bg-slate-700 focus:bg-slate-700"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className=" h-10 w-1/3 text-lg bg-violet-500 text-black font-semibold cursor-pointer  "
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
