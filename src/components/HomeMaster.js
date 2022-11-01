import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseconf";
import { toast } from "react-toastify";
import HomeComponent from "../pages/HomeComponent";

function HomeMaster({ userLogin }) {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "BlogsCollection"),
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete=async(id)=>{
    if(window.confirm("This will Delete Your blog Permently!")){
      try{
        await deleteDoc(doc(db,'BlogsCollection',id))
      }
      catch(error){
          console.log(error);
      }
    }
  }
  return (
    <>
      <HomeComponent blogs={blogs} handleDelete={handleDelete} user={userLogin}/>
    </> 
  );
}

export default HomeMaster;
