import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function UploadImage({setImageUploaded}) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [imgName, setImgName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null);

  const handleClick = () => {
    setImageFile(null)
    setPreviewImage(null)
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Max allowed file size is 5 MB");
        e.target.value = null; 
        return;
      }

      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleOnChange = (e) => {
    setImgName(e.target.value);
  };

  const uploadImageHandler = async () => {
    if (imgName === "") {
      toast.error("Pls enter name of the image")
      return;
    } 
    if (!imageFile) {
      toast.error("Pls select an image")
      return;
    }

    const toastId = toast.loading("Loading...");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("img_name", imgName);

      const token = JSON.parse(
        localStorage.getItem("token") || JSON.stringify({})
      );
      // const token = localStorage.getItem("token") || '';

      // const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   }
      // });

      const config = {
        method: "post",
        url: `${BASE_URL}/upload-image`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      toast.success("Image Uploaded Successfully");
      setImageUploaded(true)
      setImgName("")
      setImageFile(null)
      setPreviewImage(null)

    } catch (error) {
      console.log("uploadImageHandler function ERROR............", error);
      toast.error("Could Not Upload Image");
    }

    toast.dismiss(toastId);
  };

  return (
    <>
      <div
        className="flex items-center justify-between rounded-md border-[1px] p-8 px-12 "
      >
        {/* <p>Add New Image</p> */}
        <div className="flex items-center gap-x-4">
          <div className="space-y-2">
            <div className="flex flex-col gap-3">
              <label className="w-full flex gap-3 items-center">
                <p className="text-[0.875rem] ">Name</p>
                <input
                  required
                  type="text"
                  name="img_name"
                  value={imgName}
                  onChange={handleOnChange}
                  placeholder="Image Name"
                  className="outline-none"
                />
              </label>

              <div className="flex gap-3 flex-col items-start">
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg"
                />

                <button
                  onClick={handleClick}
                  className="cursor-pointer rounded-md opacity-70"
                >
                  Select here to upload image
                </button>

                {previewImage && 
                  <div className="mt-4">
                    <img src={previewImage} alt="Preview" className="max-w-[7rem]" />
                  </div>
                }

                <button onClick={uploadImageHandler} className="font-semibold text-white bg-black rounded-md p-2 hover:scale-[103%] transition-all ease-in">UPLOAD</button>

                {/* <label htmlFor="image" className="cursor-pointer">Upload Image</label> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
