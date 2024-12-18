import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import classes from "./films.module.scss";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DropdownMenu from "../Dropdown/DropdownMenu";

export default function Films() {
  const [dataFilms, setDataFilms] = useState();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [ageLimit, setAgeLimit] = useState(0);

  const [dataAuthors, setDataAuthors] = useState();
  const [dataCompany, setDataCompany] = useState();
  const [dataMainact, setDataMainact] = useState();
  const [dataProd, setDataProd] = useState();

  const [searchData, setSearchData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    age: "",
    author: ["", 0],
    mainactor: ["", 0],
    company: ["", 0],
    producer: ["", 0],
  });
  const [filter, setFilter] = useState({
    name: "",
    description: "",
    price: ["", ""],
    quantity: ["", ""],
    age: ["", ""],
  });

  const submit = () => {
    axios
      .post("http://localhost:8082/main", {
        name: searchData.name,
        description: searchData.description,
        price: searchData.description,
        quantity: searchData.quantity,
        age: searchData.age,
        id_author: searchData.author[1],
        id_mainactor: searchData.mainactor[1],
        id_company: searchData.company[1],
        id_producer: searchData.producer[1],
      })
      .then((res) => {
        window.location.reload();
      });
  };
  console.log(searchData);
  useEffect(() => {
    axios
      .get("http://localhost:8082/main")
      .then((res) => setDataFilms(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8082/author")
      .then((res) => setDataAuthors(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8082/company")
      .then((res) => setDataCompany(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8082/mainactor")
      .then((res) => setDataMainact(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8082/producer")
      .then((res) => setDataProd(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(dataFilms);

  const search = () => {
    axios
      .get(
        `http://localhost:8082/search?name=${filter.name}&desc=${filter.description}&pricef=${filter.price[0]}&prices=${filter.price[1]}&quantityf=${filter.quantity[0]}&quantitys=${filter.quantity[1]}&agef=${filter.age[0]}&ages=${filter.age[1]}`
      )
      .then((res) => setDataFilms(res.data));
  };
  const del = (id) => {
    axios.delete(`http://localhost:8082/main?id=${id}`);
  };
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
            onChange={(event) =>
              setSearchData((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
          />
        </li>
        <li>
          <textarea
            name=""
            id=""
            placeholder="Описание"
            onChange={(event) =>
              setSearchData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
          ></textarea>
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Цена"
            onChange={(event) =>
              setSearchData((prev) => ({
                ...prev,
                price: event.target.value,
              }))
            }
          />
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Кол-во свободных мест"
            onChange={(event) =>
              setSearchData((prev) => ({
                ...prev,
                quantity: event.target.value,
              }))
            }
          />
        </li>
        <li>
          <input
            type="text"
            name=""
            id=""
            placeholder="Возрастное ограничение"
            onChange={(event) =>
              setSearchData((prev) => ({
                ...prev,
                age: event.target.value,
              }))
            }
          />
        </li>
        <li>
          <DropdownMenu
            name={"Автор"}
            data={dataAuthors}
            setSearchData={setSearchData}
          />
        </li>
        <li>
          <DropdownMenu
            name={"Компания"}
            data={dataCompany}
            setSearchData={setSearchData}
          />
        </li>
        <li>
          <DropdownMenu
            name={"Главный герой"}
            data={dataMainact}
            setSearchData={setSearchData}
          />
        </li>
        <li>
          <DropdownMenu
            name={"Продюсер"}
            data={dataProd}
            setSearchData={setSearchData}
          />
        </li>
        <li>
          <button onClick={submit}>Отправить</button>
        </li>
      </ul>
      <p>Поиск:</p>
      <input
        placeholder="По названию"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      ></input>
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="По описанию"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Цена 1"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            price: [e.target.value, filter.price[1]],
          }))
        }
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Цена 2"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            price: [filter.price[0], e.target.value],
          }))
        }
      />
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Количество 1"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            quantity: [e.target.value, filter.quantity[1]],
          }))
        }
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Количество 2"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            quantity: [filter.quantity[0], e.target.value],
          }))
        }
      />
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="Возраст 1"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            age: [e.target.value, filter.age[1]],
          }))
        }
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Возраст 2"
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            age: [filter.age[0], e.target.value],
          }))
        }
      />
      <br />
      <button onClick={search}>Найти</button>
      <ul>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
          <p>Название</p>
          <p>Описание</p>
          <p>Цена</p>
          <p>Количество свободных мест</p>
          <p>Возрастное ограничение</p>
          <p>Автор</p>
          <p>Компания</p>
          <p>Главный герой</p>
          <p>Продюсер</p>
        </li>
        {dataFilms == undefined ? (
          <p>Loading...</p>
        ) : (
          dataFilms.map((obj) => (
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
              }}
              key={obj.id.toString()}
              id={obj.id.toString()}
            >
              <p>{obj.f_name} </p>
              <p>{obj.f_desc} </p>
              <p>{obj.f_price} </p>
              <p>{obj.f_q} </p>
              <p>{obj.f_age} </p>
              <p>{obj.c_name} </p>
              <p>{obj.mact_name} </p>
              <p>{obj.pr_name} </p>
              <p>{obj.a_name} </p>
              <button onClick={() => del(obj.id)}>Удалить</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
