import React from "react";
import * as FaIcon from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/HeaderStyle.css";
import { SideBarData } from "./SideHeader";
import { IconContext } from "react-icons";

import * as AiIcon from "react-icons/ai";
const Headers = ({user}) => {
  // Put curely braces around every props 🙄
  // we are passing the user object as an props that is why curly braces are there because when we destructure data (inshort retrive value that time this will help because object needed for destructuring )
  const userId = user?.uid;
  console.log("user", userId);
  console.log(user?.displayName);
  const [sideBar, setsideBar] = useState(false);
  const showSideBar = () => {
    setsideBar(!sideBar);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "WHITE" }}>
        <div className="navBar">
          <Link className="menuBars" onClick={showSideBar}>
            <FaIcon.HiBars3CenterLeft />
          </Link>
          <Link className=" white" to="/auth">
            <span style={{ fontSize: "18px" }}>Logout</span>
          </Link>
        </div>

        <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSideBar}>
            <li className="navbar-toggle">
              <Link className="menuBars">
                <AiIcon.AiFillCloseCircle />
              </Link>
            </li>

            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.classNa}>
                  <Link to={item.pathtoWhere}>
                    {item.icon}
                    <span className="sideItem">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Headers;
