import ServicioVenta from "../models/ServicioVenta.js";
import ServicioService from "./ServicioService.js";
import VentaService from "./VentaService.js";

/**
 * Servicio para gestionar la relación de ventas de servicios.
 * Incluye métodos CRUD y consultas específicas por venta o por servicio.
 */
class ServicioVentaService {
  static objServicioVenta = new ServicioVenta();

  /**
   * Obtiene todas las ventas de servicios.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllServiciosVentas() {
    try {
      const serviciosVentas = await this.objServicioVenta.getAll();

      if (!serviciosVentas || serviciosVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de servicios registradas",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de servicios obtenidas correctamente",
        data: serviciosVentas,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene una venta de servicio por su ID.
   * @param {number} id - ID de la venta de servicio.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getServicioVentaById(id) {
    try {
      const servicioVenta = await this.objServicioVenta.getById(id);

      if (!servicioVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta de servicio obtenida correctamente",
        data: servicioVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea una nueva venta de servicio.
   * @param {Object} servicioVenta - Datos de la venta de servicio a crear.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createServicioVenta(servicioVenta) {
    try {
      const ventaExistente = await VentaService.getVentaById(
        servicioVenta.venta_id
      );
      if (ventaExistente.error) return ventaExistente;

      const servicioExistente = await ServicioService.getServicioById(
        servicioVenta.servicio_id
      );
      if (servicioExistente.error) return servicioExistente;

      const servicioVentaCreado = await this.objServicioVenta.create(
        servicioVenta
      );
      if (!servicioVentaCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del servicio",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Venta de servicio creada correctamente",
        data: servicioVentaCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza una venta de servicio existente por su ID.
   * @param {number} id - ID de la venta de servicio.
   * @param {Object} servicioVenta - Nuevos datos de la venta.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateServicioVenta(id, servicioVenta) {
    try {
      const existente = await this.objServicioVenta.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
          data: null,
        };

      const servicioVentaActualizado = await this.objServicioVenta.update(
        id,
        servicioVenta
      );
      if (!servicioVentaActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del servicio",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta de servicio actualizada correctamente",
        data: servicioVentaActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina una venta de servicio por su ID.
   * @param {number} id - ID de la venta de servicio.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteServicioVenta(id) {
    try {
      const servicioVenta = await this.objServicioVenta.getById(id);
      if (!servicioVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de servicio no encontrada",
          data: null,
        };

      const eliminado = await this.objServicioVenta.delete(id);
      if (!eliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del servicio",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta del servicio eliminada correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todas las ventas de servicios asociadas a una venta específica.
   * @param {number} venta_id - ID de la venta.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllServicioVentaByVentaId(venta_id) {
    try {
      const serviciosVenta = await this.objServicioVenta.getByVentaId(venta_id);
      if (!serviciosVenta || serviciosVenta.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay servicios registrados en la venta",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de servicio obtenidas correctamente",
        data: serviciosVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todas las ventas de servicios asociadas a un servicio específico.
   * @param {number} servicio_id - ID del servicio.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllServicioVentaByServicioId(servicio_id) {
    try {
      const serviciosVenta = await this.objServicioVenta.getByServicioId(
        servicio_id
      );
      if (!serviciosVenta || serviciosVenta.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay registros en ventas del servicio",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de servicio obtenidas correctamente",
        data: serviciosVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default ServicioVentaService;
