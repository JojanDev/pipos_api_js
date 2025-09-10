import PermisoRol from "../models/PermisoRol.js";
import PermisoService from "./PermisoService.js";
import RolService from "./RolService.js";

class PermisoRolService {
  static objPermisoRol = new PermisoRol();

  /**
   * Obtiene todos los permisos de roles registrados
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de permisos por rol
   */
  static async getAllPermisosRoles() {
    try {
      // Obtenemos todos los permisos por rol
      const permisosRoles = await this.objPermisoRol.getAll();

      if (!permisosRoles || permisosRoles.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay permisos de roles registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Permisos de roles obtenidos correctamente",
        data: permisosRoles,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un permiso de rol por su ID
   * @param {number} id - ID del permiso por rol
   * @returns {Promise<Object>} Respuesta con éxito o error y el permiso por rol
   */
  static async getPermisoRolById(id) {
    try {
      const permisoRol = await this.objPermisoRol.getById(id);

      if (!permisoRol)
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso de rol obtenido correctamente",
        data: permisoRol,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo permiso por rol
   * @param {Object} permisoRol - Datos del permiso por rol a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y el permiso por rol creado
   */
  static async createPermisoRol(permisoRol) {
    try {
      // Validamos que el permiso exista
      const permisoExistente = await PermisoService.getPermisoById(
        permisoRol.permiso_id
      );
      if (permisoExistente.error) return permisoExistente;

      // Validamos que el rol exista
      const rolExistente = await RolService.getRolById(permisoRol.rol_id);
      if (rolExistente.error) return rolExistente;

      // Validamos que el permiso no haya sido asignado previamente al rol
      const permisoRolExistente =
        await this.objPermisoRol.getByPermisoRolExists(
          permisoRol.rol_id,
          permisoRol.permiso_id
        );
      if (permisoRolExistente && permisoRolExistente.length !== 0)
        return {
          error: true,
          code: 400,
          message: "Este permiso ya ha sido asignado al rol",
        };

      // Creamos el permiso por rol
      const permisoRolCreado = await this.objPermisoRol.create(permisoRol);
      if (!permisoRolCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Permiso de rol",
        };

      return {
        error: false,
        code: 201,
        message: "Permiso de rol creado correctamente",
        data: permisoRolCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un permiso por rol existente
   * @param {number} id - ID del permiso por rol a actualizar
   * @param {Object} permisoRol - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y el permiso por rol actualizado
   */
  static async updatePermisoRol(id, permisoRol) {
    try {
      // Validamos que el permiso por rol exista
      const existente = await this.objPermisoRol.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };

      // Actualizamos el permiso por rol
      const permisoRolActualizado = await this.objPermisoRol.update(
        id,
        permisoRol
      );
      if (!permisoRolActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Permiso de rol",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso de rol actualizado correctamente",
        data: permisoRolActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un permiso por rol por su ID
   * @param {number} id - ID del permiso por rol a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deletePermisoRol(id) {
    try {
      // Validamos que el permiso por rol exista
      const permisoRol = await this.objPermisoRol.getById(id);
      if (!permisoRol)
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };

      // Eliminamos el permiso por rol
      const permisoRolEliminado = await this.objPermisoRol.delete(id);
      if (!permisoRolEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Permiso de rol",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso de rol eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default PermisoRolService;
