import { ResponseProvider } from "../providers/ResponseProvider.js";
import ElementoService from "../services/ElementoService.js";

class ElementoController {
  // Obtener todos los tipos de documentos
  static getAllElementos = async (req, res) => {
    try {
      const response = await ElementoService.getAllElementos();
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
  static getElementoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al elemento para obtener el tipo de documento por su ID
      const response = await ElementoService.getElementoById(id);
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
  static createElemento = async (req, res) => {
    const elemento = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ElementoService.createElemento(elemento);
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
  static updateElemento = async (req, res) => {
    const { id } = req.params;
    const elemento = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await ElementoService.updateElemento(id, elemento);
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
  static deleteElemento = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al elemento para eliminar el tipo de documento por su ID
      const response = await ElementoService.deleteElemento(id);
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

export default ElementoController;
