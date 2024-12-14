import { useEffect, useState } from "react";

function SelectCountry() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectCountries, setSelectCountries] = useState("");
  const [selectstates, setSelectStates] = useState("");
  const [selectcities, setSelectCities] = useState("");

  console.log({ country });

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountry(data))

      .catch((error) => console.error("Error fetching countries" + error));
  }, []);
  console.log(selectCountries);

  useEffect(() => {
    if (!selectCountries) {
      return;
    }
    const url = `https://crio-location-selector.onrender.com/country=${selectCountries}/states`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((error) => console.error("Error fetching state" + error));
  }, [selectCountries]);
  console.log(selectstates);

  useEffect(() => {
    if (!selectstates) {
      return;
    }

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectCountries}/state=${selectstates}/cities`
    )
    .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((error) => console.error("Error fetching city" + error));
  }, [selectCountries, selectstates]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Select Location</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <select
          onChange={(e) => setSelectCountries(e.target.value)}
          value={selectCountries}
        >
          <option value="" disabled>
            Select Country
          </option>

          {country.map((countries) => (
            <option key={countries} value={countries}>
              {countries}
            </option>
          ))}
        </select>

        <select
          value={selectstates}
          onChange={(e) => setSelectStates(e.target.value)}
          disabled={!selectCountries}
        >
          <option value="" disabled>
            Select State
          </option>
          {state.map((states) => (
            <option key={states} value={states}>
              {states}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectCities(e.target.value)}
          value={selectcities}
          disabled={!selectstates}
        >
          <option value="" disabled>
            Select City
          </option>

          {city.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
  {selectcities ? (
        <p>
          <b>
            You selected <span style={{ fontSize: 20 }}>{selectcities}</span>,{" "}
            <span style={{ color: "grey" }}>
              {selectstates}, {selectCountries}
            </span>
          </b>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SelectCountry;
