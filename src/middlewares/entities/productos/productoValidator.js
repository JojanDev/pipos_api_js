import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarProducto = validateFields(campos); // Para POST/PUT
export const validarProductoParcial = validatePartialFields(campos); // Para PATCH
