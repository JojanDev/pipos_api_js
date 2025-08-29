import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarProductoVenta = validateFields(campos); // Para POST/PUT
export const validarProductoVentaParcial = validatePartialFields(campos); // Para PATCH
