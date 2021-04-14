import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PlaceOrderContent from "../components/PlaceOrderContent";

const PlaceOrder = (props) => {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: "ORDER_CREATE_RESET" });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div className="place_order">
      <Header />
      <PlaceOrderContent />
      <Footer />
    </div>
  );
};

export default PlaceOrder;
