export default function RankPage() {
  const vendedores = [
    {
      nombre: "Carlos",
      seguros: 10,
      creditos: 42000,
      efi: 30000,
      tarjetas: 1,
    },
    {
      nombre: "Ana",
      seguros: 14,
      creditos: 65000,
      efi: 52000,
      tarjetas: 2,
    },
    {
      nombre: "Luis",
      seguros: 7,
      creditos: 30000,
      efi: 25000,
      tarjetas: 0,
    },
  ];

  const metas = {
    seguros: 12,
    creditos: 50000,
    efi: 50000,
    tarjetas: 1,
  };

  const calcularPuntaje = (vendedor) => {
    const porcentajeSeguros = vendedor.seguros / metas.seguros;
    const porcentajeCreditos = vendedor.creditos / metas.creditos;
    const porcentajeEFI = vendedor.efi / metas.efi;
    const porcentajeTarjetas = vendedor.tarjetas / metas.tarjetas;

    return (
      porcentajeSeguros +
      porcentajeCreditos +
      porcentajeEFI +
      porcentajeTarjetas
    );
  };

  const ranking = [...vendedores].sort(
    (a, b) => calcularPuntaje(b) - calcularPuntaje(a)
  );

  const cumplioMeta = (valor, meta) => valor >= meta;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Ranking de Ventas
          </h1>
          <p className="text-center text-gray-500">
            Seguimiento diario de vendedores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500">
            <h2 className="font-bold text-lg">Meta Seguros</h2>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500">
            <h2 className="font-bold text-lg">Meta Créditos</h2>
            <p className="text-3xl font-bold text-green-600">50K</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-purple-500">
            <h2 className="font-bold text-lg">Meta EFI</h2>
            <p className="text-3xl font-bold text-purple-600">50K</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-orange-500">
            <h2 className="font-bold text-lg">Meta TDC</h2>
            <p className="text-3xl font-bold text-orange-600">1</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Vendedor</th>
                  <th className="p-4">Seguros</th>
                  <th className="p-4">Créditos</th>
                  <th className="p-4">EFI</th>
                  <th className="p-4">TDC</th>
                  <th className="p-4">Avance</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((vendedor, index) => {
                  const puntaje = calcularPuntaje(vendedor);

                  return (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gray-50 transition ${
                        index === 0
                          ? "bg-yellow-100"
                          : index === 1
                          ? "bg-gray-100"
                          : index === 2
                          ? "bg-orange-100"
                          : ""
                      }`}
                    >
                      <td className="p-4 font-bold text-xl">
                        {index + 1}
                      </td>

                      <td className="p-4 font-semibold">
                        {vendedor.nombre}
                      </td>

                      <td
                        className={`p-4 font-bold ${
                          cumplioMeta(vendedor.seguros, metas.seguros)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {vendedor.seguros}
                      </td>

                      <td
                        className={`p-4 font-bold ${
                          cumplioMeta(vendedor.creditos, metas.creditos)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        ${vendedor.creditos.toLocaleString()}
                      </td>

                      <td
                        className={`p-4 font-bold ${
                          cumplioMeta(vendedor.efi, metas.efi)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        ${vendedor.efi.toLocaleString()}
                      </td>

                      <td
                        className={`p-4 font-bold ${
                          cumplioMeta(vendedor.tarjetas, metas.tarjetas)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {vendedor.tarjetas}
                      </td>

                      <td className="p-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-4 rounded-full ${
                              puntaje >= 4
                                ? "bg-green-500"
                                : puntaje >= 2.5
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min((puntaje / 4) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Reglas del Ranking
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li>✅ Verde = Meta alcanzada</li>
            <li>🟡 Amarillo = Avance intermedio</li>
            <li>🔴 Rojo = Debajo de la meta</li>
            <li>
              📈 El ranking se calcula según el porcentaje de cumplimiento
              total.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
