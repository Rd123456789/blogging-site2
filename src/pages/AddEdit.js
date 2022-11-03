import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storageFire } from "../firebaseconf";
import "./crEdit.css";


function AddEdit({ user }) {
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

  console.log();
  const [fileState, setFileState] = useState(null);
  const [progress, setProgress] = useState(null);
  const { title, desc, category, imgUrl } = formState;
  const { id } = useParams();
  const navigator_ref = useNavigate();

  const uid = () =>{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
 
  useEffect(() => {
    
    let uploadFile = () => {
      let storageRef = ref(storageFire,uid()+fileState.name);
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
            toast.info("Image Uploaded Successfully!");
            setFormState((prev) => ({ ...prev, imgUrl: downloadURL }));
            console.log(imgUrl);
          });
        }
      );
      
    };
    fileState && uploadFile();
  }, [fileState]);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const handleCat = (event) => {
    setFormState({ ...formState, category: event.target.value });
  };
  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "BlogsCollection", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setFormState({ ...snapshot.data() });
    } else {
      console.log("error!!!");
    }
  };
  const handleChangeArea = (e) => {
    setFormState({ ...formState, desc: e.target.value });
  };
  // console.log(formState);
  const handleSub = async (event) => {
    event.preventDefault();

    if (category && title && desc && imgUrl) {
      if (!id) {
        try {
          await addDoc(collection(db, "BlogsCollection"), {
            ...formState,
            timeStamp: serverTimestamp(),
            author: user?.displayName,
            userID: user?.uid,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try{
          await updateDoc(doc(db,'BlogsCollection',id),{
            ...formState,
            timeStamp:serverTimestamp(),
            author:user?.displayName,
            userID:user?.uid
          })
        }
        catch(error){
          console.log(error);
        }
      }

      navigator_ref("/");
    } else {
      toast.error("All Fields are Required!");
    }
  };

  return (
    <>
      <div className="row d-flex ">
        <center>
          <div className="headDiv">
            <h2 className="head mx-center mb-3 mt-5">
              {id ? "Edit Blog" : "Create Blog"}
            </h2>
          </div>
        </center>
       
        <div
          className="container-fluid d-flex justify-content-center align-item-center"
          id="mainId"
        >
          <form onSubmit={handleSub}>
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
                name="description"
                value={desc}
                onChange={handleChangeArea}
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
                  onChange={handleCat}
                >
                  <option value="Please Select Category" defaultChecked>
                    Please Select Category
                  </option>
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
                onChange={(e) => {
         
                  setFileState(e.target.files[0])}}
                  onClick ={()=>{
                   
                  }}
              />
            </div>
            <center>
              <button
                className="btn btn-lg btnStyle"
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                {/* <p>{iteimgUrl}</p> */}
                {id ? "Update" : "Create"}
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEdit;
