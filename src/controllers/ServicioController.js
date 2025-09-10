import { ResponseProvider } from "../providers/ResponseProvider.js";
import ServicioService from "../services/ServicioService.js";

/**
 * Controlador para las rutas relacionadas con servicios veterinarios.
 * Centraliza la lógica HTTP y delega la operación al ServicioService.
 */
class ServicioController {
  /**
   * Obtiene todos los servicios registrados.
   * Ruta: GET /servicios
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllServicios = async (req, res) => {
    try {
      const response = await ServicioService.getAllServicios();

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
      console.error("getAllServicios error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un servicio por su ID.
   * Ruta: GET /servicios/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getServicioById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServicioService.getServicioById(id);

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
      console.error(`getServicioById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo servicio.
   * Ruta: POST /servicios
   *
   * @param {import('express').Request} req - req.body contiene los datos del servicio
   * @param {import('express').Response} res
   */
  static createServicio = async (req, res) => {
    const servicio = req.body;

    try {
      const response = await ServicioService.createServicio(servicio);

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
      console.error("createServicio error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un servicio existente por su ID.
   * Ruta: PUT /servicios/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateServicio = async (req, res) => {
    const { id } = req.params;
    const servicio = req.body;

    try {
      const response = await ServicioService.updateServicio(id, servicio);

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
      console.error(`updateServicio error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un servicio por su ID.
   * Ruta: DELETE /servicios/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteServicio = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServicioService.deleteServicio(id);

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
      console.error(`deleteServicio error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default ServicioController;
