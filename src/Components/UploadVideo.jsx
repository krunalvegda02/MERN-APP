import React, { useState } from "react";
import { Button, Modal, Upload, Form, message } from "antd";
import { UploadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Container, Loading } from "../index";

function UploadVideo({
  isOpen,
  onClose,
  isEditVideo = false,
  editVideoId = null,
}) {
  // console.log("isEditVideo", isEditVideo);
  // console.log("editVideoId", editVideoId);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        if (values.thumbnail)
          formData.append("thumbnail", values.thumbnail.file);
        console.log("values", values);

        formData.append("title", values.title);
        formData.append("description", values.description);

        setLoading(true);
        axios
          .patch(`/api/v1/videos/${editVideoId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(() => {
            message.success("Video Updated successfully!");
            onClose();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Upload Error:", error);
            message.error("Video update failed. Please try again.");
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        message.error("Please fill all required fields before uploading!");
      });
  };

  const handleUpload = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        if (values.videoFile)
          formData.append("videoFile", values.videoFile.file);
        if (values.thumbnail)
          formData.append("thumbnail", values.thumbnail.file);
        console.log("values", values);

        formData.append("title", values.title);
        formData.append("description", values.description);

        setLoading(true);
        axios
          .post("/api/v1/videos/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(() => {
            message.success("File uploaded successfully!");
            onClose();
            form.resetFields();
          })
          .catch((error) => {
            message.error("Upload Error:", error);
            // message.error("File upload failed. Please try again.");
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        message.error("Please fill all required fields before uploading!");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={onClose}
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
            onClick={isEditVideo ? handleEdit : handleUpload}
            loading={loading}
            disabled={loading}
            style={{
              backgroundColor: "rgb(167 139 250 / var(--tw-bg-opacity, 1))",
            }}
          >
            {!isEditVideo ? "Save" : "Edit"}
          </Button>
        </header>

        <Form form={form} layout="vertical">
          {!isEditVideo && (
            <Form.Item
              name="videoFile"
              rules={[
                { required: true, message: "Please upload a video file!" },
              ]}
            >
              <div className="h-64">
                <Upload.Dragger
                  name="videoFile"
                  multiple={false}
                  accept="video/*"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={(videoFile) => {
                    form.setFieldsValue({ videoFile: videoFile });
                  }}
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
          )}

          <Form.Item
            name="thumbnail"
            label={<span className="text-base text-white">Thumbnail</span>}
            rules={[
              { required: !isEditVideo, message: "Please upload a thumbnail!" },
            ]}
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
            rules={[
              { required: !isEditVideo, message: "Please provide a title!" },
            ]}
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
              {
                required: !isEditVideo,
                message: "Please provide a description!",
              },
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

export default UploadVideo;
