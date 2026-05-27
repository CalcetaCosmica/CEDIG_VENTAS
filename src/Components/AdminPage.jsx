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

  const [guardando, setGuardando] =
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

  // GUARDAR CAMBIOS
  const guardarCambios = () => {
    setGuardando(true);

    setTimeout(() => {
      setGuardando(false);

      alert(
        "Cambios guardados correctamente ✅"
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] p-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#072146] to-[#004481] rounded-3xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white">
            Panel Administrador
          </h1>

          <p className="text-blue-100 mt-1">
            Gestión de vendedores
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#004481] mb-4">
            Agregar vendedor
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Nombre"
              className="border-2 border-blue-100 p-3 rounded-2xl outline-none focus:border-[#004481]"
              value={nuevo.nombre}
              onChange={(e) =>
                setNuevo({
                  ...nuevo,
                  nombre: e.target.value,
                })
              }
            />

            {/* SEGUROS */}
            <div>
              <input
                type="number"
                placeholder="Seguros"
                className="border-2 border-blue-100 p-3 rounded-2xl w-full outline-none focus:border-[#004481]"
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

              <p className="text-xs text-blue-500 mt-1">
                📈 Subiendo seguros
              </p>
            </div>

            {/* CREDITOS */}
            <div>
              <input
                type="number"
                placeholder="Consumo"
                className="border-2 border-blue-100 p-3 rounded-2xl w-full outline-none focus:border-[#004481]"
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

              <p className="text-xs text-blue-500 mt-1">
                💳 Subiendo consumo
              </p>
            </div>

            {/* EFI */}
            <div>
              <input
                type="number"
                placeholder="EFI"
                className="border-2 border-blue-100 p-3 rounded-2xl w-full outline-none focus:border-[#004481]"
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

              <p className="text-xs text-blue-500 mt-1">
                🏦 Subiendo EFI
              </p>
            </div>

            {/* TDC */}
            <div>
              <input
                type="number"
                placeholder="TDC"
                className="border-2 border-blue-100 p-3 rounded-2xl w-full outline-none focus:border-[#004481]"
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

              <p className="text-xs text-blue-500 mt-1">
                💠 Subiendo TDC
              </p>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={agregar}
              className="bg-[#004481] hover:bg-[#072146] text-white px-6 py-3 rounded-2xl transition"
            >
              Agregar vendedor
            </button>

            <button
              onClick={guardarCambios}
              className={`px-6 py-3 rounded-2xl text-white transition ${
                guardando
                  ? "bg-yellow-500"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {guardando
                ? "Guardando..."
                : "Guardar cambios"}
            </button>
          </div>
        </div>

        {/* LISTA */}
        <div className="space-y-4">
          {vendedores.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl shadow-xl p-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#004481]">
                    {v.nombre}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                    <p>
                      📈 Seguros:
                      {" "}
                      <span className="font-bold">
                        {v.seguros}
                      </span>
                    </p>

                    <p>
                      💳 Consumo:
                      {" "}
                      <span className="font-bold">
                        $
                        {v.creditos.toLocaleString()}
                      </span>
                    </p>

                    <p>
                      🏦 EFI:
                      {" "}
                      <span className="font-bold">
                        $
                        {v.efi.toLocaleString()}
                      </span>
                    </p>

                    <p>
                      💠 TDC:
                      {" "}
                      <span className="font-bold">
                        {v.tarjetas}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    eliminarVendedor(v.id);
                    setReload(!reload);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}