import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarRaza = validateFields(campos); // Para POST/PUT
export const validarRazaParcial = validatePartialFields(campos); // Para PATCH
