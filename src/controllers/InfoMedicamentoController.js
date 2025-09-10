import { ResponseProvider } from "../providers/ResponseProvider.js";
import InfoMedicamentoService from "../services/InfoMedicamentoService.js";

/**
 * Controlador para manejar las rutas relacionadas con la información de medicamentos.
 * Centraliza la comunicación entre la capa de rutas (Express) y el servicio InfoMedicamento.
 *
 * Cada método recibe los objetos estándar de Express: (req, res).
 * Las respuestas se devuelven usando ResponseProvider para mantener formato uniforme.
 */
class InfoMedicamentoController {
  /**
   * Obtiene toda la información de medicamentos registrada.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllInfosMedicamentos = async (req, res) => {
    try {
      const response = await InfoMedicamentoService.getAllInfosMedicamentos();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllInfosMedicamentos error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene una información de medicamento por su ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getInfoMedicamentoById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await InfoMedicamentoService.getInfoMedicamentoById(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`getInfoMedicamentoById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea una nueva información de medicamento.
   *
   * @param {import('express').Request} req - body: infoMedicamento
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createInfoMedicamento = async (req, res) => {
    const infoMedicamento = req.body;
    try {
      const response = await InfoMedicamentoService.createInfoMedicamento(
        infoMedicamento
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Creación exitosa -> 201
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      console.error("createInfoMedicamento error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza una información de medicamento existente.
   *
   * @param {import('express').Request} req - params: { id }, body: infoMedicamento
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateInfoMedicamento = async (req, res) => {
    const { id } = req.params;
    const infoMedicamento = req.body;
    try {
      const response = await InfoMedicamentoService.updateInfoMedicamento(
        id,
        infoMedicamento
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Actualización exitosa -> 200
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      console.error(`updateInfoMedicamento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina una información de medicamento por su ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteInfoMedicamento = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await InfoMedicamentoService.deleteInfoMedicamento(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`deleteInfoMedicamento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default InfoMedicamentoController;
