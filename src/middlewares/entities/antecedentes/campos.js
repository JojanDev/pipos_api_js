// Definición de los campos de la entidad Antecedentes
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "mascota_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "titulo",
    required: true,
    minLength: 1,
    maxLength: 100,
    type: "string",
  }, // NOT NULL
  {
    name: "diagnostico",
    required: true,
    minLength: 1,
    maxLength: 65535,
    type: "string",
  }, // TEXT NOT NULL
  {
    name: "fecha_creado",
    required: false,
    minLength: 10,
    maxLength: 19,
    type: "date",
  }, // TIMESTAMP → yyyy-MM-dd HH:mm:ss (si quieres solo fecha, lo dejamos yyyy-MM-dd)
  {
    name: "activo",
    required: false,
    minLength: 1,
    maxLength: 1,
    type: "number",
  }, // BOOLEAN → 0 o 1
];
