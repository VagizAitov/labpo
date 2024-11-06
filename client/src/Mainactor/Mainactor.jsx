import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function Mainactor() {
  const [dataMainactor, setDataMainactor] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8082/mainactor")
      .then((res) => setDataMainactor(res.data));
  }, []);
  return (
    <div>
      <Navbar />
      <ul>
        {dataMainactor == undefined ? (
          <p>Loading...</p>
        ) : (
          dataMainactor.map((obj) => (
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
