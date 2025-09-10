import Venta from "../models/Venta.js";
import UsuarioService from "./UsuarioService.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con las ventas de la veterinaria.
 *
 * Se apoya en el modelo `Venta` para interactuar con la base de datos
 * y en `UsuarioService` para validar la existencia de compradores y vendedores.
 */
class VentaService {
  // Instancia única del modelo Venta
  static objVenta = new Venta();

  /**
   * Obtiene todas las ventas registradas.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllVentas() {
    try {
      const ventas = await this.objVenta.getAll();

      if (!ventas || ventas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas registradas",
        };

      return {
        error: false,
        code: 200,
        message: "Ventas obtenidas correctamente",
        data: ventas,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una venta por su ID.
   * @param {number} id - ID de la venta
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getVentaById(id) {
    try {
      const venta = await this.objVenta.getById(id);

      if (!venta)
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };

      return {
        error: false,
        code: 200,
        message: "Venta obtenida correctamente",
        data: venta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva venta.
   * @param {Object} venta - Datos de la venta a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createVenta(venta) {
    try {
      // Validamos que existan el vendedor y el comprador
      const vendedorExistente = await UsuarioService.getUsuarioById(
        venta.vendedor_id
      );
      if (vendedorExistente.error) return vendedorExistente;

      const compradorExistente = await UsuarioService.getUsuarioById(
        venta.comprador_id
      );
      if (compradorExistente.error) return compradorExistente;

      // Determinamos si la venta está completada
      const completada = venta.total == venta.monto ? 1 : 0;

      const ventaCreada = await this.objVenta.create({ ...venta, completada });

      if (ventaCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta",
        };

      return {
        error: false,
        code: 201,
        message: "Venta creada correctamente",
        data: ventaCreada,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una venta existente sumando el nuevo monto al existente.
   * @param {number} id - ID de la venta a actualizar
   * @param {Object} venta - Datos a actualizar (por ejemplo monto)
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateVenta(id, venta) {
    try {
      const existente = await this.objVenta.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };
      }

      // Sumamos el monto nuevo al existente
      const montoNuevo = Number(existente.monto) + Number(venta.monto);
      const completada = existente.total == montoNuevo ? 1 : 0;

      venta.monto = montoNuevo;

      const ventaActualizada = await this.objVenta.update(id, {
        ...venta,
        completada,
      });

      if (ventaActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta",
        };

      return {
        error: false,
        code: 200,
        message: "Venta actualizada correctamente",
        data: ventaActualizada,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una venta por su ID.
   * @param {number} id - ID de la venta a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteVenta(id) {
    try {
      const venta = await this.objVenta.getById(id);
      if (!venta)
        return {
          error: true,
          code: 404,
          message: "Venta no encontrada",
        };

      const ventaEliminada = await this.objVenta.delete(id);
      if (!ventaEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta",
        };

      return {
        error: false,
        code: 200,
        message: "Venta eliminada correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default VentaService;
