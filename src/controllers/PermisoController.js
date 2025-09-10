import { ResponseProvider } from "../providers/ResponseProvider.js";
import PermisoService from "../services/PermisoService.js";

/**
 * Controlador para las rutas relacionadas con permisos.
 * Usa PermisoService para la lógica de negocio y ResponseProvider
 * para centralizar las respuestas HTTP.
 */
class PermisoController {
  /**
   * Obtiene todos los permisos.
   * Ruta: GET /permisos
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllPermisos = async (req, res) => {
    try {
      const response = await PermisoService.getAllPermisos();

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un permiso por su ID.
   * Ruta: GET /permisos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getPermisoById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await PermisoService.getPermisoById(id);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo permiso.
   * Ruta: POST /permisos
   *
   * @param {import('express').Request} req - req.body contiene los datos del permiso
   * @param {import('express').Response} res
   */
  static createPermiso = async (req, res) => {
    const permiso = req.body;

    try {
      const response = await PermisoService.createPermiso(permiso);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un permiso existente.
   * Ruta: PUT /permisos/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updatePermiso = async (req, res) => {
    const { id } = req.params;
    const permiso = req.body;

    try {
      const response = await PermisoService.updatePermiso(id, permiso);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un permiso.
   * Ruta: DELETE /permisos/:id
   *
   * Nota: el servicio puede devolver sólo mensaje/código, por eso aquí
   * devolvemos `null` como data cuando la eliminación es exitosa.
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deletePermiso = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await PermisoService.deletePermiso(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        null,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default PermisoController;
