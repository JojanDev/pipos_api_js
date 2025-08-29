import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarUsuarioVenta = validateFields(campos); // Para POST/PUT
export const validarUsuarioVentaParcial = validatePartialFields(campos); // Para PATCH
