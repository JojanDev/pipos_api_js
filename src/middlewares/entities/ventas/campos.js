// Definición de los campos de la entidad Ventas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "vendedor_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK usuarios(id)
  {
    name: "comprador_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK usuarios(id)
  {
    name: "fecha_creado",
    required: false,
    minLength: 19,
    maxLength: 19,
    type: "date",
  }, // TIMESTAMP (YYYY-MM-DD HH:MM:SS)
  {
    name: "total",
    required: true,
    minLength: 1,
    maxLength: 13,
    type: "number",
  }, // DECIMAL(10,2) obligatorio
  {
    name: "monto",
    required: true,
    minLength: 1,
    maxLength: 13,
    type: "number",
  }, // DECIMAL(10,2) obligatorio
  // {
  //   name: "completada",
  //   required: false,
  //   minLength: 8,
  //   maxLength: 10,
  //   type: "string",
  // }, // ENUM('completada','pendiente')
];
