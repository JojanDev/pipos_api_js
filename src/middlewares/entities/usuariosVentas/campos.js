// Definición de los campos de la entidad Usuarios_Ventas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  {
    name: "venta_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio a ventas
  {
    name: "usuario_id",
    required: true,
    minLength: 1,
    maxLength: 11,
    type: "number",
  }, // FK obligatorio a usuarios
];
