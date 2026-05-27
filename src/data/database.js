// src/data/database.js

export let vendedores = [
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

export const agregarVendedor = (nuevo) => {
  vendedores.push({
    id: Date.now(),
    ...nuevo,
  });
};

export const eliminarVendedor = (id) => {
  vendedores = vendedores.filter(
    (v) => v.id !== id
  );
};

export const actualizarVendedor = (
  id,
  datos
) => {
  vendedores = vendedores.map((v) =>
    v.id === id
      ? { ...v, ...datos }
      : v
  );
};