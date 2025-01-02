import React from "react";
import { Button, Form, Input, Alert, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function SignUpComponent() {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="flex align-middle justify-center mt-40  ">
      <div className="border rounded-md shadow-lg p-6 h-screen bg-slate-900  w-2/3 ">
        <Form>
          {/* //coverimage  */}
          <Form.Item
            name="Cover Image"
            label="Upload"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          {/* //avatar  */}
          
          {/* //username */}
          {/* //fullname  */}
          {/* //email  */}
          {/* //password */}
        </Form>
      </div>
    </div>
  );
}

export default SignUpComponent;

// import React, { useState, useRef } from "react";
// import AvatarEditor from "react-avatar-editor";
// import { Upload, Button, Slider } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// const SignUpComponent = () => {
//   const [image, setImage] = useState(null);
//   const [scale, setScale] = useState(1); // Zoom level
//   const editorRef = useRef(null);

//   // Handle file upload and convert to URL
//   const handleFileChange = (info) => {
//     const file = info.file;
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   // Save the cropped image
//   const handleSave = () => {
//     if (editorRef.current) {
//       const canvas = editorRef.current.getImageScaledToCanvas();
//       const croppedImage = canvas.toDataURL(); // Base64 Image
//       console.log("Cropped Image:", croppedImage);
//       alert("Avatar Cropped Successfully!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <Upload
//         accept="image/*"
//         showUploadList={false}
//         beforeUpload={(file) => {
//           handleFileChange({ file });
//           return false; // Prevent auto upload
//         }}
//       >
//         <Button icon={<UploadOutlined />}>Upload Avatar</Button>
//       </Upload>

//       {image && (
//         <div style={{ marginTop: "20px" }}>
//           {/* Avatar Cropping Component */}
//           <AvatarEditor
//             ref={editorRef}
//             image={image}
//             width={200} // Crop width
//             height={200} // Crop height
//             border={50} // Border around crop area
//             borderRadius={100} // Circle crop
//             color={[255, 255, 255, 0.6]} // Background color
//             scale={scale} // Zoom control
//           />

//           {/* Zoom Slider */}
//           <div style={{ marginTop: "10px" }}>
//             <p>Zoom:</p>
//             <Slider
//               min={1}
//               max={3}
//               step={0.1}
//               value={scale}
//               onChange={(value) => setScale(value)}
//               style={{ width: "50%", margin: "0 auto" }}
//             />
//           </div>

//           <Button type="primary" onClick={handleSave} style={{ marginTop: "10px" }}>
//             Save Cropped Image
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUpComponent;
