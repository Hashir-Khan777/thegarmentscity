import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loadingbox from "../components/Loadingbox";
import { UpdateUserProfile, User_Details } from "../store/action/UserAction";
import firebase from "firebase/app";

const Edit = () => {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, user, error } = UserDetails;

  const UserUpdate = useSelector((state) => state.UserUpdate);
  const { loadingUpdate, successUpdate, errorUpdate } = UserUpdate;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [gender, setGender] = useState(userInfo.gender);
  const [image, setImage] = useState(userInfo.image);
  const [password, setPassword] = useState(userInfo.password);
  const [confirmPassword, setConfirmPassword] = useState(userInfo.password);
  const [passwordError, setPasswordError] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const update = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (image.name) {
        const uploadImage = firebase
          .storage()
          .ref("/images")
          .child(image.name)
          .put(image);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            if (snapshot) {
              setUploadLoading(true);
            }
          },
          (error) => {
            setUploadLoading(false);
            setPasswordError(error);
          },
          () =>
            firebase
              .storage()
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((image) => {
                dispatch(
                  UpdateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                    gender,
                    image,
                  })
                );
                console.log(image);
                setUploadLoading(false);
              })
              .catch((err) => {
                setUploadLoading(false);
                setPasswordError(err);
              })
        );
      } else {
        dispatch(
          UpdateUserProfile({
            userId: user._id,
            name,
            email,
            password,
            gender,
            image,
          })
        );
      }
    } else {
      setPasswordError("Password does not match");
    }
  };

  useEffect(() => {
    dispatch({ type: "USER_UPDATE_RESET" });
    if (!user) {
      dispatch(User_Details(userInfo._id));
    }
  }, [dispatch, userInfo._id, user]);

  return (
    <div className="register">
      <Header />
      <div className="sign_in_form">
        {loading ? (
          <Loadingbox />
        ) : loadingUpdate ? (
          <Loadingbox />
        ) : uploadLoading ? (
          <Loadingbox />
        ) : (
          <form method="POST" onSubmit={update}>
            <fieldset>
              <div className="sign_in_content">
                <h1 className="form_heading">Edit Profile</h1>
                {error && <p className="error_message_signin">{error}</p>}
                {passwordError && (
                  <p className="error_message_signin">{passwordError}</p>
                )}
                {errorUpdate && (
                  <p className="error_message_signin">{errorUpdate}</p>
                )}
                {successUpdate && (
                  <p className="deliver_paid_success">
                    Profile Update Successfully
                  </p>
                )}
                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="name">Name:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="email">Email Address:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="gender">Gender:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      {gender === "Male" ? (
                        <select
                          className="sign_in_input"
                          style={{ cursor: "pointer" }}
                          name="gender"
                          id="gender"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value={gender}>{gender}</option>
                          <option value="Female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : gender === "Female" ? (
                        <select
                          className="sign_in_input"
                          style={{ cursor: "pointer" }}
                          name="gender"
                          id="gender"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value={gender}>{gender}</option>
                          <option value="Male">Male</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <select
                          className="sign_in_input"
                          style={{ cursor: "pointer" }}
                          name="gender"
                          id="gender"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value={gender}>{gender}</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="password">Password:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="confirm">Confirm Password:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="password"
                        name="password"
                        id="confirm"
                        placeholder="Enter confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="gender">Profile Picture:</label>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="choose_file"
                      onChange={imageHandler}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <button className="signin_submit_button" type="submit">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
