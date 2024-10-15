import React, { useEffect, useState } from "react";
import "../assets/styles/singleCountry.css";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";

const SingleCountry = () => {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState(null);
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
      const filteredCountry = countries.filter(
        (country) => country.cca2 === countryCode
      );
      setSingleCountry(filteredCountry[0]);
    }
  }, [countries, countryCode]);

  return (
    <main>
      <section>
        <div className="container">
          <Link to={"/"}>
            <IoMdArrowBack />
            <span>Go back</span>
          </Link>
          {singleCountry ? (
            <div className="country-info mt-20 flex items-center gap-x-[40px]">
              <img
                src={singleCountry.flags?.svg}
                className="w-[500px]"
                alt="Country flag"
              />

              <div>
                <h3 className="text-[32px] font-extrabold mb-6">
                  {singleCountry?.name?.common}
                </h3>

                <div className="flex gap-x-5 mb-16">
                  <ul>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Native Name:</strong>
                      {singleCountry?.name?.official}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Population:</strong>
                      {singleCountry?.population.toLocaleString()}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Region:</strong>
                      {singleCountry?.region}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Sub Region:</strong>
                      {singleCountry?.subregion
                        ? singleCountry.subregion
                        : singleCountry.region}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Capital:</strong>
                      {singleCountry?.capital[0]}
                    </li>
                  </ul>
                  <ul>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">
                        Top Level Domain:
                      </strong>
                      {singleCountry?.tld[0]}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Currencies:</strong>
                      {Object.entries(singleCountry?.currencies).map(
                        ([key, value]) => (
                          <p key={key}>
                            {value.name} ({value.symbol})
                          </p>
                        )
                      )}
                    </li>
                    <li className="flex gap-x-2 text-base font-light leading-[200%]">
                      <strong className="font-semibold">Languages:</strong>
                      {Object.values(singleCountry?.languages || {}).join(", ")}
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-x-[15px]">
                  <p className="text-base font-semibold leading-[150%]">
                    Border Countries:{" "}
                  </p>
                  <ul className="flex gap-x-[10px]">
                    {singleCountry?.borders
                      ? singleCountry?.borders?.map((country, index) => (
                          <li
                            className="px-6 py-1 shadow rounded-sm"
                            key={index}
                          >
                            {country}
                          </li>
                        ))
                      : "No border countries"}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default SingleCountry;
