const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lab",
});

const PORT = process.env.PORT || 8082;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/films", (req, res) => {
  const sql = "SELECT * FROM films";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/producer", (req, res) => {
  const sql = "SELECT * FROM producer";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/mainactor", (req, res) => {
  const sql = "SELECT * FROM mainactor";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/author", (req, res) => {
  const sql = "SELECT * FROM author";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/company", (req, res) => {
  const sql = "SELECT * FROM company";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/films", (req, res) => {
  const sql =
    "INSERT INTO films (`name`, `description`, `price`, `quantity`, `age`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity,
    req.body.ageLimit,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
app.post("/author", (req, res) => {
  const sql = "INSERT INTO author (`id_film`) VALUES (?)";
  const values = [req.body.id_film];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/mainactor", (req, res) => {
  const sql = "INSERT INTO mainactor (`id_film`) VALUES (?)";
  const values = [req.body.id_film];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
app.post("/producer", (req, res) => {
  const sql = "INSERT INTO producer (`id_film`) VALUES (?)";
  const values = [req.body.id_film];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
app.post("/company", (req, res) => {
  const sql = "INSERT INTO company (`id_film`) VALUES (?)";
  const values = [req.body.id_film];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.delete("/films", (req, res) => {
  const sql = `DELETE FROM films WHERE id=${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json;
  });
});
app.delete("/author", (req, res) => {
  const sql = `DELETE FROM author WHERE id_film=${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json;
  });
});
app.delete("/mainactor", (req, res) => {
  const sql = `DELETE FROM mainactor WHERE id_film=${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json;
  });
});
app.delete("/company", (req, res) => {
  const sql = `DELETE FROM company WHERE id_film=${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json;
  });
});
app.delete("/producer", (req, res) => {
  const sql = `DELETE FROM producer WHERE id_film=${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json;
  });
});
app.get("/filmsByName", (req, res) => {
  const sql = `SELECT * FROM films WHERE name LIKE ('${req.query.name}%')`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/filmsByDesc", (req, res) => {
  const sql = `SELECT * FROM films WHERE description LIKE ('${req.query.description}%')`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/filmsByPrice", (req, res) => {
  const sql = `SELECT * FROM films WHERE price BETWEEN ${req.query.pricef} AND ${req.query.prices}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/filmsByQuantity", (req, res) => {
  const sql = `SELECT * FROM films WHERE quantity BETWEEN ${req.query.qf} AND ${req.query.qs}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/filmsByAge", (req, res) => {
  const sql = `SELECT * FROM films WHERE age BETWEEN ${req.query.agef} AND ${req.query.ages}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/authorByIdFilm", (req, res) => {
  const sql = `SELECT * FROM author WHERE id_film=${req.query.id_film}`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/updateAuthor", (req, res) => {
  const sql = `UPDATE author SET name = '${req.body.name}', phone = ${req.body.phone} WHERE id_film = ${req.body.id_film}`;
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Err" });
    return res.json;
  });
});

app.listen(PORT, (err) => {
  console.log(`${PORT}`, err);
});
