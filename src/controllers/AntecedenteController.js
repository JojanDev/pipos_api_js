import { ResponseProvider } from "../providers/ResponseProvider.js";
import AntecedenteService from "../services/AntecedenteService.js";

/**
 * Controlador para manejar las rutas relacionadas con antecedentes.
 * Centraliza la comunicación entre la capa de ruta (Express) y el servicio de antecedentes.
 *
 * Cada método espera los objetos estándar de Express: (req, res).
 * Las respuestas se devuelven usando ResponseProvider para mantener formato uniforme.
 */
class AntecedenteController {
  /**
   * Obtiene todos los antecedentes registrados.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllAntecedentes = async (req, res) => {
    try {
      // Llamada al servicio
      const response = await AntecedenteService.getAllAntecedentes();

      // Si el servicio indica error, delegar al ResponseProvider
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa con datos
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error inesperado: log para debugging y respuesta genérica
      console.error("getAllAntecedentes error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un antecedente por su ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAntecedenteById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamada al servicio por ID
      const response = await AntecedenteService.getAntecedenteById(id);

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
      console.error(`getAntecedenteById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo antecedente.
   *
   * @param {import('express').Request} req - body: antecedente
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createAntecedente = async (req, res) => {
    const antecedente = req.body;
    try {
      // Llamada al servicio para crear
      const response = await AntecedenteService.createAntecedente(antecedente);

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
      console.error("createAntecedente error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un antecedente existente.
   *
   * @param {import('express').Request} req - params: { id }, body: antecedente
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateAntecedente = async (req, res) => {
    const { id } = req.params;
    const antecedente = req.body;
    try {
      // Llamada al servicio para actualizar
      const response = await AntecedenteService.updateAntecedente(
        id,
        antecedente
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
      console.error(`updateAntecedente error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un antecedente por ID.
   *
   * @param {import('express').Request} req - params: { id }
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteAntecedente = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamada al servicio para eliminar
      const response = await AntecedenteService.deleteAntecedente(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Eliminación exitosa
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`deleteAntecedente error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los antecedentes asociados a una mascota por su ID.
   *
   * @param {import('express').Request} req - params: { id } (id de mascota)
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllAntecedentesByMascotaId = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamada al servicio que obtiene antecedentes por mascota
      const response = await AntecedenteService.getAntecedentesByMascotaId(id);

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
        `getAllAntecedentesByMascotaId error (mascotaId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default AntecedenteController;
