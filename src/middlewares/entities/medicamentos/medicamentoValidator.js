import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarMedicamento = validateFields(campos); // Para POST/PUT
export const validarMedicamentoParcial = validatePartialFields(campos); // Para PATCH
