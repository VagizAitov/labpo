const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "labpo",
});

const PORT = process.env.PORT || 8082;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/main", (req, res) => {
  const sql =
    "SELECT films.id AS id, films.name AS f_name, films.description AS f_desc, films.price AS f_price, films.quantity AS f_q, films.age AS f_age, company.name AS c_name, mainactor.name AS mact_name, producer.name AS pr_name, author.name AS a_name FROM films JOIN author ON films.id_author=author.id JOIN company ON films.id_company=company.id JOIN mainactor ON films.id_mainactor=mainactor.id JOIN producer ON films.id_producer=producer.id";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/search", (req, res) => {
  const sql = `SELECT films.id AS id, films.name AS f_name, films.description AS f_desc, films.price AS f_price, films.quantity AS f_q, films.age AS f_age, company.name AS c_name, mainactor.name AS mact_name, producer.name AS pr_name, author.name AS a_name FROM films JOIN author ON films.id_author=author.id JOIN company ON films.id_company=company.id JOIN mainactor ON films.id_mainactor=mainactor.id JOIN producer ON films.id_producer=producer.id WHERE films.name LIKE '${
    req.query.name
  }%' AND films.description LIKE '${req.query.desc}%' ${
    !req.query.pricef || !req.query.prices
      ? ""
      : `AND films.price >= ${req.query.pricef} AND films.price <= ${req.query.prices}`
  }${
    !req.query.quantityf || !req.query.quantitys
      ? ""
      : `AND films.quantity >= ${req.query.quantityf} AND films.quantity <= ${req.query.quantitys}`
  }${
    !req.query.agef || !req.query.ages
      ? ""
      : `AND films.age >= ${req.query.agef} AND films.age <= ${req.query.ages}`
  }`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/main", (req, res) => {
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity,
    req.body.age,
    req.body.id_author,
    req.body.id_company,
    req.body.id_mainactor,
    req.body.id_producer,
  ];
  const sql =
    "INSERT INTO films (name, description, price, quantity, age, id_author, id_company, id_mainactor, id_producer) VALUES (?)";
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.delete("/main", (req, res) => {
  const sql = `DELETE FROM films WHERE id=${req.query.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/author", (req, res) => {
  const sql = `INSERT INTO author (name) VALUES ('${req.body.name}')`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/author", (req, res) => {
  const sql = "SELECT * FROM author";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/company", (req, res) => {
  const sql = `INSERT INTO company (name) VALUES ('${req.body.name}')`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/company", (req, res) => {
  const sql = "SELECT * FROM company";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/mainactor", (req, res) => {
  const sql = `INSERT INTO mainactor (name) VALUES ('${req.body.name}')`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/mainactor", (req, res) => {
  const sql = "SELECT * FROM mainactor";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/producer", (req, res) => {
  const sql = `INSERT INTO producer (name) VALUES ('${req.body.name}')`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/producer", (req, res) => {
  const sql = "SELECT * FROM producer";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(PORT, (err) => {
  console.log(`${PORT}`, err);
});
