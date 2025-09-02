// Definición de los campos de la entidad Ventas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "vendedor_id", required: false, minLength: 1, maxLength: 11, type: "number" }, // puede ser NULL
  { name: "comprador_id", required: false, minLength: 1, maxLength: 11, type: "number" }, // puede ser NULL
  { name: "fecha_creado", required: false, minLength: 10, maxLength: 19, type: "date" }, // TIMESTAMP → lo genera MySQL
  { name: "total", required: true, minLength: 1, maxLength: 20, type: "number" }, // DECIMAL obligatorio
  { name: "monto", required: true, minLength: 1, maxLength: 20, type: "number" }, // DECIMAL obligatorio
  { name: "estado", required: false, minLength: 4, maxLength: 10, type: "string" } // ENUM('completada','pendiente')
];
