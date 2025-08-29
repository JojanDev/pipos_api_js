// Definición de los campos de la entidad Permisos_Roles
export const campos = [
  { name: "id", required: false, minLength: 1, maxLength: 11, type: "number" }, // AUTO_INCREMENT
  { name: "permiso_id", required: true, minLength: 1, maxLength: 11, type: "number" },
  { name: "rol_id", required: true, minLength: 1, maxLength: 11, type: "number" },
];
