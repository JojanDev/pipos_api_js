import PermisoRol from "../models/PermisoRol.js";
import PermisoService from "./PermisoService.js";
import RolService from "./RolService.js";
// import Usuario from "../models/Usuario.js";

class PermisoRolService {
  static objPermisoRol = new PermisoRol();
  // static objUsuario = new Usuario();

  static async getAllPermisosRoles() {
    try {
      // Llamamos el método listar
      const permisosRoles = await this.objPermisoRol.getAll();

      // Validamos si no hay tipos de productos
      if (!permisosRoles || permisosRoles.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay permisos de roles registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Permisos de roles obtenidos correctamente",
        data: permisosRoles,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getPermisoRolById(id) {
    try {
      // Llamamos el método consultar por ID
      const permisoRol = await this.objPermisoRol.getById(id);
      // Validamos si no hay permisoRol
      if (!permisoRol)
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };

      // Retornamos la permisoRol obtenida
      return {
        error: false,
        code: 200,
        message: "Permiso de rol obtenido correctamente",
        data: permisoRol,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createPermisoRol(permisoRol) {
    try {
      const permisoExistente = await PermisoService.getPermisoById(
        permisoRol.permiso_id
      );

      if (permisoExistente.error) return permisoExistente;

      const rolExistente = await RolService.getRolById(permisoRol.rol_id);

      if (rolExistente.error) return rolExistente;

      //QUE UN PERMISO NO ESTE DOS VECES EN UN ROL

      // Llamamos el método crear
      const permisoRolCreado = await this.objPermisoRol.create(permisoRol);
      // Validamos si no se pudo crear el tipo de producto
      if (permisoRolCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Permiso de rol",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Permiso de rol creado correctamente",
        data: permisoRolCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updatePermisoRol(id, permisoRol) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objPermisoRol.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrada",
        };
      }

      // Llamamos el método actualizar
      const permisoRolActualizado = await this.objPermisoRol.update(
        id,
        permisoRol
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (permisoRolActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Permiso de rol",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Permiso de rol actualizado correctamente",
        data: permisoRolActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deletePermisoRol(id) {
    try {
      // Llamamos el método consultar por ID
      const permisoRol = await this.objPermisoRol.getById(id);
      // Validamos si el tipo de producto existe
      if (!permisoRol)
        return {
          error: true,
          code: 404,
          message: "Permiso de rol no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByPermisoRolId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const permisoRolEliminado = await this.objPermisoRol.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!permisoRolEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Permiso de rol",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Permiso de rol eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default PermisoRolService;
