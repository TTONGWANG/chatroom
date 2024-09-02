import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Add from "../img/addAvatar.png";
import Loading from "../components/Loading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    setShowAnimation(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const uploadSnapshot = await uploadTask; // waits for upload completion
      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });
      const data = await setDoc(doc(db, "userChats", res.user.uid), {});
      if (res && data) {
        setShowAnimation(false);
      }
      navigate("/")
    } catch {
      setErr(true);
      setShowAnimation(false);
    }
  };
  return (
    <div>
      {showAnimation && <Loading />}
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">ChatRoom</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="displayname" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button>Sign up</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>
            You do not have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
