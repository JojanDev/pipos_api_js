// Definición de los campos de la entidad Roles
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "nombre", required: true, minLength: 1, maxLength: 255, type: "string" } // NOT NULL
];
