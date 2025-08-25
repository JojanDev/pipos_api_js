import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarVenta = validateFields(campos); // Para POST/PUT
export const validarVentaParcial = validatePartialFields(campos); // Para PATCH
