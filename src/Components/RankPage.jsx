// src/pages/RankPage.jsx

import { useEffect, useState } from "react";

import {
  obtenerVendedores,
  metas,
} from "../data/database";

export default function RankPage() {
  const [vendedores, setVendedores] =
    useState([]);

  // CARGAR DATOS DEL LOCALSTORAGE
  useEffect(() => {
    cargarDatos();

    // ACTUALIZAR AUTOMÁTICAMENTE
    const interval = setInterval(() => {
      cargarDatos();
    }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  const cargarDatos = () => {
    const data =
      obtenerVendedores();

    setVendedores(data);
  };

  // CALCULAR PUNTAJE
  const calcularPuntaje = (
    vendedor
  ) => {
    const porcentajeSeguros =
      vendedor.seguros /
      metas.seguros;

    const porcentajeCreditos =
      vendedor.creditos /
      metas.creditos;

    const porcentajeEFI =
      vendedor.efi / metas.efi;

    const porcentajeTarjetas =
      vendedor.tarjetas /
      metas.tarjetas;

    return (
      porcentajeSeguros +
      porcentajeCreditos +
      porcentajeEFI +
      porcentajeTarjetas
    );
  };

  // ORDENAR RANKING
  const ranking = [...vendedores].sort(
    (a, b) =>
      calcularPuntaje(b) -
      calcularPuntaje(a)
  );

  // VERIFICAR META
  const cumplioMeta = (
    valor,
    meta
  ) => valor >= meta;

  return (
    <div className="min-h-screen bg-[#eef4ff] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#072146] to-[#004481] rounded-3xl shadow-2xl p-7 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            Ranking de Ventas
          </h1>

          <p className="text-center text-blue-100 mt-2">
            Dashboard de rendimiento
          </p>
        </div>

        {/* METAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-5 border-t-4 border-[#004481]">
            <p className="text-sm text-gray-500">
              Meta Seguros
            </p>

            <h2 className="text-3xl font-bold text-[#004481]">
              {metas.seguros}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-5 border-t-4 border-[#009ee3]">
            <p className="text-sm text-gray-500">
              Meta Créditos
            </p>

            <h2 className="text-3xl font-bold text-[#009ee3]">
              $
              {metas.creditos.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-5 border-t-4 border-[#1464A5]">
            <p className="text-sm text-gray-500">
              Meta EFI
            </p>

            <h2 className="text-3xl font-bold text-[#1464A5]">
              $
              {metas.efi.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-5 border-t-4 border-[#5BBEFF]">
            <p className="text-sm text-gray-500">
              Meta TDC
            </p>

            <h2 className="text-3xl font-bold text-[#5BBEFF]">
              {metas.tarjetas}
            </h2>
          </div>
        </div>

        {/* CARDS */}
        <div className="space-y-5">
          {ranking.map(
            (vendedor, index) => {
              const puntaje =
                calcularPuntaje(
                  vendedor
                );

              const porcentaje =
                Math.min(
                  (puntaje / 4) *
                    100,
                  100
                );

              return (
                <div
                  key={vendedor.id}
                  className={`rounded-3xl shadow-2xl p-5 transition-all duration-300 border-l-[10px] ${
                    index === 0
                      ? "bg-gradient-to-r from-[#072146] to-[#004481] text-white border-yellow-400"
                      : index === 1
                      ? "bg-white border-gray-400"
                      : index === 2
                      ? "bg-white border-orange-400"
                      : "bg-white border-[#004481]"
                  }`}
                >
                  {/* TOP */}
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-3xl font-bold">
                        #
                        {index + 1}
                      </h2>

                      <p
                        className={`text-xl font-semibold ${
                          index === 0
                            ? "text-blue-100"
                            : "text-gray-700"
                        }`}
                      >
                        {
                          vendedor.nombre
                        }
                      </p>
                    </div>

                    <div className="text-5xl">
                      {index === 0
                        ? "👑"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "🏅"}
                    </div>
                  </div>

                  {/* DATOS */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* SEGUROS */}
                    <div
                      className={`rounded-2xl p-4 ${
                        index === 0
                          ? "bg-white/10"
                          : "bg-[#f4f8fd]"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          index === 0
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        Seguros
                      </p>

                      <p
                        className={`text-2xl font-bold ${
                          cumplioMeta(
                            vendedor.seguros,
                            metas.seguros
                          )
                            ? "text-green-400"
                            : "text-red-500"
                        }`}
                      >
                        {
                          vendedor.seguros
                        }
                      </p>
                    </div>

                    {/* CREDITOS */}
                    <div
                      className={`rounded-2xl p-4 ${
                        index === 0
                          ? "bg-white/10"
                          : "bg-[#f4f8fd]"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          index === 0
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        Créditos
                      </p>

                      <p
                        className={`text-2xl font-bold ${
                          cumplioMeta(
                            vendedor.creditos,
                            metas.creditos
                          )
                            ? "text-green-400"
                            : "text-red-500"
                        }`}
                      >
                        $
                        {vendedor.creditos.toLocaleString()}
                      </p>
                    </div>

                    {/* EFI */}
                    <div
                      className={`rounded-2xl p-4 ${
                        index === 0
                          ? "bg-white/10"
                          : "bg-[#f4f8fd]"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          index === 0
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        EFI
                      </p>

                      <p
                        className={`text-2xl font-bold ${
                          cumplioMeta(
                            vendedor.efi,
                            metas.efi
                          )
                            ? "text-green-400"
                            : "text-red-500"
                        }`}
                      >
                        $
                        {vendedor.efi.toLocaleString()}
                      </p>
                    </div>

                    {/* TDC */}
                    <div
                      className={`rounded-2xl p-4 ${
                        index === 0
                          ? "bg-white/10"
                          : "bg-[#f4f8fd]"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          index === 0
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        TDC
                      </p>

                      <p
                        className={`text-2xl font-bold ${
                          cumplioMeta(
                            vendedor.tarjetas,
                            metas.tarjetas
                          )
                            ? "text-green-400"
                            : "text-red-500"
                        }`}
                      >
                        {
                          vendedor.tarjetas
                        }
                      </p>
                    </div>
                  </div>

                  {/* PROGRESO */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span
                        className={`font-semibold ${
                          index === 0
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Cumplimiento
                      </span>

                      <span
                        className={`font-bold ${
                          index === 0
                            ? "text-white"
                            : "text-[#004481]"
                        }`}
                      >
                        {Math.round(
                          porcentaje
                        )}
                        %
                      </span>
                    </div>

                    <div
                      className={`w-full rounded-full h-5 overflow-hidden ${
                        index === 0
                          ? "bg-white/20"
                          : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="h-5 rounded-full bg-gradient-to-r from-[#009ee3] to-[#5BBEFF] transition-all duration-700"
                        style={{
                          width: `${porcentaje}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}