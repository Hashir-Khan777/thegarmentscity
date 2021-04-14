import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCreate } from "../store/action/ProductAction";
import firebase from "firebase/app";
import Loadingbox from "../components/Loadingbox";

const CreateProduct = () => {
  const ProductCreateReducer = useSelector(
    (state) => state.ProductCreateReducer
  );
  const { loading, success, error } = ProductCreateReducer;

  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [gender, setGender] = useState();
  const [collection, setCollection] = useState();
  const [category, setCategory] = useState();
  const [SmallStock, setSmallStock] = useState();
  const [MediumStock, setMediumStock] = useState();
  const [LargeStock, setLargeStock] = useState();
  const [ShoesStock, setShoesStock] = useState();
  const [ShoesNumbers, setShoesNumbers] = useState();
  const [WalleteStock, setWalleteStock] = useState();
  const [brand, setBrand] = useState();
  const [image, setImage] = useState();
  const [passwordError, setPasswordError] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [RequiredField, setRequiredField] = useState();

  const dispatch = useDispatch();

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const createhandle = (e) => {
    e.preventDefault();
    if (category && category.includes("shoes")) {
      if (!ShoesStock && !ShoesNumbers) {
        setRequiredField("shoes stock and numbers are required");
      } else {
        setRequiredField();
      }
    } else if (
      (category && category.toLowerCase().includes("purse")) ||
      (category && category.toLowerCase().includes("wallet"))
    ) {
      if (!WalleteStock) {
        setRequiredField("wallet or purse stock is required");
      } else {
        setRequiredField();
      }
    } else if (!SmallStock || !LargeStock || !MediumStock) {
      setRequiredField("stocks are required");
    } else {
      setRequiredField();
    }

    if (image && !RequiredField) {
      const uploadImage = firebase
        .storage()
        .ref("products")
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
            .ref("products")
            .child(image.name)
            .getDownloadURL()
            .then((image) => {
              dispatch(
                ProductCreate({
                  description,
                  price,
                  gender,
                  collec: collection,
                  category,
                  SmallStock,
                  MediumStock,
                  LargeStock,
                  ShoesNumbers,
                  ShoesStock,
                  WalleteStock,
                  brand,
                  image,
                })
              );
              setUploadLoading(false);
            })
            .catch((err) => {
              setUploadLoading(false);
              setPasswordError(err);
            })
      );
    } else {
      setPasswordError("Image is required");
    }
  };

  return (
    <div className="register">
      <Header />
      <div className="sign_in_form">
        {uploadLoading ? (
          <Loadingbox />
        ) : loading ? (
          <Loadingbox />
        ) : (
          <form method="POST" onSubmit={createhandle}>
            <fieldset>
              <div className="sign_in_content">
                <h1 className="form_heading">Create Product</h1>
                {error && <span className="error_message_signin">{error}</span>}
                {passwordError && (
                  <span className="error_message_signin">{passwordError}</span>
                )}
                {RequiredField && (
                  <span className="error_message_signin">{RequiredField}</span>
                )}
                {success && (
                  <span className="deliver_paid_success">
                    Product create successfully
                  </span>
                )}
                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="name">Product Description:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="email_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="email">Price:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="number"
                        name="number"
                        id="email"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                      <select
                        className="sign_in_input"
                        style={{ cursor: "pointer" }}
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="0">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="password_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="password">Collection:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Enter collection"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="password_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="confirmpassword">Category:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="text"
                        name="confirm password"
                        id="confirmpassword"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="all_stocks">
                  <div
                    className="password_section"
                    style={
                      (category && category.toLowerCase().includes("shoes")) ||
                      (category && category.toLowerCase().includes("purse")) ||
                      (category && category.toLowerCase().includes("wallet"))
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="small_stock">Small Stock:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="number"
                          name="confirm password"
                          id="small_stock"
                          placeholder="Enter small stock"
                          value={SmallStock}
                          onChange={(e) => setSmallStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="password_section"
                    style={
                      (category && category.toLowerCase().includes("shoes")) ||
                      (category && category.toLowerCase().includes("purse")) ||
                      (category && category.toLowerCase().includes("wallet"))
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="medium_stock">Medium Stock:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="number"
                          name="confirm password"
                          id="medium_stock"
                          placeholder="Enter medium stock"
                          value={MediumStock}
                          onChange={(e) => setMediumStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="password_section"
                    style={
                      (category && category.toLowerCase().includes("shoes")) ||
                      (category && category.toLowerCase().includes("purse")) ||
                      (category && category.toLowerCase().includes("wallet"))
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="large_stock">Large Stock:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="number"
                          name="confirm password"
                          id="large_stock"
                          placeholder="Enter large stock"
                          value={LargeStock}
                          onChange={(e) => setLargeStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="password_section"
                    style={
                      category && category.toLowerCase().includes("shoes")
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="large_stock">Shoes Numbers:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="text"
                          name="confirm password"
                          id="large_stock"
                          placeholder="2, 3, 4"
                          value={ShoesNumbers}
                          onChange={(e) => setShoesNumbers(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="password_section"
                    style={
                      category && category.toLowerCase().includes("shoes")
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="large_stock">Shoes Stock:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="text"
                          name="confirm password"
                          id="large_stock"
                          placeholder="20, 10, 30"
                          value={ShoesStock}
                          onChange={(e) => setShoesStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="password_section"
                    style={
                      (category && category.toLowerCase().includes("purse")) ||
                      (category && category.toLowerCase().includes("wallet"))
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="email_password_section">
                      <div>
                        <label htmlFor="large_stock">Stock:</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input
                          className="sign_in_input"
                          type="number"
                          name="confirm password"
                          id="large_stock"
                          placeholder="Enter wallet or purse stock"
                          value={WalleteStock}
                          onChange={(e) => setWalleteStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="password_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="brand">Brand:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="text"
                        name="confirm password"
                        id="brand"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="password_section">
                  <div className="email_password_section">
                    <div>
                      <label htmlFor="prodimage">Image:</label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        className="sign_in_input"
                        type="file"
                        accept="image/*"
                        name="image"
                        formEncType="multipart/form-data"
                        id="prodimage"
                        onChange={imageHandler}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <button className="signin_submit_button" type="submit">
                      Create
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

export default CreateProduct;
