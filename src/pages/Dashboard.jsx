import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImagesGrid from "../components/ImagesGrid";
import axios from "axios";
import UploadImage from "../components/UploadImage";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchAllImgs = async () => {
    const toastId = toast.loading("Loading...");

    try {
      const token = JSON.parse(
        localStorage.getItem("token") || JSON.stringify({})
      );

      const response = await axios.get(`${BASE_URL}/fetch-all-images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("fetchAllImgs API RESPONSE............", response);

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        setImages(response.data.data.uploaded_images);
        setFilteredImages(response.data.data.uploaded_images);
      }
    } catch (error) {
      console.log("fetchAllImgs API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    fetchAllImgs();
  }, []);

  useEffect(() => {
    fetchAllImgs();
    setImageUploaded(null);
  }, [imageUploaded]);

  useEffect(() => {
    const searchQueryHandler = () => {
      const filteredImagesData = images.filter((image) =>
        image.img_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredImages(filteredImagesData);
    };
    searchQueryHandler();
  }, [searchQuery]);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out");

    navigate("/");
  };

  return (
    <div className="flex flex-col ml-10 mt-2 gap-6">
      <div className="flex w-[100%] justify-between">
        <p className="text-center font-extrabold text-4xl ">My Collection</p>
        <button
          className="px-4 py-2 border-2 border-black mr-5"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {images.length > 0 && (
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <ImagesGrid filteredImages={filteredImages} images={images} />

      <UploadImage setImageUploaded={setImageUploaded} />
    </div>
  );
};

export default Dashboard;
