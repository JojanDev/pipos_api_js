// Definición de los campos de la entidad Mascotas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "usuario_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK a usuarios
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // nombre de la mascota
  {
    name: "raza_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK a razas
  {
    name: "edad_semanas",
    required: false,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // edad en semanas
  { name: "sexo", required: true, minLength: 5, maxLength: 11, type: "string" }, // 'macho', 'hembra' o 'desconocido'
  {
    name: "estado_vital",
    required: false,
    minLength: 4,
    maxLength: 5,
    type: "string",
  }, // "true" o "false"
];
