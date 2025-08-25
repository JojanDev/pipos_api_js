// Definición de los campos de la entidad Medicamentos_Tratamiento
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "id_tratamiento", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "id_medicamento_info", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "dosis", required: false, minLength: 1, maxLength: 100, type: "string" }, // tiene DEFAULT 'No aplica'
  { name: "frecuencia_aplicacion", required: false, minLength: 1, maxLength: 100, type: "string" }, // opcional
  { name: "duracion", required: false, minLength: 1, maxLength: 11, type: "number" }, // duración en días (opcional)
  { name: "activo", required: false, minLength: 1, maxLength: 1, type: "number" } // BOOLEAN → 0 o 1
];

