// Definición de los campos de la entidad Permisos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "venta_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK ventas
  {
    name: "producto_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK productos
  {
    name: "precio",
    required: true,
    minLength: 1,
    maxLength: 20,
    type: "number",
  }, // DECIMAL
  {
    name: "valor_adicional",
    required: false,
    minLength: 1,
    maxLength: 20,
    type: "number",
  }, // DECIMAL DEFAULT 0
  {
    name: "cantidad",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // INT
  {
    name: "subtotal",
    required: true,
    minLength: 1,
    maxLength: 20,
    type: "number",
  }, // DECIMAL
];
