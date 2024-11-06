import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function Company() {
  const [dataCompany, setDataCompany] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8082/company")
      .then((res) => setDataCompany(res.data));
  }, []);
  return (
    <div>
      <Navbar />
      <ul>
        {dataCompany == undefined ? (
          <p>Loading...</p>
        ) : (
          dataCompany.map((obj) => (
            <li>
              <p>{obj.id_film}</p>
              <p>
                {obj.name == "" ? <input placeholder="Имя"></input> : obj.name}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
