import React from "react";
import "../assets/styles/singleCountry.css";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const SingleCountry = () => {
  return (
    <main>
      <section>
        <div className="container">
          <Link to={"/"}>
            <IoMdArrowBack />
            <span>Go back</span>
          </Link>
          <div className="country-info"></div>
        </div>
      </section>
    </main>
  );
};

export default SingleCountry;
