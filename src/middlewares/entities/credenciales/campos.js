// Definición de los campos de la entidad Mascotas
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "id_cliente", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "nombre", required: true, minLength: 1, maxLength: 255, type: "string" }, // NOT NULL
  { name: "id_raza", required: true, minLength: 1, maxLength: 11, type: "number" }, // FK obligatorio
  { name: "edad_semanas", required: false, minLength: 1, maxLength: 11, type: "number" }, // opcional
  { name: "sexo", required: true, minLength: 4, maxLength: 10, type: "string" }, // ENUM → restringido a macho, hembra, desconocido
  { name: "estado_vital", required: false, minLength: 1, maxLength: 1, type: "number" } // BOOLEAN → lo tratamos como 0 o 1
];
