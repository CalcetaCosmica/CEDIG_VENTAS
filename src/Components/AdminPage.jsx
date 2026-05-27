// src/pages/AdminPage.jsx

import { useState } from "react";

import {
  obtenerVendedores,
  agregarVendedor,
  eliminarVendedor,
  actualizarVendedor,
} from "../data/database";

export default function AdminPage() {
  const [guardando, setGuardando] =
    useState(false);

  const [vendedores, setVendedores] =
    useState(obtenerVendedores());

  const [nuevo, setNuevo] = useState({
    nombre: "",
    seguros: 0,
    creditos: 0,
    efi: 0,
    tarjetas: 0,
  });

  // AGREGAR
  const agregar = () => {
    if (!nuevo.nombre) return;

    agregarVendedor(nuevo);

    setVendedores(obtenerVendedores());

    setNuevo({
      nombre: "",
      seguros: 0,
      creditos: 0,
      efi: 0,
      tarjetas: 0,
    });
  };

  // GUARDAR
  const guardarCambios = () => {
    setGuardando(true);

    setTimeout(() => {
      setGuardando(false);

      alert(
        "Cambios guardados correctamente ✅"
      );
    }, 1500);
  };

  // ACTUALIZAR INPUTS
  const actualizarCampo = (
    id,
    campo,
    valor
  ) => {
    actualizarVendedor(id, {
      [campo]:
        campo === "nombre"
          ? valor
          : Number(valor),
    });

    setVendedores(obtenerVendedores());
  };

  // ELIMINAR
  const eliminar = (id) => {
    eliminarVendedor(id);

    setVendedores(obtenerVendedores());
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] p-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#072146] to-[#004481] rounded-3xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white">
            Panel Administrador
          </h1>

          <p className="text-blue-100 mt-1">
            Gestión de vendedores
          </p>
        </div>

        {/* AGREGAR */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#004481] mb-5">
            Agregar vendedor
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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

            <input
              type="number"
              placeholder="Seguros"
              className="border-2 border-blue-100 p-3 rounded-2xl outline-none focus:border-[#004481]"
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
              placeholder="Consumo"
              className="border-2 border-blue-100 p-3 rounded-2xl outline-none focus:border-[#004481]"
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
              className="border-2 border-blue-100 p-3 rounded-2xl outline-none focus:border-[#004481]"
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
              className="border-2 border-blue-100 p-3 rounded-2xl outline-none focus:border-[#004481]"
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

        {/* VENDEDORES */}
        <div className="space-y-5">
          {vendedores.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl shadow-xl p-5"
            >
              {/* HEADER CARD */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-[#004481]">
                  {v.nombre}
                </h2>

                <button
                  onClick={() =>
                    eliminar(v.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl transition"
                >
                  Eliminar
                </button>
              </div>

              {/* INPUTS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* SEGUROS */}
                <div className="bg-[#f4f8fd] rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    📈 Seguros
                  </p>

                  <input
                    type="number"
                    value={v.seguros}
                    onChange={(e) =>
                      actualizarCampo(
                        v.id,
                        "seguros",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-blue-100 p-2 rounded-xl outline-none focus:border-[#004481]"
                  />

                  <p className="text-xs text-blue-500 mt-2">
                    Subiendo seguros...
                  </p>
                </div>

                {/* CONSUMO */}
                <div className="bg-[#f4f8fd] rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    💳 Consumo
                  </p>

                  <input
                    type="number"
                    value={v.creditos}
                    onChange={(e) =>
                      actualizarCampo(
                        v.id,
                        "creditos",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-blue-100 p-2 rounded-xl outline-none focus:border-[#004481]"
                  />

                  <p className="text-xs text-blue-500 mt-2">
                    Subiendo consumo...
                  </p>
                </div>

                {/* EFI */}
                <div className="bg-[#f4f8fd] rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    🏦 EFI
                  </p>

                  <input
                    type="number"
                    value={v.efi}
                    onChange={(e) =>
                      actualizarCampo(
                        v.id,
                        "efi",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-blue-100 p-2 rounded-xl outline-none focus:border-[#004481]"
                  />

                  <p className="text-xs text-blue-500 mt-2">
                    Subiendo EFI...
                  </p>
                </div>

                {/* TDC */}
                <div className="bg-[#f4f8fd] rounded-2xl p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    💠 TDC
                  </p>

                  <input
                    type="number"
                    value={v.tarjetas}
                    onChange={(e) =>
                      actualizarCampo(
                        v.id,
                        "tarjetas",
                        e.target.value
                      )
                    }
                    className="w-full border-2 border-blue-100 p-2 rounded-xl outline-none focus:border-[#004481]"
                  />

                  <p className="text-xs text-blue-500 mt-2">
                    Subiendo TDC...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}