// Definición de los campos de la entidad Razas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "nombre", required: true, minLength: 1, maxLength: 255, type: "string" }, // NOT NULL
  { name: "especie_id", required: true, minLength: 1, maxLength: 11, type: "number" } // FK obligatorio
];
