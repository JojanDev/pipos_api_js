import DetalleVenta from "../models/DetalleVenta.js";
// import Usuario from "../models/Usuario.js";

class DetalleVentaService {
  static objDetalleVenta = new DetalleVenta();
  // static objUsuario = new Usuario();

  static async getAllDetallesVentas() {
    try {
      // Llamamos el método listar
      const detallesVentas = await this.objDetalleVenta.getAll();

      // Validamos si no hay tipos de productos
      if (!detallesVentas || detallesVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay detalles de ventas registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Detalles de ventas obtenidos correctamente",
        data: detallesVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getDetalleVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const detalleVenta = await this.objDetalleVenta.getById(id);
      // Validamos si no hay detalleVenta
      if (!detalleVenta)
        return {
          error: true,
          code: 404,
          message: "Detalle de venta no encontrado",
        };

      // Retornamos la detalleVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Detalle de venta obtenido correctamente",
        data: detalleVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createDetalleVenta(detalleVenta) {
    try {
      // Llamamos el método crear
      const detalleVentaCreado = await this.objDetalleVenta.create(
        detalleVenta
      );
      // Validamos si no se pudo crear el tipo de producto
      if (detalleVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Detalle de venta",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Detalle de venta creado correctamente",
        data: detalleVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateDetalleVenta(id, detalleVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objDetalleVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Detalle de venta no encontrada",
        };
      }

      // Llamamos el método actualizar
      const detalleVentaActualizado = await this.objDetalleVenta.update(
        id,
        detalleVenta
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (detalleVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Detalle de venta",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Detalle de venta actualizado correctamente",
        data: detalleVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteDetalleVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const detalleVenta = await this.objDetalleVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!detalleVenta)
        return {
          error: true,
          code: 404,
          message: "Detalle de venta no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByDetalleVentaId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const detalleVentaEliminado = await this.objDetalleVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!detalleVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Detalle de venta",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Detalle de venta eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default DetalleVentaService;
