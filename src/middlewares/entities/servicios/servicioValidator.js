import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarServicio = validateFields(campos); // Para POST/PUT
export const validarServicioParcial = validatePartialFields(campos); // Para PATCH
