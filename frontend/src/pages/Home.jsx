import React from "react";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  document.querySelector("title").innerHTML =
    "Garments City - Choose of your Choice";

  return (
    <div className="garments_city_home">
      <Header />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
