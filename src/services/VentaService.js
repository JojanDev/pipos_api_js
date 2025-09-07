import Venta from "../models/Venta.js";
import UsuarioService from "./UsuarioService.js";
// import Usuario from "../models/Usuario.js";

class VentaService {
  static objVenta = new Venta();
  // static objUsuario = new Usuario();

  static async getAllVentas() {
    try {
      // Llamamos el método listar
      const ventas = await this.objVenta.getAll();

      // Validamos si no hay tipos de documentos
      if (!ventas || ventas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas registradas",
        };

      // Retornamos las tipos de documentos obtenidas
      return {
        error: false,
        code: 200,
        message: "Ventas obtenidas correctamente",
        data: ventas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const venta = await this.objVenta.getById(id);
      // Validamos si no hay venta
      if (!venta)
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };

      // Retornamos la venta obtenida
      return {
        error: false,
        code: 200,
        message: "Venta obtenida correctamente",
        data: venta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createVenta(venta) {
    try {
      const vendedorExistente = await UsuarioService.getUsuarioById(
        venta.vendedor_id
      );

      if (vendedorExistente.error) return vendedorExistente;

      const compradorExistente = await UsuarioService.getUsuarioById(
        venta.comprador_id
      );

      if (compradorExistente.error) return compradorExistente;

      const estado = venta.total == venta.monto ? "completada" : "pendiente";

      // Llamamos el método crear
      const ventaCreada = await this.objVenta.create({ ...venta, estado });
      // Validamos si no se pudo crear el tipo de documento
      if (ventaCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta",
        };

      // Retornamos el tipo de documento creado
      return {
        error: false,
        code: 201,
        message: "Venta creada correctamente",
        data: ventaCreada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateVenta(id, venta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objVenta.getById(id);
      // Validamos si el tipo de documento existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };
      }

      const estado =
        existente.total == Number(existente.monto) + Number(venta.monto)
          ? "completada"
          : "pendiente";

      // Llamamos el método actualizar
      const ventaActualizada = await this.objVenta.update(id, {
        ...venta,
        estado,
      });
      // Validamos si no se pudo actualizar el tipo de documento
      if (ventaActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta",
        };

      // Retornamos el tipo de documento actualizado
      return {
        error: false,
        code: 200,
        message: "Venta actualizada correctamente",
        data: ventaActualizada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const venta = await this.objVenta.getById(id);
      // Validamos si el tipo de documento existe
      if (!venta)
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };

      // const usuariosTipo = await this.objUsuario.getAllByVentasId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de documento porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const ventaEliminada = await this.objVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de documento
      if (!ventaEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta",
        };

      // Retornamos el tipo de documento eliminado
      return {
        error: false,
        code: 200,
        message: "Venta eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default VentaService;
