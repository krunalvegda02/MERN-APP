import React, { useState } from "react";
import { Fab } from "@mui/material";
import { Button, Modal, Upload, Form, message } from "antd";
import { UploadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import axios from "axios";

function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleUpload = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        if (values.videoFile?.file)
          formData.append("videoFile", values.videoFile.file);
        console.log("video", values.videoFile);
        console.log("thumbnil", values.thumbnail);
        if (values.thumbnail?.file)
          formData.append("thumbnail", values.thumbnail.file);
        formData.append("title", values.title);
        formData.append("description", values.description);

        setLoading(true);
        axios
          .post("/api/v1/videos/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(() => {
            message.success("File uploaded successfully!");
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch((error) => {
            console.error("Upload Error:", error);
            message.error("File upload failed. Please try again.");
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        message.error("Please fill all required fields before uploading!");
      });
  };

  return (
    <div>
      {/* Floating Action Button */}
      <Fab
        aria-label="add"
        onClick={handleModalOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "rgb(167 139 250 / var(--tw-bg-opacity, 1))",
          color: "black",
          border: isHovered ? "1px solid white" : "",
          width: isHovered ? "110px" : "50px",
          height: isHovered ? "42px" : "50px",
          transition: "width 0.7s ease",
          borderRadius: isHovered ? "15px" : "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isHovered ? (
          <span className="text-lg">Upload</span>
        ) : (
          <span className="text-4xl">+</span>
        )}
      </Fab>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
        maskClosable={!loading}
        centered
        width={720}
        styles={{
          content: { backgroundColor: "rgb(24,24,24)" },
        }}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Upload Video</h2>
          <Button
            onClick={handleUpload}
            loading={loading}
            disabled={loading}
            style={{
              backgroundColor: "rgb(167 139 250 / var(--tw-bg-opacity, 1))",
            }}
          >
            Save
          </Button>
        </header>

        <Form form={form} layout="vertical">
          <Form.Item
            name="videoFile"
            rules={[{ required: true, message: "Please upload a video file!" }]}
          >
            <div className="h-64">
              <Upload.Dragger
                name="videoFile"
                multiple={false}
                accept="video/*"
                maxCount={1}
                beforeUpload={() => false} // Prevent automatic upload
              >
                <CloudUploadOutlined className="text-5xl text-gray-400" />
                <p className="text-2xl text-white mt-5">
                  Drag and drop video files to Upload
                </p>
                <p className="text-gray-500 mt-2">
                  Your videos will be private until you publish them 
                </p>
                <Button icon={<UploadOutlined />} className="mt-4">
                  Select File
                </Button>
              </Upload.Dragger>
            </div>
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label={<span className="text-base text-white">Thumbnail</span>}
            rules={[{ required: true, message: "Please upload a thumbnail!" }]}
          >
            <Upload
              name="thumbnail"
              accept="image/*"
              maxCount={1}
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label={<span className="text-base text-white">Title</span>}
            rules={[{ required: true, message: "Please provide a title!" }]}
          >
            <input
              placeholder="Enter video title"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-base text-white">Description</span>}
            rules={[
              { required: true, message: "Please provide a description!" },
            ]}
          >
            <textarea
              rows="4"
              placeholder="Enter video description"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FloatingActionButton;
