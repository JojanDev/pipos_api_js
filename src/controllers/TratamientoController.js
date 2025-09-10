import { ResponseProvider } from "../providers/ResponseProvider.js";
import TratamientoService from "../services/TratamientoService.js";

/**
 * Controlador para las rutas relacionadas con tratamientos médicos.
 * Centraliza la lógica HTTP y delega operaciones al TratamientoService.
 */
class TratamientoController {
  /**
   * Obtiene todos los tratamientos registrados.
   * Ruta: GET /tratamientos
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllTratamientos = async (req, res) => {
    try {
      const response = await TratamientoService.getAllTratamientos();

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
      console.error("getAllTratamientos error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un tratamiento por su ID.
   * Ruta: GET /tratamientos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getTratamientoById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await TratamientoService.getTratamientoById(id);

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
      console.error(`getTratamientoById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo tratamiento.
   * Ruta: POST /tratamientos
   *
   * @param {import('express').Request} req - req.body contiene los datos del tratamiento
   * @param {import('express').Response} res
   */
  static createTratamiento = async (req, res) => {
    const tratamiento = req.body;

    try {
      const response = await TratamientoService.createTratamiento(tratamiento);

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
      console.error("createTratamiento error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un tratamiento existente por su ID.
   * Ruta: PUT /tratamientos/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateTratamiento = async (req, res) => {
    const { id } = req.params;
    const tratamiento = req.body;

    try {
      const response = await TratamientoService.updateTratamiento(
        id,
        tratamiento
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
      console.error(`updateTratamiento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un tratamiento por su ID.
   * Ruta: DELETE /tratamientos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteTratamiento = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await TratamientoService.deleteTratamiento(id);

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
      console.error(`deleteTratamiento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los tratamientos asociados a un antecedente específico.
   * Ruta: GET /antecedentes/:id/tratamientos
   *
   * @param {import('express').Request} req - req.params.id (ID del antecedente)
   * @param {import('express').Response} res
   */
  static getAllTratamientosByAntecedenteId = async (req, res) => {
    const { id } = req.params;

    try {
      const response =
        await TratamientoService.getAllTratamientosByAntecedenteId(id);

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
        `getAllTratamientosByAntecedenteId error (antecedenteId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default TratamientoController;
