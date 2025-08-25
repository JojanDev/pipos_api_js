import Usuario from "../models/Usuario.js";
// import Usuario from "../models/Usuario.js";

class UsuarioService {
  static objUsuario = new Usuario();
  // static objUsuario = new Usuario();

  static async getAllUsuarios() {
    try {
      // Llamamos el método listar
      const usuarios = await this.objUsuario.getAll();

      // Validamos si no hay tipos de productos
      if (!usuarios || usuarios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: usuarios,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuarioById(id) {
    try {
      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si no hay usuario
      if (!usuario)
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };

      // Retornamos la usuario obtenida
      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createUsuario(usuario) {
    try {
      // Llamamos el método crear
      const usuarioCreado = await this.objUsuario.create(
        usuario
      );
      // Validamos si no se pudo crear el tipo de producto
      if (usuarioCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Usuario",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Usuario creado correctamente",
        data: usuarioCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateUsuario(id, usuario) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrada",
        };
      }

      // Llamamos el método actualizar
      const usuarioActualizado = await this.objUsuario.update(
        id,
        usuario
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (usuarioActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Usuario",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: usuarioActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteUsuario(id) {
    try {
      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!usuario)
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByUsuarioId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const usuarioEliminado = await this.objUsuario.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!usuarioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Usuario",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default UsuarioService;
