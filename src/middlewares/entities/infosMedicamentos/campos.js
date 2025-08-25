// Definición de los campos de la entidad InfosMedicamentos
export const campos = [
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // NOT NULL
  {
    name: "uso_general",
    required: false,
    minLength: 0,
    maxLength: 255,
    type: "string",
  },
  {
    name: "via_administracion",
    required: false,
    minLength: 0,
    maxLength: 100,
    type: "string",
  },
  {
    name: "presentacion",
    required: false,
    minLength: 0,
    maxLength: 100,
    type: "string",
  },
  {
    name: "informacion_adicional",
    required: false,
    minLength: 0,
    maxLength: 65535,
    type: "string",
  }, // TEXT en MySQL soporta hasta 65,535 chars
];
