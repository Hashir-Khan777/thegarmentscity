import Axios from "axios";

const Pay = (cardNumber, cvv, expDate, shipping, order, total, email) => (
  dispatch
) => {
  dispatch({
    type: "ORDER_PAY_REQUEST",
    payload: { cardNumber, cvv, expDate, shipping, order, total, email },
  });
  try {
    const successCallback = async ({ response }) => {
      const { data } = await Axios.post(
        "https://thegarmentscity.herokuapp.com/api/orders/payment",
        {
          merchantOrderId: order,
          token: response.token.token,
          currency: "PKR",
          total: total,
          billingAddr: {
            name: shipping.fullname,
            addrLine1: shipping.address,
            city: shipping.city,
            state: shipping.city,
            zipCode: shipping.postalCode,
            country: shipping.country,
            email: email,
            phoneNumber: shipping.number,
          },
        }
      );
      dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
    };
    const errorCallback = (err) => {
      dispatch({ type: "ORDER_PAY_FAIL", payload: err.errorMsg });
    };
    const args = {
      sellerId: "250742023501",
      publishableKey: "D104AE04-46E4-4D20-AC79-612DEA6DFC22",
      ccNo: cardNumber,
      cvv: cvv,
      expMonth: expDate.getMonth() + 1,
      expYear: expDate.getFullYear(),
    };

    window.TCO.loadPubKey("production", () => {
      window.TCO.requestToken(successCallback, errorCallback, args);
    });
  } catch (err) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
          ? err.message
          : err,
    });
  }
};

export { Pay };
