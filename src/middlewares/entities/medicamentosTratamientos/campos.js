// Definición de los campos de la entidad Medicamentos_Tratamientos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "tratamiento_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "info_medicamento_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "dosis",
    required: false,
    minLength: 1,
    maxLength: 100,
    type: "string",
    default: "No aplica",
  }, // VARCHAR(100), default
  {
    name: "frecuencia_aplicacion",
    required: true,
    minLength: 1,
    maxLength: 100,
    type: "string",
  }, // VARCHAR(100) NOT NULL
  {
    name: "duracion",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // INT NOT NULL
  { name: "activo", required: false, type: "boolean", default: true }, // boolean con default
];
