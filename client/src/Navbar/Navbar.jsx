import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  return (
    <div>
      <Link to="/" style={{ paddingLeft: "10px" }}>
        Фильмы
      </Link>
      <Link to="/producers" style={{ paddingLeft: "10px" }}>
        Продюсеры
      </Link>
      <Link to="/company" style={{ paddingLeft: "10px" }}>
        Компании
      </Link>
      <Link to="/mainactor" style={{ paddingLeft: "10px" }}>
        Главные герои
      </Link>
      <Link to="/authors" style={{ paddingLeft: "10px" }}>
        Авторы
      </Link>
    </div>
  );
}
