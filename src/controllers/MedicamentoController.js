import { ResponseProvider } from "../providers/ResponseProvider.js";
import MedicamentoService from "../services/MedicamentoService.js";

class MedicamentoController {
  // Obtener todos los tipos de documentos
  static getAllMedicamentos = async (req, res) => {
    try {
      const response = await MedicamentoService.getAllMedicamentos();
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
  static getMedicamentoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el tipo de documento por su ID
      const response = await MedicamentoService.getMedicamentoById(id);
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
  static createMedicamento = async (req, res) => {
    const medicamento = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await MedicamentoService.createMedicamento(
        medicamento
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
  static updateMedicamento = async (req, res) => {
    const { id } = req.params;
    const medicamento = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await MedicamentoService.updateMedicamento(
        id,
        medicamento
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
  static deleteMedicamento = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el tipo de documento por su ID
      const response = await MedicamentoService.deleteMedicamento(id);
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

export default MedicamentoController;
