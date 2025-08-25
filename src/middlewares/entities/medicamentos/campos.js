// Definición de los campos de la entidad Medicamentos
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "id_medicamento_info", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "precio", required: true, minLength: 1, maxLength: 20, type: "number" }, // DECIMAL NOT NULL
  { name: "fecha_caducidad", required: false, minLength: 10, maxLength: 10, type: "date" }, // DATE (yyyy-MM-dd)
  { name: "cantidad", required: true, minLength: 1, maxLength: 11, type: "number" }, // NOT NULL
  { name: "numero_lote", required: false, minLength: 1, maxLength: 100, type: "string" } // opcional
];
