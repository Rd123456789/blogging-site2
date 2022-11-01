import React from "react";
import * as FaIcon from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./CSS/HeaderStyle.css";
// import { SideBarData } from "./SideHeader";
import { IconContext } from "react-icons";
import * as Bitcon from "react-icons/bi";
import * as mdIcon from "react-icons/md";
import * as AiIcon from "react-icons/ai";
import * as fssIcon from "react-icons/bs";
const Headers = ({ user, handleLogout }) => {
  // Put curely braces around every props 🙄
  // we are passing the user object as an props that is why curly braces are there because when we destructure data (inshort retrive value that time this will help because object needed for destructuring )
  const userId = user?.uid;

  const [sideBar, setsideBar] = useState(false);
  const showSideBar = () => {
    setsideBar(!sideBar);
  };
  return (
    <>
      <div className="mainDivMaster">
        <IconContext.Provider value={{ color: "WHITE" }}>
          <div className="navBar">
            <div className="leftDiv">
              <Link className="menuBars" onClick={showSideBar}>
                <FaIcon.HiBars3CenterLeft />
              </Link>
            </div>
            <div className="rightDiv">
              {userId ? (
                <div className="profileLogo">
                  <Bitcon.BiUserCircle className=" pad" id="override" />
                  <p className="styleitText pad" id="override2">
                    {user?.displayName}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {userId ? (
                <>
                  <Link
                    className=" white pad"
                    to="/auth"
                    onClick={handleLogout}
                  >
                    <p id="override3">Log-out</p>
                  </Link>
                </>
              ) : (
                <>
                  <Link className=" white pad" to="/auth">
                    <p id="override3">Log-In</p>
                  </Link>
                </>
              )}
            </div>
          </div>

          <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSideBar}>
              <li className="navbar-toggle">
                <Link className="menuBars">
                  <AiIcon.AiFillCloseCircle />
                </Link>
              </li>
              return (
              <>
                <li key={"0"} className="nav-text">
                  <Link to="/">
                    <AiIcon.AiFillHome />
                    <span className="sideItem">Home</span>
                  </Link>
                </li>
                {userId ? (
                  <>
                    <li key={"1"} className="nav-text">
                      <Link to="/create">
                        <mdIcon.MdCreate />
                        <span className="sideItem">Create</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li key={"2"} className="nav-text">
                  <Link to="/about">
                    <fssIcon.BsBook />
                    <span className="sideItem">About</span>
                  </Link>
                </li>
              </>
              )
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Headers;
