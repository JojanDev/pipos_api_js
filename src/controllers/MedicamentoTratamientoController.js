import { ResponseProvider } from "../providers/ResponseProvider.js";
import MedicamentoTratamientoService from "../services/MedicamentoTratamientoService.js";

/**
 * Controlador para manejar las rutas relacionadas con la entidad
 * "medicamentos en tratamientos".
 * Centraliza la comunicación entre las rutas (Express) y el service correspondiente.
 */
class MedicamentoTratamientoController {
  /**
   * Obtiene todos los medicamentos asociados a tratamientos.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllMedicamentosTratamientos = async (req, res) => {
    try {
      const response =
        await MedicamentoTratamientoService.getAllMedicamentosTratamientos();

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
      console.error("getAllMedicamentosTratamientos error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un medicamento-tratamiento por su ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getMedicamentoTratamientoById = async (req, res) => {
    const { id } = req.params;
    try {
      const response =
        await MedicamentoTratamientoService.getMedicamentoTratamientoById(id);

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
      console.error(`getMedicamentoTratamientoById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo medicamento para un tratamiento.
   *
   * @param {import('express').Request} req - body: medicamentoTratamiento
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createMedicamentoTratamiento = async (req, res) => {
    const medicamentoTratamiento = req.body;
    try {
      const response =
        await MedicamentoTratamientoService.createMedicamentoTratamiento(
          medicamentoTratamiento
        );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      console.error("createMedicamentoTratamiento error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un medicamento asociado a tratamiento por su ID.
   *
   * @param {import('express').Request} req - params: { id }, body: medicamentoTratamiento
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateMedicamentoTratamiento = async (req, res) => {
    const { id } = req.params;
    const medicamentoTratamiento = req.body;
    try {
      const response =
        await MedicamentoTratamientoService.updateMedicamentoTratamiento(
          id,
          medicamentoTratamiento
        );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      console.error(`updateMedicamentoTratamiento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un medicamento asociado a tratamiento por su ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteMedicamentoTratamiento = async (req, res) => {
    const { id } = req.params;
    try {
      const response =
        await MedicamentoTratamientoService.deleteMedicamentoTratamiento(id);

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
      console.error(`deleteMedicamentoTratamiento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los medicamentos asociados a un tratamiento (por treatment id).
   *
   * @param {import('express').Request} req - params: { id } (id del tratamiento)
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllMedicamentosTratamientosByTratamientoId = async (req, res) => {
    const { id } = req.params;
    try {
      const response =
        await MedicamentoTratamientoService.getAllMedicamentosTratamientosByTratamientoId(
          id
        );

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
      console.error(
        `getAllMedicamentosTratamientosByTratamientoId error (tratamientoId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los medicamentos en tratamientos filtrados por info_medicamento_id.
   *
   * @param {import('express').Request} req - params: { id } (id de info_medicamento)
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllMedicamentosTratamientosByInfoMedicamentoId = async (
    req,
    res
  ) => {
    const { id } = req.params;
    try {
      const response =
        await MedicamentoTratamientoService.getAllMedicamentosTratamientosByInfoMedicamentoId(
          id
        );

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
      console.error(
        `getAllMedicamentosTratamientosByInfoMedicamentoId error (infoMedicamentoId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default MedicamentoTratamientoController;
