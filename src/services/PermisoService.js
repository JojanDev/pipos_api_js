import Permiso from "../models/Permiso.js";
// import Usuario from "../models/Usuario.js";

class PermisoService {
  static objPermiso = new Permiso();
  // static objUsuario = new Usuario();

  static async getAllPermisos() {
    try {
      // Llamamos el método listar
      const permisos = await this.objPermiso.getAll();

      // Validamos si no hay tipos de productos
      if (!permisos || permisos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay permisos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Permisos obtenidos correctamente",
        data: permisos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getPermisoById(id) {
    try {
      // Llamamos el método consultar por ID
      const permiso = await this.objPermiso.getById(id);
      // Validamos si no hay permiso
      if (!permiso)
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };

      // Retornamos la permiso obtenida
      return {
        error: false,
        code: 200,
        message: "Permiso obtenido correctamente",
        data: permiso,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createPermiso(permiso) {
    try {
      // Llamamos el método crear
      const permisoCreado = await this.objPermiso.create(
        permiso
      );
      // Validamos si no se pudo crear el tipo de producto
      if (permisoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Permiso",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Permiso creado correctamente",
        data: permisoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updatePermiso(id, permiso) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objPermiso.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrada",
        };
      }

      // Llamamos el método actualizar
      const permisoActualizado = await this.objPermiso.update(
        id,
        permiso
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (permisoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Permiso",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Permiso actualizado correctamente",
        data: permisoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deletePermiso(id) {
    try {
      // Llamamos el método consultar por ID
      const permiso = await this.objPermiso.getById(id);
      // Validamos si el tipo de producto existe
      if (!permiso)
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByPermisoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const permisoEliminado = await this.objPermiso.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!permisoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Permiso",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Permiso eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default PermisoService;
