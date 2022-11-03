import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { React, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebaseconf";
import "D:\\React_blog_App\\blogging-site\\src\\App.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthFile = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const naviGate = useNavigate();

  const { email, password, firstName, lastName, confirmPassword } = state;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleAuthentication = async (event) => {
    event.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          toast.error("Wrong Password");
        });

        console.log("work");
        naviGate("/");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (firstName && lastName && email && password && confirmPassword) {
        if (password.length < 6) {
          return toast.error("Password Should Contain 6 Letters!");
        } else if (password !== confirmPassword) {
          return toast.error("Passwords Should Match!");
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("working");
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        naviGate("/");
      } else if (
        !(firstName && lastName && email && password && confirmPassword)
      ) {
        toast.error("Required All Fields!!");
        console.log("error");
      }
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center  py-2 FormHeading">
            {!signUp ? "LOGIN" : "SIGN-UP"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-sm-6">
            <form className="row" onSubmit={handleAuthentication}>
              {signUp && (
                <>
                  <div className="col-6 py-3 mainForm">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Enter Your First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 py-3 mainForm">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Enter Your Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3 mainForm">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3 mainForm">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <div className="col-12 py-3 mainForm">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="Re-Type Your Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="col-12 py-2 text-center">
                <button
                  className={`btn ${!signUp ? "btn-signIn" : "btn-signUp"} `}
                  type="submit"
                  id="SubmitBtn"
                >
                  {!signUp ? "LOGIN" : "SIGN-UP"}
                </button>
              </div>
            </form>
          </div>
          {!signUp ? (
            <>
              <div className="text-center justify-content-center mt-1 pt-1 styling">
                <p className="small mt-1 pt-1 mb-1">Don't have An Account ?</p>
                <span
                  className="line-danger styleSign"
                  onClick={() => {
                    setSignUp(true);
                  }}
                >
                  SIGN-UP
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="text-center justify-content-center mt-1 pt-1 styling">
                <p className="small mt-1 pt-1 mb-1">Already Have An Account?</p>
                <span
                  className="line-danger styleSign"
                  onClick={() => {
                    setSignUp(false);
                  }}
                >
                  LOGIN
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthFile;
