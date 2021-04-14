import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loadingbox from "../components/Loadingbox";
import Messagebox from "../components/Messagebox";
import "../css/updateProduct.css";
import { Product_Details } from "../store/action/FetchData";
import { ProductUpdate } from "../store/action/ProductAction";
import firebase from "firebase/app";

const UpdateProduct = (props) => {
  const ProductUpdateReducer = useSelector(
    (state) => state.ProductUpdateReducer
  );
  const { loadupdate, updateSuccess, updateError } = ProductUpdateReducer;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [gender, setGender] = useState();
  const [collection, setCollection] = useState();
  const [category, setCategory] = useState();
  const [SmallStock, setSmallStock] = useState();
  const [MediumStock, setMediumStock] = useState();
  const [LargeStock, setLargeStock] = useState();
  const [brand, setBrand] = useState();
  const [image, setImage] = useState();
  const [passwordError, setPasswordError] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const update = (e) => {
    e.preventDefault();
    if (image.name) {
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
                ProductUpdate({
                  id: props.match.params.id,
                  description,
                  price,
                  gender,
                  collec: collection,
                  category,
                  SmallStock,
                  MediumStock,
                  LargeStock,
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
      dispatch(
        ProductUpdate({
          id: props.match.params.id,
          description,
          price,
          gender,
          collec: collection,
          category,
          SmallStock,
          MediumStock,
          LargeStock,
          brand,
          image,
        })
      );
    }
  };

  useEffect(() => {
    dispatch({ type: "PRODUCT_UPDATE_RESET" });
    if (product && product.length === 0) {
      dispatch(Product_Details(props.match.params.id));
    } else {
      product && setDescription(product.description);
      product && setPrice(product.price);
      product && setGender(product.gender);
      product && setCollection(product.collec);
      product && setCategory(product.category);
      product && setSmallStock(product.SmallStock);
      product && setMediumStock(product.MediumStock);
      product && setLargeStock(product.LargeStock);
      product && setBrand(product.brand);
      product && setImage(product.image);
    }
  }, [dispatch, product, props.match.params.id]);

  return (
    <div className="register">
      <Header />
      <div className="sign_in_form">
        {uploadLoading ? (
          <Loadingbox />
        ) : loadupdate ? (
          <Loadingbox />
        ) : loading ? (
          <Loadingbox />
        ) : error ? (
          <Messagebox>{error}</Messagebox>
        ) : (
          <form method="POST" onSubmit={update}>
            <fieldset>
              <div className="sign_in_content">
                <h1 className="form_heading">Update Product</h1>
                {updateError && (
                  <span className="error_message_signin">{updateError}</span>
                )}
                {passwordError && (
                  <span className="error_message_signin">{passwordError}</span>
                )}
                {updateSuccess && (
                  <span className="deliver_paid_success">
                    Product update successfully
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

                <div className="password_section">
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

                <div className="password_section">
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

                <div className="password_section">
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
                        name="confirm password"
                        id="prodimage"
                        onChange={imageHandler}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <button className="signin_submit_button" type="submit">
                      Update
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

export default UpdateProduct;
