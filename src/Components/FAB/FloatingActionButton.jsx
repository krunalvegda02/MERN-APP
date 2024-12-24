import React, { useState } from "react";
import { Fab } from "@mui/material";
import UploadVideo from "../UploadVideo";

function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

 
  return (
    <div>
      {/* Floating Action Button */}
      <Fab
        aria-label="add"
        onClick={handleOpenModal}
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
      {isModalOpen && <UploadVideo isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}

export default FloatingActionButton;
