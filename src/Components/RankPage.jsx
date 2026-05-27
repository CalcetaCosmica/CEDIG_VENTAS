// src/pages/RankPage.jsx

import {
  vendedores,
  metas,
} from "../data/database";

export default function RankPage() {
  const calcularPuntaje = (vendedor) => {
    const porcentajeSeguros =
      vendedor.seguros / metas.seguros;

    const porcentajeCreditos =
      vendedor.creditos / metas.creditos;

    const porcentajeEFI =
      vendedor.efi / metas.efi;

    const porcentajeTarjetas =
      vendedor.tarjetas / metas.tarjetas;

    return (
      porcentajeSeguros +
      porcentajeCreditos +
      porcentajeEFI +
      porcentajeTarjetas
    );
  };

  const ranking = [...vendedores].sort(
    (a, b) =>
      calcularPuntaje(b) -
      calcularPuntaje(a)
  );

  const cumplioMeta = (valor, meta) =>
    valor >= meta;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-center">
            Ranking de Ventas
          </h1>
        </div>

        <div className="space-y-5">
          {ranking.map((vendedor, index) => {
            const puntaje =
              calcularPuntaje(vendedor);

            return (
              <div
                key={vendedor.id}
                className="bg-white rounded-3xl shadow-xl p-5"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      #{index + 1}
                    </h2>

                    <p className="text-xl font-semibold">
                      {vendedor.nombre}
                    </p>
                  </div>

                  <div className="text-5xl">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : "🏅"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Seguros
                    </p>

                    <p
                      className={`text-2xl font-bold ${
                        cumplioMeta(
                          vendedor.seguros,
                          metas.seguros
                        )
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {vendedor.seguros}
                    </p>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Créditos
                    </p>

                    <p
                      className={`text-2xl font-bold ${
                        cumplioMeta(
                          vendedor.creditos,
                          metas.creditos
                        )
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      $
                      {vendedor.creditos.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      EFI
                    </p>

                    <p
                      className={`text-2xl font-bold ${
                        cumplioMeta(
                          vendedor.efi,
                          metas.efi
                        )
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      $
                      {vendedor.efi.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      TDC
                    </p>

                    <p
                      className={`text-2xl font-bold ${
                        cumplioMeta(
                          vendedor.tarjetas,
                          metas.tarjetas
                        )
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {vendedor.tarjetas}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">
                      Avance
                    </span>

                    <span className="font-bold">
                      {Math.round(
                        (puntaje / 4) * 100
                      )}
                      %
                    </span>
                  </div>

                  <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden">
                    <div
                      className={`h-5 rounded-full ${
                        puntaje >= 4
                          ? "bg-green-500"
                          : puntaje >= 2.5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (puntaje / 4) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}