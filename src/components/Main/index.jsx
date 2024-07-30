import axios from "axios";
import React, { useState, useEffect } from "react";

const Index = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSearchValue("");
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setSelectedValue("");
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedValue) {
      filterCountriesByRegion(selectedValue);
    } else if (debouncedSearchValue) {
      searchCountry(debouncedSearchValue);
    } else {
      getCountries();
    }
  }, [selectedValue, debouncedSearchValue]);

  const getCountries = () => {
    setLoader(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const regions = response.data.map((country) => country.region);
        const uniqueRegions = [...new Set(regions)];
        setRegions(uniqueRegions);
        setCountries(response.data);
        setLoader(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  const searchCountry = (search) => {
    setLoader(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const searchData = response.data.filter((v) =>
          v.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setCountries(searchData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const filterCountriesByRegion = (region) => {
    setLoader(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const filtered = response.data.filter((v) => v.region === region);
        setCountries(filtered);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  return (
    <main className="mt-[80px] py-[45px]">
      <div
        className={`loader_wrapper ${
          loader ? "grid" : "hidden"
        } place-content-center w-full h-screen bg-[rgba(0,0,0,0.5)] absolute top-0`}
      >
        <span className="loader">L &nbsp; ading</span>
      </div>

      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center border max-w-[480px] py-4 rounded-[5px] px-8 shadow-lg hover:shadow-2xl hover:cursor-text gap-6 duration-200">
            <i className="bx bx-search text-[#848484] text-lg"></i>
            <input
              onInput={handleInputChange}
              value={searchValue}
              type="text"
              placeholder="Search for a country…"
              className="w-[480px] focus:outline-none placeholder:text-[#848484] text-sm"
            />
          </div>

          <select
            className="cursor-pointer px-6 py-4 shadow-md border hover:shadow-xl duration-200 focus:outline-none"
            onChange={handleChange}
            value={selectedValue}
          >
            <option value="" disabled>
              Filter by Region
            </option>
            {regions.map((region, index) => {
              return (
                <option key={index} value={region}>
                  {region}
                </option>
              );
            })}
          </select>
        </div>

        <div className="wrapper mt-12">
          {countries.map((el, index) => {
            return (
              <a href="" key={index}>
                <div className="card w-full rounded-[5px] shadow-lg hover:shadow-2xl duration-300 hover:cursor-pointer">
                  <div className="w-full h-[160px] border overflow-hidden">
                    <img
                      src={el?.flags.png}
                      alt="flag"
                      className="h-full object-cover object-center w-full"
                    />
                  </div>
                  <div className="px-6 pt-6 pb-[46px]">
                    <h5
                      className="text-[#111517] text-lg font-extrabold mb-4"
                      title={el?.name?.common}
                    >
                      {el?.name?.common.length > 25
                        ? el?.name?.common.substring(0, 25) + "..."
                        : el?.name?.common}
                    </h5>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#111517] text-sm font-light">
                        <strong className="font-semibold">Population: </strong>
                        {el?.population}
                      </p>
                      <p className="text-[#111517] text-sm font-light">
                        <strong className="font-semibold">Region: </strong>{" "}
                        {el?.region}
                      </p>
                      <p className="text-[#111517] text-sm font-light">
                        <strong className="font-semibold">Capital: </strong>{" "}
                        {el?.capital > 20
                          ? el?.capital.substring(0, 20) + "..."
                          : el?.capital}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Index;
