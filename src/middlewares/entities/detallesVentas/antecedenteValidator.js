import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarDetalleVenta = validateFields(campos); // Para POST/PUT
export const validarDetalleVentaParcial = validatePartialFields(campos); // Para PATCH
