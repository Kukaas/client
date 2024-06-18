import { Alert, Avatar, Button, Form, Input, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImageFileUrl(imageUrl);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line
  }, [imageFile]);

  const uploadImage = async () => {
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageUploadError("Could not upload image. (Max size: 2MB)");
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <Typography.Title level={3} className="text-center my-7">
        Profile
      </Typography.Title>
      <Form
        className="flex flex-col"
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          style={{ display: "none" }}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current && filePickerRef.current.click()}
        >
          <Avatar
            src={imageFileUrl || currentUser?.photo}
            alt={currentUser?.name}
            className={`w-full rounded-full h-full border-8 border-[lightgray] object-cover ${
              imageUploadProgress && imageUploadError < 100 && "opacity-50"
            }`}
          />
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
        </div>
        {imageUploadError && <Alert message={imageUploadError} type="error" />}
        <Form.Item name="name" className="mt-5">
          <Input
            type="text"
            placeholder="Name"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item name="email">
          <Input
            type="email"
            placeholder="Email"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            type="password"
            placeholder="Password"
            className="bg-slate-100"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="w-full bg-gradient-to-b from-purple-500 to-blue-500"
            size="large"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between text-red-500">
        <span className="cursor-pointer hover:text-red-400">
          Delete Account
        </span>
        <span className="cursor-pointer hover:text-red-400">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
