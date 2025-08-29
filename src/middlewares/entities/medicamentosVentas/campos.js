// Definición de los campos de la entidad Detalles_Ventas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "id_venta", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "id_producto", required: false, minLength: 1, maxLength: 11, type: "number" }, // opcional
  { name: "id_servicio", required: false, minLength: 1, maxLength: 11, type: "number" }, // opcional
  { name: "id_medicamento", required: false, minLength: 1, maxLength: 11, type: "number" }, // opcional
  { name: "precio", required: true, minLength: 1, maxLength: 20, type: "number" }, // DECIMAL NOT NULL
  { name: "valor_adicional", required: false, minLength: 1, maxLength: 20, type: "number" }, // DEFAULT 0
  { name: "cantidad", required: true, minLength: 1, maxLength: 11, type: "number" }, // NOT NULL
  { name: "subtotal", required: true, minLength: 1, maxLength: 20, type: "number" } // NOT NULL
];
