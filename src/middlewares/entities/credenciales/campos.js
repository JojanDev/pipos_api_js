// Definición de los campos de la entidad Mascotas
export const campos = [
  { name: "usuario", required: true, minLength: 1, maxLength: 100, type: "string" }, // NOT NULL
  { name: "contrasena", required: true, minLength: 8, maxLength: 255, type: "string" }, // ENUM → restringido a macho, hembra, desconocido
];