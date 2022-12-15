import React, { useState } from "react";
import "./UploadFile.scss";
import plus from "../../assets/icons8-add-new-100.png";
import axios from "axios";

const UploadFile = ({ items, data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
  // ================================file upload function ==============================================================
  const handleFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setPrevImage(reader.result);
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setLogo(strImage);
      };
    }
  };

  // ==================================file upload funtion end =============================================================
  const handleClick = async () => {
    setIsPlaying(true);
    const file = new FormData();
    file.append("imagefor", `PROD${items}`);
    file.append("imageid", data?.pid);
    file.append("image", logo);
    const filedata = await axios.post(
      "https://dstservices.in/api/filesup.php",
      file
    );
    setIsPlaying(false);
    setIsPaid(true);
  };
  return (
    <div className="upload-main-container">
      <div className="upload-file-container">
        <img src={logo === "" ? plus : prevImage} alt="" />
        <input type="file" accept="image/*" onChange={(e) => handleFile(e)} />
      </div>
      <br />
      <button
        disabled={isPlaying || isPaid || logo === ""}
        onClick={handleClick}>
        <span className="rail"></span>
        <span className="icon"></span>
        <span className="text">
          {isPlaying ? "Processing" : isPaid ? "Complete" : "Upload"}
        </span>
      </button>
    </div>
  );
};

export default UploadFile;
