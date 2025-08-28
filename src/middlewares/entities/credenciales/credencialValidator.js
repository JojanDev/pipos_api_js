import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarCredencial = validateFields(campos); // Para POST/PUT
export const validarCredencialParcial = validatePartialFields(campos); // Para PATCH
