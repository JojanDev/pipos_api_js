import { ResponseProvider } from "../providers/ResponseProvider.js";
import PermisoRolService from "../services/PermisoRolService.js";

/**
 * Controlador para las rutas de "permisos por rol".
 * Maneja la comunicación entre Express y PermisoRolService,
 * y unifica las respuestas HTTP mediante ResponseProvider.
 */
class PermisoRolController {
  /**
   * Obtiene todos los permisos asociados a roles.
   * Ruta: GET /permisos-roles
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllPermisosRoles = async (req, res) => {
    try {
      const response = await PermisoRolService.getAllPermisosRoles();

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
      console.error("getAllPermisosRoles error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un permiso-rol por su ID.
   * Ruta: GET /permisos-roles/:id
   *
   * @param {import('express').Request}  req  - req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getPermisoRolById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PermisoRolService.getPermisoRolById(id);

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
      console.error(`getPermisoRolById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo permiso para un rol.
   * Ruta: POST /permisos-roles
   *
   * @param {import('express').Request}  req  - req.body contiene datos de permiso-rol
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createPermisoRol = async (req, res) => {
    const permisoRol = req.body;
    try {
      const response = await PermisoRolService.createPermisoRol(permisoRol);

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
      console.error("createPermisoRol error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un permiso-rol existente por su ID.
   * Ruta: PUT /permisos-roles/:id
   *
   * @param {import('express').Request}  req  - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updatePermisoRol = async (req, res) => {
    const { id } = req.params;
    const permisoRol = req.body;
    try {
      const response = await PermisoRolService.updatePermisoRol(id, permisoRol);

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
      console.error(`updatePermisoRol error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un permiso-rol por su ID.
   * Ruta: DELETE /permisos-roles/:id
   *
   * @param {import('express').Request}  req  - req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deletePermisoRol = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PermisoRolService.deletePermisoRol(id);

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
      console.error(`deletePermisoRol error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default PermisoRolController;
