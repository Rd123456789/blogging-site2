import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseconf";
import "../pages/details.css";

const DetailsComp = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  useEffect(() => {
    id && getBlogDetail();
  }, [id]);
  const getBlogDetail = async () => {
    const docRef = doc(db, "BlogsCollection", id);
    const blogDet = getDoc(docRef);
    setBlogDetails((await blogDet).data());
  };
  return (
    <div className="single">
      <div className="blog-title">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <h1>
              <i>{blogDetails?.title}</i>
            </h1>
          </div>
          <div className="col-6 my-center d-flex align-items-center justify-content-end">
            <span>Published on :-</span>

            <span>
              &nbsp;&nbsp;{blogDetails?.timeStamp.toDate().toDateString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blogDetails?.imgUrl}')` }}
      >
        <div className="overlay"></div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
              <p className="text-center my-2 classCat" id="classCat">{blogDetails?.category}</p>
                <h4>From:- </h4>
                <h3 className="author">{blogDetails?.author}</h3>
         
                <p className="text-start style">
           
                  -&nbsp;&nbsp;&nbsp;{blogDetails?.desc}
                </p>
                
              </span>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsComp;
