import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Films from "./Films/Films";
import Producers from "./Producers/Producers";
import Mainactor from "./Mainactor/Mainactor";
import Authors from "./Authors/Authors";
import Company from "./Company/Company";
import ChangeInfoProducer from "./Producers/ChangeInfoProducer/ChangeInfoProducer";
import ChangeInfoAuthor from "./Authors/ChangeInfoAuthors/ChangeInfoAuthor";
import ChangeInfoCompany from "./Company/ChangeInfoCompany/ChangeInfoCompany";
import ChangeInfoMainactor from "./Mainactor/ChangeInfoMainactor/ChangeInfoMainactor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/producers" element={<Producers />} />
      <Route path="/mainactor" element={<Mainactor />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/company" element={<Company />} />
      <Route path="/changeInfoProducer/:id" element={<ChangeInfoProducer />} />
      <Route
        path="/changeInfoMainactor/:id"
        element={<ChangeInfoMainactor />}
      />
      <Route path="/changeInfoCompany/:id" element={<ChangeInfoCompany />} />
      <Route path="/changeInfoAuthor/:id" element={<ChangeInfoAuthor />} />
    </Routes>
  );
}

export default App;
