import RolUsuario from "../models/RolUsuario.js";
import RolService from "./RolService.js";
import UsuarioService from "./UsuarioService.js";
// import Usuario from "../models/Usuario.js";

class RolUsuarioService {
  static objRolUsuario = new RolUsuario();
  // static objUsuario = new Usuario();

  static async getAllRolesUsuarios() {
    try {
      // Llamamos el método listar
      const rolesUsuarios = await this.objRolUsuario.getAll();

      // Validamos si no hay tipos de productos
      if (!rolesUsuarios || rolesUsuarios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles de usuarios registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Roles de usuarios obtenidos correctamente",
        data: rolesUsuarios,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getRolUsuarioById(id) {
    try {
      // Llamamos el método consultar por ID
      const rolUsuario = await this.objRolUsuario.getById(id);
      // Validamos si no hay rolUsuario
      if (!rolUsuario)
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };

      // Retornamos la rolUsuario obtenida
      return {
        error: false,
        code: 200,
        message: "Rol de usuario obtenido correctamente",
        data: rolUsuario,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createRolUsuario(rolUsuario) {
    try {
      const rolExistente = await RolService.getRolById(
        rolUsuario.rol_id
      );

      if (rolExistente.error) return rolExistente;

      const usuarioExistente = await UsuarioService.getUsuarioById(rolUsuario.usuario_id);

      if (usuarioExistente.error) return usuarioExistente;

      const rolUsuarioExistente = await this.objRolUsuario.getByRolUsuarioExists(rolUsuario.usuario_id, rolUsuario.rol_id);

      if (rolUsuarioExistente && rolUsuarioExistente.length !== 0)
        return {
          error: true,
          code: 400,
          message: "Este rol ya ha sido asignado al usuario",
        };

      // Llamamos el método crear
      const rolUsuarioCreado = await this.objRolUsuario.create(
        rolUsuario
      );
      // Validamos si no se pudo crear el tipo de producto
      if (rolUsuarioCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Rol de usuario",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Rol de usuario creado correctamente",
        data: rolUsuarioCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateRolUsuario(id, rolUsuario) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objRolUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };
      }

      // Llamamos el método actualizar
      const rolUsuarioActualizado = await this.objRolUsuario.update(
        id,
        rolUsuario
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (rolUsuarioActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Rol de usuario",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Rol de usuario actualizado correctamente",
        data: rolUsuarioActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteRolUsuario(id) {
    try {
      // Llamamos el método consultar por ID
      const rolUsuario = await this.objRolUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!rolUsuario)
        return {
          error: true,
          code: 404,
          message: "Rol de usuario no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByRolUsuarioId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const rolUsuarioEliminado = await this.objRolUsuario.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!rolUsuarioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Rol de usuario",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Rol de usuario eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default RolUsuarioService;
