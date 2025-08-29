import { campos } from "./campos.js";
import { validateFields } from "../../validators/validateFields.js";
import { validatePartialFields } from "../../validators/validatePartialFields.js";

export const validarServicioVenta = validateFields(campos); // Para POST/PUT
export const validarServicioVentaParcial = validatePartialFields(campos); // Para PATCH
