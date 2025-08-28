import Credencial from "../models/Credencial.js";
import Usuario from "../models/Usuario.js";

class CredencialService {
  static objCredencial = new Credencial();
  static objUsuario = new Usuario();
  // static objUsuario = new Usuario();

  static async getAllCredenciales() {
    try {
      // Llamamos el método listar
      const credenciales = await this.objCredencial.getAll();

      // Validamos si no hay tipos de productos
      if (!credenciales || credenciales.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay credenciales registradas",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Credencials obtenidas correctamente",
        data: credenciales,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getCredencialById(id) {
    try {
      // Llamamos el método consultar por ID
      const credencial = await this.objCredencial.getById(id);
      // Validamos si no hay credencial
      if (!credencial)
        return {
          error: true,
          code: 404,
          message: "Credencial no encontrada",
        };

      // Retornamos la credencial obtenida
      return {
        error: false,
        code: 200,
        message: "Credencial obtenida correctamente",
        data: credencial,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createCredencial(credencial) {
    try {
      const usuarioExistente = await this.objUsuario.getById(credencial.usuario_id);
      console.log(usuarioExistente);
      
      if (!usuarioExistente) 
        return { error: true, code: 404, message: "El usuario no esta registrado." };
      
      if (await this.objCredencial.getByUsuarioId(credencial.usuario_id))
        return { error: true, code: 409, message: "El usuario ya tiene credenciales registradas." };

      if (await this.objCredencial.getByUsuario(credencial.usuario))
        return { error: true, code: 409, message: "El nombre de usuario ya esta registrado." };

      // Llamamos el método crear
      const credencialCreado = await this.objCredencial.create(credencial);
      // Validamos si no se pudo crear el tipo de producto
      if (credencialCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la credencial",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Credencial creada correctamente",
        data: credencialCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateCredencial(id, credencial) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objCredencial.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Credencial no encontrada",
        };
      }

      // Llamamos el método actualizar
      const credencialActualizado = await this.objCredencial.update(
        id,
        credencial
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (credencialActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la credencial",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Credencial actualizada correctamente",
        data: credencialActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteCredencial(id) {
    try {
      // Llamamos el método consultar por ID
      const credencial = await this.objCredencial.getById(id);
      // Validamos si el tipo de producto existe
      if (!credencial)
        return {
          error: true,
          code: 404,
          message: "Credencial no encontrada",
        };

      // const usuariosTipo = await this.objUsuario.getAllByCredencialId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const credencialEliminado = await this.objCredencial.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!credencialEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la credencial",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Credencial eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default CredencialService;
