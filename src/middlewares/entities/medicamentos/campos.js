// Definición de los campos de la entidad Medicamentos (inventario)
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "info_medicamento_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "precio",
    required: true,
    minLength: 1,
    maxLength: 10,
    type: "number",
  }, // DECIMAL(10,2), obligatorio
  { name: "fecha_caducidad", required: false, type: "date" }, // Puede ser NULL
  {
    name: "cantidad",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // Obligatorio
  {
    name: "numero_lote",
    required: false,
    minLength: 0,
    maxLength: 100,
    type: "string",
  }, // Opcional
];
