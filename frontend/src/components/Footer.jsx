import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  const date = new Date();

  return (
    <div className="footer_links">
      <footer>
        <div className="garments_city_footer_section">
          <div className="why_garments_city">
            <h3>why garments city</h3>
            <p>
              Garments City is the city of garments, where you can choose of
              your choice and buy what ever you like.
            </p>
          </div>
          <div className="garments_city_links">
            <h3>links</h3>
            <ul className="footer_list">
              <li className="footer_item">
                <Link to="/">Home</Link>
              </li>
              <li className="footer_item">
                <Link to="/SummerCollection">Summer wear</Link>
              </li>
              <li className="footer_item">
                <Link to="/WinterCollection">Winter wear</Link>
              </li>
              <li className="footer_item">
                <Link to="/MensFashion">Men's Fashion</Link>
              </li>
              <li className="footer_item">
                <Link to="/WomensFashion">Women's Fashion</Link>
              </li>
              <li className="footer_item">
                <Link to="/Contact">Contact</Link>
              </li>
              <li className="footer_item">
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="policy">
            <h3>social links</h3>
            <ul className="social_list">
              <li className="social_item">
                <a
                  href="https://www.facebook.com/TheGarmentsCity/"
                  target="_facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="social_item">
                <a
                  href="https://www.instagram.com/thegarmentscity/"
                  target="_insta"
                >
                  <i className="fab fa-instagram-square"></i>
                </a>
              </li>
              <li className="social_item">
                <a
                  href="https://www.twitter.com/thegarmentscity/"
                  target="_twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="social_item">
                <a
                  href="https://api.whatsapp.com/send?phone=+923103218171&text=Hello"
                  target="_whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_content">
          <h2>{date.getFullYear()}</h2>
          <i className="fas fa-copyright copy_icon"></i>
          <h2>
            <Link to="/">Garments City</Link>
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
