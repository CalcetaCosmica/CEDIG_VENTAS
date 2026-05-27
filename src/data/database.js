// src/data/database.js

const vendedoresIniciales = [
  {
    id: 1,
    nombre: "Carlos",
    seguros: 10,
    creditos: 42000,
    efi: 30000,
    tarjetas: 1,
  },

  {
    id: 2,
    nombre: "Ana",
    seguros: 14,
    creditos: 65000,
    efi: 52000,
    tarjetas: 2,
  },

  {
    id: 3,
    nombre: "Luis",
    seguros: 7,
    creditos: 30000,
    efi: 25000,
    tarjetas: 0,
  },
];

export const metas = {
  seguros: 12,
  creditos: 50000,
  efi: 50000,
  tarjetas: 1,
};

// OBTENER DATOS
export const obtenerVendedores = () => {
  const data =
    localStorage.getItem("vendedores");

  return data
    ? JSON.parse(data)
    : vendedoresIniciales;
};

// GUARDAR DATOS
export const guardarVendedores = (
  vendedores
) => {
  localStorage.setItem(
    "vendedores",
    JSON.stringify(vendedores)
  );
};

// AGREGAR
export const agregarVendedor = (
  nuevo
) => {
  const vendedores =
    obtenerVendedores();

  vendedores.push({
    id: Date.now(),
    ...nuevo,
  });

  guardarVendedores(vendedores);
};

// ELIMINAR
export const eliminarVendedor = (id) => {
  const vendedores =
    obtenerVendedores();

  const nuevos = vendedores.filter(
    (v) => v.id !== id
  );

  guardarVendedores(nuevos);
};

// ACTUALIZAR
export const actualizarVendedor = (
  id,
  datos
) => {
  const vendedores =
    obtenerVendedores();

  const actualizados =
    vendedores.map((v) =>
      v.id === id
        ? { ...v, ...datos }
        : v
    );

  guardarVendedores(actualizados);
};