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
  const [coverFile, setCoverFile] = useState(null);

  const [coverImage, setCoverImage] = useState(
    useSelector((state) => state.userData.coverImage)
  );
  const [avatar, setAvatar] = useState(
    useSelector((state) => state.userData.avatar)
  );

  const handleAvatarChange = (e) => {
    console.log(e.file);
    if (e.file) {
      setAvatarFile(e.file);
    }
  };
  const handleCoverChange = (e) => {
    console.log("e", e);

    if (e.file) {
      setCoverFile(e.file);
    }
  };

  //upload coverimage to database for update
  const uploadAvatar = async (file) => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      message.error("No file selected for upload!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    await axios
      .patch("/api/v1/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        message.success("Avatar updated successfully!");
        setLoading(false);
        dispatch(updateLogin(res.data.data));
        setAvatar(res.data.data.avatar);
        console.log(("API RES", res));
        console.log("setavatar profile", avatar);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        message.error("Failed to upload avatar.");
      });
  };

  //upload coverimage to database for update
  const uploadCoverImage = (coverfile) => {
    setLoading(true);
    if (!coverfile) {
      setLoading(false);
      message.error("No file selected for upload!");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", coverFile);

    axios
      .patch("/api/v1/users/cover-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        message.success("Cover Image updated successfully!");
        setLoading(false);
        dispatch(updateLogin(res.data.data));
        setCoverImage(res.data.data.coverImage);
        console.log(("API RES", res));
        console.log("setavatar profile", coverImage);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        message.error("Failed to upload Cover Image.");
      });
  };

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
          setTimeout(() => {
            navigate("/profile");
          }, 500);
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
        <div className="p-3  w-2/3 rounded-xl">
          <div>
            <p className="flex text-3xl text-white font-semibold mb-7">
              Edit Profile
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-start ml-6">
                <Avatar size={100} src={avatar}></Avatar>
              </div>

              <div className="text-start mb-5">
                <ImgCrop
                  showReset={true}
                  resetText="Reset"
                  cropShape="round"
                  onModalCancel={closeModal}
                  modalOk="Upload"
                  onModalOk={() => uploadAvatar(avatarFile)}
                  modalTitle={
                    <p className="text-2xl font-semibold ">Update Avatar</p>
                  }
                >
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={handleAvatarChange}
                    accept="image/*"
                  >
                    <p className="text-lg mt-2 text-violet-600">
                      <UploadOutlined className="mr-2" />
                      Change Avatar
                    </p>
                  </Upload>
                </ImgCrop>
              </div>
            </div>

            <div className="">
              <div>
                <img src={coverImage} height={50} width={350}></img>
              </div>
              <ImgCrop
                showReset={true}
                resetText="Reset"
                cropShape="rect"
                aspect={1640 / 856}
                onModalCancel={closeUploadCoverImage}
                modalOk="Upload"
                onModalOk={() => uploadCoverImage(coverFile)}
                modalTitle={
                  <p className="text-2xl font-semibold ">Update Cover Image</p>
                }
              >
                <Upload
                  name="coverImage"
                  showUploadList={false}
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleCoverChange}
                  accept="image/*"
                >
                  <p className="text-lg mt-2 text-violet-600">
                    <UploadOutlined className="mr-2" />
                    Change CoverImage
                  </p>
                </Upload>
              </ImgCrop>
            </div>
          </div>

          <Form
            onFinish={EditProfile}
            layout="vertical"
            name="edit profile"
            {...(loading ? { loading: true } : {})}
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
