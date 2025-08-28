// Definición de los campos de la entidad Usuarios
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "tipo_documento_id", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "numero_documento", required: true, minLength: 1, maxLength: 50, type: "string" }, // NOT NULL
  { name: "nombre", required: true, minLength: 1, maxLength: 255, type: "string" }, // NOT NULL
  { name: "telefono", required: true, minLength: 1, maxLength: 20, type: "string" }, // NOT NULL
  { name: "correo", required: false, minLength: 5, maxLength: 255, type: "string" }, // opcional, se puede agregar validación de email
  { name: "direccion", required: true, minLength: 1, maxLength: 255, type: "string" } // NOT NULL
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
