import { ResponseProvider } from "../providers/ResponseProvider.js";
import EspecieService from "../services/EspecieService.js";

class EspecieController {
  // Obtener todos los tipos de documentos
  static getAllEspecies = async (req, res) => {
    try {
      const response = await EspecieService.getAllEspecies();
      // Validamos si no hay tipos de documentos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de documento por su ID
  static getEspecieById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipo de documento por su ID
      const response = await EspecieService.getEspecieById(id);
      // Validamos si no hay tipo de documento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo tipo de documento
  static createEspecie = async (req, res) => {
    const especie = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await EspecieService.createEspecie(especie);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de documento creado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un tipo de documento
  static updateEspecie = async (req, res) => {
    const { id } = req.params;
    const especie = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await EspecieService.updateEspecie(id, especie);
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos el tipo de documento actualizado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un tipo de documento
  static deleteEspecie = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el tipo de documento por su ID
      const response = await EspecieService.deleteEspecie(id);
      // Validamos si no se pudo eliminar el tipo de documento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de documento eliminado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default EspecieController;
