import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarAntecedente = validateFields(campos); // Para POST/PUT
export const validarAntecedenteParcial = validatePartialFields(campos); // Para PATCH
