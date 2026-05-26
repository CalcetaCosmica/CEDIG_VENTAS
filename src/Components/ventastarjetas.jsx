import React, { useState, useEffect } from "react";
import BlogCard from "../Layouts/BlogCard";

import img1 from "../assets/img/azul_tdc.jpg";
import img2 from "../assets/img/oro_tdc.jpg";
import img3 from "../assets/img/platino_tdc.jpg";

import { useVentas } from "./VentasContext";

const TarjetasPage = () => {

  // ✅ Hook dentro del componente
  const { setTotalTarjetas, setCantidadTDC } = useVentas();

  const [azul, setAzul] = useState("");
  const [oro, setOro] = useState("");
  const [platino, setPlatino] = useState("");

  const parseNumber = (v) => v.replace(/\D/g, "");

  const azulNum = Number(azul) || 0;
  const oroNum = Number(oro) || 0;
  const platinoNum = Number(platino) || 0;

  // Ganancias por tipo
  const ganAzul = azulNum * 200;
  const ganOro = oroNum * 250;
  const ganPlatino = platinoNum * 300;

  // Cantidad total de tarjetas
  const totalTarjetasVendidas = azulNum + oroNum + platinoNum;

  // Subtotal sin bono
  const subtotal = ganAzul + ganOro + ganPlatino;

  // Bono  HAY QUE ARREGLAR ESTOOOOO! 
  const bono = totalTarjetasVendidas > 1
    ? totalTarjetasVendidas * 0
    : 0;

  const total = subtotal + bono;

  // ✅ ACTUALIZA EL CONTEXTO CUANDO CAMBIA EL TOTAL
  useEffect(() => {
    setTotalTarjetas(total);
    setCantidadTDC(totalTarjetasVendidas);
  }, [total, totalTarjetasVendidas, setTotalTarjetas, setCantidadTDC]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-24 px-6">

      <h1 className="text-4xl font-bold text-[#06257D] text-center mb-10">
        Tarjetas de crédito
      </h1>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        <input
          type="text"
          value={azul}
          onChange={(e) => setAzul(parseNumber(e.target.value))}
          placeholder="Cantidad Azul"
          className="border rounded-lg py-3 text-center text-xl"
          inputMode="numeric"
        />

        <input
          type="text"
          value={oro}
          onChange={(e) => setOro(parseNumber(e.target.value))}
          placeholder="Cantidad Oro"
          className="border rounded-lg py-3 text-center text-xl"
          inputMode="numeric"
        />

        <input
          type="text"
          value={platino}
          onChange={(e) => setPlatino(parseNumber(e.target.value))}
          placeholder="Cantidad Platino"
          className="border rounded-lg py-3 text-center text-xl"
          inputMode="numeric"
        />
      </div>

      {/* Total */}
      <div className="bg-[#06257D] text-white px-10 py-6 rounded-2xl mt-10 text-center shadow-lg">
        <p className="text-lg">
          Total tarjetas vendidas: {totalTarjetasVendidas}
        </p>

        {bono > 0 && (
          <p className="text-md opacity-90">
            Bono aplicado: ${bono.toLocaleString()}
          </p>
        )}

        <p className="text-4xl font-bold mt-2">
          ${total.toLocaleString()}
        </p>
      </div>

      {/* Tabla */}
      <div className="w-full max-w-3xl">
        <table className="table-auto w-full border-separate border-spacing-4 text-center">
          <thead>
            <tr className="text-white font-semibold">
              <th className="bg-[#0050EF] rounded-xl py-3">Tipo</th>
              <th className="bg-[#1973E7] rounded-xl py-3">Cantidad</th>
              <th className="bg-[#2F8DEB] rounded-xl py-3">Ganancia</th>
            </tr>
          </thead>
          <tbody className="text-[#06257D] font-medium">
            <tr>
              <td className="bg-[#E3F2FD] rounded-xl py-3">Azul</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3">{azulNum}</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3 font-bold">
                ${ganAzul.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E3F2FD] rounded-xl py-3">Oro</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3">{oroNum}</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3 font-bold">
                ${ganOro.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="bg-[#E3F2FD] rounded-xl py-3">Platino</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3">{platinoNum}</td>
              <td className="bg-[#E3F2FD] rounded-xl py-3 font-bold">
                ${ganPlatino.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mb-10">
        <BlogCard img={img1} headlines="Azul $200" />
        <BlogCard img={img2} headlines="Oro $250" />
        <BlogCard img={img3} headlines="Platino $300" />
      </div>

    </div>
  );
};

export default TarjetasPage;