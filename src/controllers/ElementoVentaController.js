import { ResponseProvider } from "../providers/ResponseProvider.js";
import ElementoVentaService from "../services/ElementoVentaService.js";

class ElementoVentaController {
  // Obtener todos los tipos de documentos
  static getAllElementosVentas = async (req, res) => {
    try {
      const response = await ElementoVentaService.getAllElementosVentas();
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
  static getElementoVentaById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipo de documento por su ID
      const response = await ElementoVentaService.getElementoVentaById(id);
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
  static createElementoVenta = async (req, res) => {
    const elementoVenta = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ElementoVentaService.createElementoVenta(
        elementoVenta
      );
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
  static updateElementoVenta = async (req, res) => {
    const { id } = req.params;
    const elementoVenta = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await ElementoVentaService.updateElementoVenta(
        id,
        elementoVenta
      );
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
  static deleteElementoVenta = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el tipo de documento por su ID
      const response = await ElementoVentaService.deleteElementoVenta(id);
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

export default ElementoVentaController;
