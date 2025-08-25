import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarInfoMedicamento = validateFields(campos); // Para POST/PUT
export const validarInfoMedicamentoParcial = validatePartialFields(campos); // Para PATCH
