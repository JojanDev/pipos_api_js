import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarMedicamentoTratamiento = validateFields(campos); // Para POST/PUT
export const validarMedicamentoTratamientoParcial = validatePartialFields(campos); // Para PATCH
