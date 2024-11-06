import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Authors() {
  const [dataAuthors, setDataAuthors] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8082/producer")
      .then((res) => setDataAuthors(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(dataAuthors);
  return (
    <div>
      <Navbar />
      <ul>
        {dataAuthors == undefined ? (
          <p>Loading...</p>
        ) : (
          dataAuthors.map((obj) => (
            <li style={{ listStyleType: "none" }}>
              <p>
                <Link to={`/changeInfoAuthor/${obj.id_film}`}>
                  {obj.id_film}
                </Link>
              </p>
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
