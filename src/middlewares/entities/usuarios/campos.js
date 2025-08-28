// Definición de los campos de la entidad Permisos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // NOT NULL
];

export const camposLogin = [
  {
    name: "usuario",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "string",
  },
  {
    name: "contrasena",
    required: true,
    minLength: 8,
    maxLength: 30,
    type: "string",
  },
];
