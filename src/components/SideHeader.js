import React from "react";
import * as FaIcon from "react-icons/hi2";
import * as AiIcon from "react-icons/ai";
import * as fcIcon from "react-icons/fc";
import * as fssIcon from 'react-icons/bs'
import * as mdIcon from 'react-icons/md'
// import IoCreateOutline from 'react-icons/'

import * as IoIcon from "react-icons/io";

export const SideBarData = [
  {
    title: "Home",
    pathtoWhere: "/",
    icon: <AiIcon.AiFillHome />,
    classNa: "nav-text",
  },
  {
    title: "Create",
    pathtoWhere: "/create",
    icon: <mdIcon.MdCreate />,
    classNa: "nav-text",
  },

  {
    title: "About",
    pathtoWhere: "/about",
    icon: <fssIcon.BsBook />,
    classNa: "nav-text",
  },
//   {
//     title: "LogOut",
//     pathtoWhere: "/",
//     icon: <AiIcon.AiOutlineLogin />,
//     classNa: "nav-text",
//   },
];
