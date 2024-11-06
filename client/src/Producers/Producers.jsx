import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Producers() {
  const [dataProducers, setDataProducers] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8082/producer")
      .then((res) => setDataProducers(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(dataProducers);
  return (
    <div>
      <Navbar />
      <ul>
        {dataProducers == undefined ? (
          <p>Loading...</p>
        ) : (
          dataProducers.map((obj) => (
            <li key={obj.id} id={obj.id.toString()}>
              <p>{obj.id_film}</p>
              <p>
                {obj.name == "" ? <input placeholder="Имя"></input> : obj.name}
              </p>
              <p>
                {obj.phone == "" ? (
                  <input placeholder="Телефон"></input>
                ) : (
                  obj.phone
                )}
              </p>
              <button>Изменить</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
