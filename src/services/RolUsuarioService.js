import RolUsuario from "../models/RolUsuario.js";
import RolService from "./RolService.js";
import UsuarioService from "./UsuarioService.js";

class RolUsuarioService {
  static objRolUsuario = new RolUsuario();

  /**
   * Obtiene todos los roles de usuarios registrados
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de roles de usuarios
   */
  static async getAllRolesUsuarios() {
    try {
      const rolesUsuarios = await this.objRolUsuario.getAll();

      if (!rolesUsuarios || rolesUsuarios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles de usuarios registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Roles de usuarios obtenidos correctamente",
        data: rolesUsuarios,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un rol de usuario por su ID
   * @param {number} id - ID del rol de usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y el rol de usuario
   */
  static async getRolUsuarioById(id) {
    try {
      const rolUsuario = await this.objRolUsuario.getById(id);

      if (!rolUsuario)
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Rol de usuario obtenido correctamente",
        data: rolUsuario,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo rol de usuario
   * @param {Object} rolUsuario - Datos del rol de usuario a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y el rol de usuario creado
   */
  static async createRolUsuario(rolUsuario) {
    try {
      // Validamos que el rol exista
      const rolExistente = await RolService.getRolById(rolUsuario.rol_id);
      if (rolExistente.error) return rolExistente;

      // Validamos que el usuario exista
      const usuarioExistente = await UsuarioService.getUsuarioById(
        rolUsuario.usuario_id
      );
      if (usuarioExistente.error) return usuarioExistente;

      // Validamos que no se haya asignado previamente
      const rolUsuarioExistente =
        await this.objRolUsuario.getByRolUsuarioExists(
          rolUsuario.usuario_id,
          rolUsuario.rol_id
        );
      if (rolUsuarioExistente && rolUsuarioExistente.length !== 0)
        return {
          error: true,
          code: 400,
          message: "Este rol ya ha sido asignado al usuario",
        };

      // Creamos el rol de usuario
      const rolUsuarioCreado = await this.objRolUsuario.create(rolUsuario);
      if (!rolUsuarioCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Rol de usuario",
        };

      return {
        error: false,
        code: 201,
        message: "Rol de usuario creado correctamente",
        data: rolUsuarioCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un rol de usuario existente
   * @param {number} id - ID del rol de usuario a actualizar
   * @param {Object} rolUsuario - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y el rol actualizado
   */
  static async updateRolUsuario(id, rolUsuario) {
    try {
      const existente = await this.objRolUsuario.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };

      const rolUsuarioActualizado = await this.objRolUsuario.update(
        id,
        rolUsuario
      );
      if (!rolUsuarioActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Rol de usuario",
        };

      return {
        error: false,
        code: 200,
        message: "Rol de usuario actualizado correctamente",
        data: rolUsuarioActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un rol de usuario por su ID
   * @param {number} id - ID del rol de usuario a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteRolUsuario(id) {
    try {
      const rolUsuario = await this.objRolUsuario.getById(id);
      if (!rolUsuario)
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };

      // Llamamos el método eliminar
      const rolUsuarioEliminado = await this.objRolUsuario.delete(id);
      if (!rolUsuarioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Rol de usuario",
        };

      return {
        error: false,
        code: 200,
        message: "Rol de usuario eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todos los roles asignados a un usuario específico
   * @param {number} usuario_id - ID del usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de roles del usuario
   */
  static async getAllRolesUsuarioByUsuarioId(usuario_id) {
    try {
      const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
        usuario_id
      );

      if (!rolesUsuario || rolesUsuario.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles registrados para el usuario",
        };

      return {
        error: false,
        code: 200,
        message: "Roles de usuario obtenidos correctamente",
        data: rolesUsuario,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default RolUsuarioService;
