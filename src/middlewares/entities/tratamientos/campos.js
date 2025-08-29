// Definición de los campos de la entidad Antecedentes_Tratamientos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "antecedente_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "usuario_id",
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
    name: "descripcion",
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
  }, // TIMESTAMP, por defecto lo crea MySQL
  {
    name: "activo",
    required: false,
    minLength: 1,
    maxLength: 1,
    type: "number",
  }, // BOOLEAN → 0 o 1
];
