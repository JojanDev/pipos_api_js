import ServicioVenta from "../models/ServicioVenta.js";
import ServicioService from "./ServicioService.js";
import VentaService from "./VentaService.js";
// import Usuario from "../models/Usuario.js";

class ServicioVentaService {
  static objServicioVenta = new ServicioVenta();
  // static objUsuario = new Usuario();

  static async getAllServiciosVentas() {
    try {
      // Llamamos el método listar
      const serviciosVentas = await this.objServicioVenta.getAll();

      // Validamos si no hay tipos de productos
      if (!serviciosVentas || serviciosVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de servicios registradas",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Ventas de servicios obtenidas correctamente",
        data: serviciosVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getServicioVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const servicioVenta = await this.objServicioVenta.getById(id);
      // Validamos si no hay servicioVenta
      if (!servicioVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
        };

      // Retornamos la servicioVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Venta de servicio obtenida correctamente",
        data: servicioVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createServicioVenta(servicioVenta) {
    try {
      const ventaExistente = await VentaService.getVentaById(
        productoVenta.venta_id
      );

      if (ventaExistente.error) return ventaExistente;

      const servicioExistente = await ServicioService.getServicioById(
        servicioVenta.servicio_id
      );

      if (servicioExistente.error) return servicioExistente;

      // Llamamos el método crear
      const servicioVentaCreado = await this.objServicioVenta.create(
        servicioVenta
      );
      // Validamos si no se pudo crear el tipo de producto
      if (servicioVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del servicio",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Venta de servicio creada correctamente",
        data: servicioVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateServicioVenta(id, servicioVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objServicioVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
        };
      }

      // Llamamos el método actualizar
      const servicioVentaActualizado = await this.objServicioVenta.update(
        id,
        servicioVenta
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (servicioVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del servicio",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Venta de servicio actualizada correctamente",
        data: servicioVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteServicioVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const servicioVenta = await this.objServicioVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!servicioVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
        };

      // Llamamos el método eliminar
      const servicioVentaEliminado = await this.objServicioVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!servicioVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del servicio",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Venta del servicio eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ServicioVentaService;
