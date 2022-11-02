import React, { useState } from "react";
import "./homeMain.css";
import { Link } from "react-router-dom";
import { except } from "../utility";
import * as AiIcon from "react-icons/ai";
import * as FiIcon from "react-icons/fi";
import { useEffect } from "react";

function HomeComponent({ blogs, user, handleDelete }) {
  const userId = user?.uid;


  return (
    <div className="pad mx-lg-5 mt-5">
      {blogs?.map((item) => (
        <div className="row pb-4 mx-5 mb-5 borderIt" key={item.id}>
          <div className="col-md-5 col-12 col-lg-6">
            <div className="hover-blogs-img">
              <div className="blogs-img mt-2">
                <img src={item.imgUrl} alt={item.title} className="card-img" />
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12 col-lg-6">
            <div className="text-start">
              <h2 className="title ">{item.title}</h2>
              <span className="meta-info">
                <h5 className="author">{item.author}</h5>
                {item.timeStamp.toDate().toDateString()}
              </span>
            </div>
            <div className=" text-start mt-2">
              <p>
                <u>
                  <b>Description:-</b>
                </u>
              </p>
              <p className="mx-1"> &nbsp; &nbsp;{except(item.desc, 120)}</p>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-lg-12 col-md-12">
                <Link to={`/detail/${item.id}`}>
                  <button className="btn btn-read mt-3">Read More</button>
                </Link>
              </div>
              {userId && item.userID === userId ? (
                <div className="col-12 col-lg-12 col-md-12 d-flex align-items-center my-3">
                  <AiIcon.AiTwotoneDelete
                    name="trash"
                    style={{ marginRight: "15px", cursor: "pointer" }}
                    className="StyleIt"
                    onClick={() => handleDelete(item.id)}
                  />
                  <Link to={`/update/${item.id}`}>
                    <AiIcon.AiTwotoneEdit
                      name="edit"
                      style={{ cursor: "pointer" }}
                      className="StyleIt"
                    />
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ))}

      {userId ? (
        <></>
          
      ) : (
        <>
        <div className="text-center heading">Have An Amazing Thought ?</div>
          <div className="SigUp text-center my-1"><Link to={'/auth'} style={{'textDecoration':'underline',color:'black'}}>Join Our Community</Link></div>
        </>
      )}
    </div>
  );
}

export default HomeComponent;
