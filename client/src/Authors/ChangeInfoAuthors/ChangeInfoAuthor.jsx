import React, { useEffect, useState } from "react";
import { useAsyncError, useParams } from "react-router-dom";
import axios from "axios";

export default function ChangeInfoAuthor() {
  const id_film = useParams().id;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [film, setFilm] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8082/authorByIdFilm?id_film=${id_film}`)
      .then((res) => setFilm(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const changeData = () => {
    axios.post(`http://localhost:8082/updateAuthor`, {
      name: name,
      phone: phone,
      id_film: id_film,
    });
    window.location.reload();
  };
  return (
    <div>
      {film == undefined ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>ID: {film.id}</p>
          <p>ID фильма: {film.id_film}</p>
          <p>Имя: {film.name}</p>
          <p>Телефон: {film.phone}</p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Имя"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Телефон"
            onChange={(event) => setPhone(event.target.value)}
          />
          <button onClick={changeData}>Изменить</button>
        </div>
      )}
    </div>
  );
}
