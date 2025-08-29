// Definición de los campos de la entidad Info_Medicamentos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // NOT NULL
  {
    name: "uso_general",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // NOT NULL
  {
    name: "via_administracion",
    required: true,
    minLength: 1,
    maxLength: 100,
    type: "string",
  }, // NOT NULL
  {
    name: "presentacion",
    required: true,
    minLength: 1,
    maxLength: 100,
    type: "string",
  }, // NOT NULL
  {
    name: "informacion_adicional",
    required: false,
    minLength: 0,
    maxLength: 65535,
    type: "string",
  }, // TEXT, opcional
];
