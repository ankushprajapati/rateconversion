import React from "react";

const CurrencyDropdown = ({
  currencies,
  currnency,
  setCurrency,
  title = "",
}) => {
  return (
    <>
      <div>
        <label htmlFor={title}>{title}</label>
      </div>
      <div>
        <select value={currnency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies?.map((currnency) => {
            return (
              <option value={currnency} key={currnency}>
                {currnency}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default CurrencyDropdown;
