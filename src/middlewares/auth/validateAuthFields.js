import { campos } from "../entities/usuarios/campos.js";
import { campos as camposLogin } from "../entities/credenciales/campos.js";
import { validateFields } from "../validators/validateFields.js";

export const validarRegistro = validateFields(campos);
export const validarLogin = validateFields(camposLogin);
