// src/pages/AdminPage.jsx

import { useState } from "react";

import {
  vendedores,
  agregarVendedor,
  eliminarVendedor,
  actualizarVendedor,
} from "../data/database";

export default function AdminPage() {
  const [reload, setReload] =
    useState(false);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    seguros: 0,
    creditos: 0,
    efi: 0,
    tarjetas: 0,
  });

  const agregar = () => {
    agregarVendedor(nuevo);

    setNuevo({
      nombre: "",
      seguros: 0,
      creditos: 0,
      efi: 0,
      tarjetas: 0,
    });

    setReload(!reload);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold">
            Panel Administrador
          </h1>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Nombre"
              className="border p-3 rounded-xl"
              value={nuevo.nombre}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  nombre: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Seguros"
              className="border p-3 rounded-xl"
              value={nuevo.seguros}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  seguros: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="number"
              placeholder="Créditos"
              className="border p-3 rounded-xl"
              value={nuevo.creditos}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  creditos: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="number"
              placeholder="EFI"
              className="border p-3 rounded-xl"
              value={nuevo.efi}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  efi: Number(
                    e.target.value
                  ),
                })
              }
            />

            <input
              type="number"
              placeholder="TDC"
              className="border p-3 rounded-xl"
              value={nuevo.tarjetas}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  tarjetas: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          <button
            onClick={agregar}
            className="mt-4 bg-black text-white px-6 py-3 rounded-2xl"
          >
            Agregar vendedor
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-4">
          {vendedores.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl shadow-xl p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {v.nombre}
                </h2>

                <p>
                  Seguros: {v.seguros}
                </p>

                <p>
                  Créditos: $
                  {v.creditos.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => {
                  eliminarVendedor(v.id);
                  setReload(!reload);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}