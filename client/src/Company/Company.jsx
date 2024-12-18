import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DropdownMenu from "../Dropdown/DropdownMenu";

export default function Company(props) {
  const [dataCompany, setDataCompany] = useState();
  const [name, setName] = useState();

  const submit = () => {
    axios
      .post("http://localhost:8082/company", { name: name })
      .then((res) => console.log(res));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8082/company")
      .then((res) => setDataCompany(res.data))
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
          {dataCompany == undefined ? (
            <p>Loading</p>
          ) : (
            dataCompany.map((obj) => (
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
