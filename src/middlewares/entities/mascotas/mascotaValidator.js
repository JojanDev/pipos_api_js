import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarMascota = validateFields(campos); // Para POST/PUT
export const validarMascotaParcial = validatePartialFields(campos); // Para PATCH
