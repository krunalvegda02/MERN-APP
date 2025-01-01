import { Modal, Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import axios from "axios";

function AddPlaylistModal({
  isOpen,
  onClose,
  editPlaylist = false,
  editPlaylistid = null,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const addplaylist = () => {
    setLoading(true);
    form.validateFields().then((values) => {
      console.log("Form values:", values); // Log the values

      // Send the values as JSON
      axios
        .post("/api/v1/playlist/", values) // Send JSON instead of FormData
        .then((res) => {
          setLoading(false);
          message.success("Playlist Created Successfully");
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          onClose();
          console.log("err", err);
          message.error("Error creating Playlist");
        });
    });
  };

  const EditPlaylist = () => {
    setLoading(true);
    form.validateFields().then((values) => {
      console.log("Form values:", values); // Log the values

      // Send the values as JSON
      axios
        .patch(`/api/v1/playlist/${editPlaylistid}`, values) // Send JSON instead of FormData
        .then((res) => {
          setLoading(false);
          message.success("Playlist Edited Successfully");
          onClose();
        })
        .catch((err) => {
          setLoading(false);
          onClose();
          console.log("err", err);
          message.error("Error Editing Playlist");
        });
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closable={false}
      centered={true}
      footer={false}
      styles={{
        content: { backgroundColor: "rgb(24,24,24)" },
      }}
    >
      <Form
        loading={loading}
        form={form}
        name="Add playlist"
        layout={"vertical"}
        clearOnDestroy={true}
        onFinish={editPlaylist ? EditPlaylist : addplaylist}
      >
        <Form.Item
          name="name"
          label={<p className="text-base text-white">Name</p>}
          rules={[
            {
              required: !editPlaylist,
              message: "Please provide a Name for Playlist!",
            },
          ]}
        >
          <Input
            name="name"
            placeholder="Playlist Title"
            className="w-full p-2 rounded bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 hover:bg-gray-800 focus:bg-gray-800"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<p className="text-base text-white">Description</p>}
          rules={[
            {
              required: !editPlaylist,
              message: "Please provide a description of Playlist!",
            },
          ]}
        >
          <Input
            name="description"
            placeholder="Playlist Description"
            className="w-full p-2 rounded bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 hover:bg-gray-800 focus:bg-gray-800"
          />
        </Form.Item>
        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-violet-500 text-xl py-4 px-5 font-semibold text-black"
            >
              {!editPlaylist ? "Create" : "Edit"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddPlaylistModal;
