import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import classes from "./films.module.scss";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Films() {
  const [dataFilms, setDataFilms] = useState();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [ageLimit, setAgeLimit] = useState(0);

  const [searchParamsName, setSearchParamsName] = useState("");
  const [searchParamsDesc, setSearchParamsDesc] = useState("");
  const [searchParamsPricef, setSearchParamsPricef] = useState(0);
  const [searchParamsPrices, setSearchParamsPrices] = useState(0);
  const [searchParamsQf, setSearchParamsQf] = useState(0);
  const [searchParamsQs, setSearchParamsQs] = useState(0);
  const [searchParamsAgef, setSearchParamsAgef] = useState(0);
  const [searchParamsAges, setSearchParamsAges] = useState(0);

  const searchByName = () => {
    axios
      .get(`http://localhost:8082/filmsByName?name=${searchParamsName}`)
      .then((res) => {
        console.log(res.data);
        setDataFilms(res.data);
      });
  };
  const searchByDesc = () => {
    axios
      .get(`http://localhost:8082/filmsByDesc?description=${searchParamsDesc}`)
      .then((res) => {
        console.log(res.data);
        setDataFilms(res.data);
      });
  };
  const searchByPrice = () => {
    axios
      .get(
        `http://localhost:8082/filmsByPrice?pricef=${searchParamsPricef}&prices=${searchParamsPrices}`
      )
      .then((res) => {
        console.log(res.data);
        setDataFilms(res.data);
      });
  };
  const searchByQuantity = () => {
    axios
      .get(
        `http://localhost:8082/filmsByQuantity?qf=${searchParamsQf}&qs=${searchParamsQs}`
      )
      .then((res) => {
        console.log(res.data);
        setDataFilms(res.data);
      });
  };
  const searchByAge = () => {
    axios
      .get(
        `http://localhost:8082/filmsByAge?agef=${searchParamsAgef}&ages=${searchParamsAges}`
      )
      .then((res) => {
        console.log(res.data);
        setDataFilms(res.data);
      });
  };

  const deleteObj = (id) => {
    axios
      .delete("http://localhost:8082/producer", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .delete("http://localhost:8082/author", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .delete("http://localhost:8082/company", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .delete("http://localhost:8082/mainactor", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .delete("http://localhost:8082/films", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const submit = () => {
    axios
      .post("http://localhost:8082/films", {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        ageLimit: ageLimit,
      })
      .then((res) => {
        console.log(res.data.insertId);
        axios.post("http://localhost:8082/producer", {
          id_film: res.data.insertId,
        });
        axios.post("http://localhost:8082/company", {
          id_film: res.data.insertId,
        });
        axios.post("http://localhost:8082/mainactor", {
          id_film: res.data.insertId,
        });
        axios
          .post("http://localhost:8082/author", {
            id_film: res.data.insertId,
          })
          .then((res) => {
            window.location.reload();
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/films")
      .then((res) => setDataFilms(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(dataFilms);
  return (
    <div>
      <Navbar />
      <ul className={classes.form}>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Название"
            onChange={(event) => setName(event.target.value)}
          />
        </li>
        <li>
          <textarea
            name=""
            id=""
            placeholder="Описание"
            onChange={(event) => setDesc(event.target.value)}
          ></textarea>
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Цена"
            onChange={(event) => setPrice(event.target.value)}
          />
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Кол-во свободных мест"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Возрастное ограничение"
            onChange={(event) => setAgeLimit(event.target.value)}
          />
        </li>
        <li>
          <button onClick={submit}>Отправить</button>
        </li>
      </ul>
      <p>Поиск:</p>
      <input
        placeholder="По названию"
        onChange={(event) => setSearchParams(event.target.value)}
      ></input>
      <button onClick={searchByName}>Найти</button>
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="По описанию"
        onChange={setSearchParamsDesc}
      />
      <button onClick={searchByDesc}>Найти</button>
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Цена 1"
        onChange={(event) => setSearchParamsPricef(event.target.value)}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Цена 2"
        onChange={(event) => setSearchParamsPrices(event.target.value)}
      />
      <button onClick={searchByPrice}>Найти</button>
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Количество 1"
        onChange={(event) => setSearchParamsQf(event.target.value)}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Количество 2"
        onChange={(event) => setSearchParamsQs(event.target.value)}
      />
      <button onClick={searchByQuantity}>Найти</button>
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Возраст 1"
        onChange={(event) => setSearchParamsAgef(event.target.value)}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Возраст 2"
        onChange={(event) => setSearchParamsAges(event.target.value)}
      />
      <button onClick={searchByAge}>Найти</button>
      <ul>
        {dataFilms == undefined ? (
          <p>Loading...</p>
        ) : (
          dataFilms.map((obj) => (
            <li
              style={{
                listStyleType: "none",
                border: "1px solid grey",
                borderRadius: "10px",
                paddingLeft: "10px",
              }}
              key={obj.id.toString()}
              id={obj.id.toString()}
            >
              <p>{obj.name}</p>
              <p>{obj.description}</p>
              <p>{obj.price}</p>
              <p>{obj.quantity}</p>
              <p>{obj.age}</p>
              <button onClick={() => deleteObj(obj.id)}>Удалить</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
