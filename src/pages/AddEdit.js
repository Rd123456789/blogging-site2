import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { React, useState } from "react";
import { toast } from "react-toastify";
import { storageFire } from "../firebaseconf";
import "./crEdit.css";

function AddEdit() {
  const initialState = {
    title: "",
    imgUrl: "",
    category: "",
    desc: "",
  };
  const categoryOption = [
    "Food",
    "Technology",
    "Clothing",
    "Fashion",

    "Traveling",
    "Blogging",
    "Skin-Care",
    "Sports",
    "Business",
  ];
  const [formState, setFormState] = useState(initialState);
  const [fileState, setFileState] = useState(null);
  const [progress, setProgress] = useState(null);
  const { title, desc, category, imgUrl } = formState;
  useEffect(() => {
    let uploadFile = () => {
      let storageRef = ref(storageFire, fileState.name);
      let uploadTask = uploadBytesResumable(storageRef, fileState);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          setProgress(progress);
          switch (snapshot.state) {
            case "paused": {
              console.log("Upload is paused");
              break;
            }
            case "running": {
              console.log("upload is Running");
              break;
            }
            default: {
              console.log("Default");
              break;
            }
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.info("Image upload to firebase successfully");
            setFormState((prev) => ({ ...prev, imgUrl: downloadURL }));
            // console.log(imgUrl);
          });
        }
      );
    };
    fileState && uploadFile();
  }, [fileState]);

  const handleChange = () => {};

  return (
    <>
      <div className="row d-flex ">
        <center>
          <div className="headDiv">
            <h2 className="head mx-center mb-3 mt-5">Create Blog</h2>
          </div>
        </center>
        <div
          className="container-fluid d-flex justify-content-center align-item-center"
          id="mainId"
        >
          <form>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Title"
                value={title}
                name="title"
                onChange={handleChange}
              ></input>
              <textarea
                className="form-control mb-3"
                id="txtArea"
                rows="4"
                value={desc}
                onChange={handleChange}
                placeholder="Description"
              ></textarea>

              <div className="control-bot mb-3">
                <label htmlFor="selectOp" className="mb-2">
                  Select Category :
                </label>
                <select
                  className="form-control"
                  id="selectOp"
                  value={category}
                  onChange={handleChange}
                >
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="file"
                className="form-control-file styleFile mb-5"
                id="fileUpload"
                onChange={(e) => setFileState(e.target.files[0])}
              />
            </div>
            <center>
              <button
                className="btn btn-lg btnStyle"
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                {/* <p>{iteimgUrl}</p> */}
                Create
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEdit;
