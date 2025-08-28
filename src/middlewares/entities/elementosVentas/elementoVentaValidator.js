import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarElementoVenta = validateFields(campos); // Para POST/PUT
export const validarElementoVentaParcial = validatePartialFields(campos); // Para PATCH
