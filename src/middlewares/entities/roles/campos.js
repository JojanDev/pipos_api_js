// Definición de los campos de la entidad Permisos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // VARCHAR(255) NOT NULL
  {
    name: "descripcion",
    required: true,
    minLength: 1,
    maxLength: 100,
    type: "string",
  }, // VARCHAR(100) NOT NULL
];
