import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarTratamiento = validateFields(campos); // Para POST/PUT
export const validarTratamientoParcial = validatePartialFields(campos); // Para PATCH
