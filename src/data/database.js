// src/data/database.js

const STORAGE_KEY = "vendedores";

// DATOS INICIALES
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

// METAS
export const metas = {
  seguros: 12,
  creditos: 50000,
  efi: 50000,
  tarjetas: 1,
};

// INICIALIZAR STORAGE
const inicializarStorage = () => {
  const data =
    localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(vendedoresIniciales)
    );
  }
};

// OBTENER VENDEDORES
export const obtenerVendedores = () => {
  inicializarStorage();

  try {
    const data =
      localStorage.getItem(STORAGE_KEY);

    return JSON.parse(data) || [];
  } catch (error) {
    console.error(
      "Error leyendo vendedores:",
      error
    );

    return [];
  }
};

// GUARDAR VENDEDORES
export const guardarVendedores = (
  vendedores
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(vendedores)
  );
};

// AGREGAR VENDEDOR
export const agregarVendedor = (
  nuevo
) => {
  const vendedores =
    obtenerVendedores();

  const nuevoVendedor = {
    id: Date.now(),
    nombre: nuevo.nombre || "Sin nombre",
    seguros: Number(nuevo.seguros) || 0,
    creditos:
      Number(nuevo.creditos) || 0,
    efi: Number(nuevo.efi) || 0,
    tarjetas:
      Number(nuevo.tarjetas) || 0,
  };

  vendedores.push(nuevoVendedor);

  guardarVendedores(vendedores);
};

// ELIMINAR VENDEDOR
export const eliminarVendedor = (id) => {
  const vendedores =
    obtenerVendedores();

  const nuevos = vendedores.filter(
    (v) => v.id !== id
  );

  guardarVendedores(nuevos);
};

// ACTUALIZAR VENDEDOR
export const actualizarVendedor = (
  id,
  datos
) => {
  const vendedores =
    obtenerVendedores();

  const actualizados =
    vendedores.map((v) =>
      v.id === id
        ? {
            ...v,
            ...datos,
          }
        : v
    );

  guardarVendedores(actualizados);
};

// RESETEAR BASE
export const resetearDatabase = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(vendedoresIniciales)
  );
};