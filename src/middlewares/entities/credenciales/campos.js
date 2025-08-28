// Definición de los campos de la entidad Mascotas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "usuario_id", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "usuario", required: true, minLength: 1, maxLength: 100, type: "string" }, // NOT NULL
  { name: "contrasena", required: true, minLength: 8, maxLength: 255, type: "string" }, // ENUM → restringido a macho, hembra, desconocido
];