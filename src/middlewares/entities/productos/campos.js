// Definición de los campos de la entidad Productos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "nombre",
    required: true,
    minLength: 1,
    maxLength: 255,
    type: "string",
  }, // NOT NULL
  {
    name: "precio",
    required: true,
    minLength: 1,
    maxLength: 20,
    type: "number",
  }, // DECIMAL(10,2) NOT NULL
  {
    name: "descripcion",
    required: false,
    minLength: 0,
    maxLength: 65535,
    type: "string",
  }, // TEXT opcional
  {
    name: "fecha_caducidad",
    required: false,
    minLength: 10,
    maxLength: 10,
    type: "date",
  }, // DATE (yyyy-MM-dd)
  {
    name: "tipo_producto_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio
  {
    name: "stock",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // NOT NULL
];
