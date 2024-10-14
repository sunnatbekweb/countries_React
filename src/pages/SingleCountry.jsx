import React, { useEffect, useState } from "react";
import "../assets/styles/singleCountry.css";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";

const SingleCountry = () => {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState();
  const { cca2: countryCode } = useParams();

  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0 && countryCode) {
      setSingleCountry(
        countries.filter((country) => country.cca2 === countryCode)
      );
    }
  }, [countries, countryCode]);

  console.log(singleCountry);

  return (
    <main>
      <section>
        <div className="container">
          <Link to={"/"}>
            <IoMdArrowBack />
            <span>Go back</span>
          </Link>
          <div className="country-info">
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleCountry;
