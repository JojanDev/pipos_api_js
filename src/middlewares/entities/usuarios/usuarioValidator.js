import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarUsuario = validateFields(campos); // Para POST/PUT
export const validarUsuarioParcial = validatePartialFields(campos); // Para PATCH
