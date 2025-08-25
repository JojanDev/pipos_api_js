import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarTipoProducto = validateFields(campos); // Para POST/PUT
export const validarTipoProductoParcial = validatePartialFields(campos); // Para PATCH
