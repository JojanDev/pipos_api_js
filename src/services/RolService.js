import Rol from "../models/Rol.js";

/**
 * Servicio para gestionar roles.
 * Incluye métodos CRUD y consultas específicas para roles de empleados.
 */
class RolService {
  static objRol = new Rol();

  /**
   * Obtiene todos los roles registrados, excluyendo el rol con id 1 (superadministrador).
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllRoles() {
    try {
      const roles = await this.objRol.getAll();

      if (!roles || roles.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles registrados",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Roles obtenidos correctamente",
        data: roles.filter((rol) => rol.id !== 1),
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene un rol por su ID.
   * @param {number} id - ID del rol.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getRolById(id) {
    try {
      const rol = await this.objRol.getById(id);

      if (!rol)
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Rol obtenido correctamente",
        data: rol,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo rol.
   * @param {Object} rol - Datos del rol a crear.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createRol(rol) {
    try {
      const rolCreado = await this.objRol.create(rol);

      if (!rolCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Rol",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Rol creado correctamente",
        data: rolCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un rol existente por su ID.
   * @param {number} id - ID del rol a actualizar.
   * @param {Object} rol - Nuevos datos del rol.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateRol(id, rol) {
    try {
      const existente = await this.objRol.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
          data: null,
        };

      const rolActualizado = await this.objRol.update(id, rol);
      if (!rolActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Rol",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Rol actualizado correctamente",
        data: rolActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un rol por su ID.
   * @param {number} id - ID del rol a eliminar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteRol(id) {
    try {
      const rol = await this.objRol.getById(id);
      if (!rol)
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
          data: null,
        };

      const rolEliminado = await this.objRol.delete(id);
      if (!rolEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Rol",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Rol eliminado correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los roles de empleados (excluye id 1 y 3).
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllRolesEmpleados() {
    try {
      const roles = await this.objRol.getAll();

      if (!roles || roles.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles registrados",
          data: null,
        };

      const rolesEmpleados = roles.filter(
        (rol) => rol.id !== 3 && rol.id !== 1
      );

      return {
        error: false,
        code: 200,
        message: "Roles empleados obtenidos correctamente",
        data: rolesEmpleados,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default RolService;
