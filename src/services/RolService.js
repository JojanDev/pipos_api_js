import Rol from "../models/Rol.js";
// import Usuario from "../models/Usuario.js";

class RolService {
  static objRol = new Rol();
  // static objUsuario = new Usuario();

  static async getAllRoles() {
    try {
      // Llamamos el método listar
      const roles = await this.objRol.getAll();

      // Validamos si no hay tipos de productos
      if (!roles || roles.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay roles registrados",
        };



      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Roles obtenidos correctamente",
        data: roles.filter((rol) => rol.id !== 1),
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getRolById(id) {
    try {
      // Llamamos el método consultar por ID
      const rol = await this.objRol.getById(id);
      // Validamos si no hay rol
      if (!rol)
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };

      // Retornamos la rol obtenida
      return {
        error: false,
        code: 200,
        message: "Rol obtenido correctamente",
        data: rol,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createRol(rol) {
    try {
      // Llamamos el método crear
      const rolCreado = await this.objRol.create(
        rol
      );
      // Validamos si no se pudo crear el tipo de producto
      if (rolCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Rol",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Rol creado correctamente",
        data: rolCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateRol(id, rol) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objRol.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Rol no encontrada",
        };
      }

      // Llamamos el método actualizar
      const rolActualizado = await this.objRol.update(
        id,
        rol
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (rolActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Rol",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Rol actualizado correctamente",
        data: rolActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteRol(id) {
    try {
      // Llamamos el método consultar por ID
      const rol = await this.objRol.getById(id);
      // Validamos si el tipo de producto existe
      if (!rol)
        return {
          error: true,
          code: 404,
          message: "Rol no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByRolId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const rolEliminado = await this.objRol.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!rolEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Rol",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Rol eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default RolService;
