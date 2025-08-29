import UsuarioVenta from "../models/UsuarioVenta.js";
import UsuarioService from "./UsuarioService.js";
import VentaService from "./VentaService.js";
// import Usuario from "../models/Usuario.js";

class UsuarioVentaService {
  static objUsuarioVenta = new UsuarioVenta();
  // static objUsuario = new Usuario();

  static async getAllUsuariosVentas() {
    try {
      // Llamamos el método listar
      const usuarioVentas = await this.objUsuarioVenta.getAll();

      // Validamos si no hay tipos de usuarios
      if (!usuarioVentas || usuarioVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay usuarios de ventas registrados",
        };

      // Retornamos las tipos de usuarios obtenidas
      return {
        error: false,
        code: 200,
        message: "Usuarios de ventas obtenidos correctamente",
        data: usuarioVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuarioVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const usuarioVenta = await this.objUsuarioVenta.getById(id);
      // Validamos si no hay usuarioVenta
      if (!usuarioVenta)
        return {
          error: true,
          code: 404,
          message: "Usuario de venta no encontrado",
        };

      // Retornamos la usuarioVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Usuario de venta obtenido correctamente",
        data: usuarioVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createUsuarioVenta(usuarioVenta) {
    try {
      const ventaExistente = await VentaService.getVentaById(
        usuarioVenta.venta_id
      );

      if (ventaExistente.error) return ventaExistente;

      const usuarioExistente = await UsuarioService.getUsuarioById(
        usuarioVenta.usuario_id
      );

      if (usuarioExistente.error) return usuarioExistente;

      // Llamamos el método crear
      const usuarioVentaCreado = await this.objUsuarioVenta.create(
        usuarioVenta
      );
      // Validamos si no se pudo crear el tipo de usuario
      if (usuarioVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el usuario de venta",
        };

      // Retornamos el tipo de usuario creado
      return {
        error: false,
        code: 201,
        message: "Usuario de venta creado correctamente",
        data: usuarioVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateUsuarioVenta(id, usuarioVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objUsuarioVenta.getById(id);
      // Validamos si el tipo de usuario existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Usuario de venta no encontrado",
        };
      }

      // Llamamos el método actualizar
      const usuarioVentaActualizado = await this.objUsuarioVenta.update(
        id,
        usuarioVenta
      );
      // Validamos si no se pudo actualizar el tipo de usuario
      if (usuarioVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el usuario de venta",
        };

      // Retornamos el tipo de usuario actualizado
      return {
        error: false,
        code: 200,
        message: "Usuario de venta actualizado correctamente",
        data: usuarioVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteUsuarioVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const usuarioVenta = await this.objUsuarioVenta.getById(id);
      // Validamos si el tipo de usuario existe
      if (!usuarioVenta)
        return {
          error: true,
          code: 404,
          message: "Usuario de venta no encontrado",
        };

      // Llamamos el método eliminar
      const usuarioVentaEliminado = await this.objUsuarioVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de usuario
      if (!usuarioVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el usuario de venta",
        };

      // Retornamos el tipo de usuario eliminado
      return {
        error: false,
        code: 200,
        message: "Usuario de venta eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default UsuarioVentaService;
