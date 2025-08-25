import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarEspecie = validateFields(campos); // Para POST/PUT
export const validarEspecieParcial = validatePartialFields(campos); // Para PATCH
