import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Producers() {
  const [dataProds, setDataProds] = useState();
  const [name, setName] = useState();

  const submit = () => {
    axios
      .post("http://localhost:8082/producer", { name: name })
      .then((res) => console.log(res));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8082/producer")
      .then((res) => setDataProds(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <form>
        Создать автора: <br />
        Имя:{" "}
        <input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <button onClick={submit}>Создать</button>
      </form>
      <div>
        <ul>
          {dataProds == undefined ? (
            <p>Loading</p>
          ) : (
            dataProds.map((obj) => (
              <li key={obj.id}>
                id: {obj.id} <br />
                Имя: {obj.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
