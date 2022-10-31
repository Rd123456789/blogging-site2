import React from 'react'
import { FirebaseStorage } from 'firebase/storage'
import * as firebase from 'firebase'

function JustComponent() {
    storageRef.child('images/.jpg').getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    var img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
  return (
    <img src="" alt="" id='myimg'/>
   

  )
}

export default JustComponent