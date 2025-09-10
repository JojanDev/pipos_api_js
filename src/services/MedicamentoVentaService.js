import MedicamentoVenta from "../models/MedicamentoVenta.js";
import MedicamentoService from "./MedicamentoService.js";
import VentaService from "./VentaService.js";

/**
 * Servicio para gestionar las ventas de medicamentos.
 * Contiene métodos CRUD y consultas por relaciones con ventas y medicamentos.
 */
class MedicamentoVentaService {
  static objMedicamentoVenta = new MedicamentoVenta();

  /**
   * Obtiene todas las ventas de medicamentos registradas.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllMedicamentosVentas() {
    try {
      const medicamentosVentas = await this.objMedicamentoVenta.getAll();

      if (!medicamentosVentas || medicamentosVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de medicamentos registradas",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de medicamentos obtenidas correctamente",
        data: medicamentosVentas,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene una venta de medicamento por su ID.
   * @param {number} id - ID del registro a consultar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getMedicamentoVentaById(id) {
    try {
      const medicamentoVenta = await this.objMedicamentoVenta.getById(id);

      if (!medicamentoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta de medicamento obtenida correctamente",
        data: medicamentoVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea una nueva venta de medicamento.
   * Valida que existan la venta y el medicamento asociados.
   * Además actualiza el stock del medicamento.
   * @param {Object} medicamentoVenta - Datos de la venta de medicamento.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createMedicamentoVenta(medicamentoVenta) {
    try {
      // Validamos existencia de la venta
      const ventaExistente = await VentaService.getVentaById(
        medicamentoVenta.venta_id
      );
      if (ventaExistente.error) return ventaExistente;

      // Validamos existencia del medicamento
      const medicamentoExistente = await MedicamentoService.getMedicamentoById(
        medicamentoVenta.medicamento_id
      );
      if (medicamentoExistente.error) return medicamentoExistente;

      // Creamos la venta de medicamento
      const medicamentoVentaCreado = await this.objMedicamentoVenta.create(
        medicamentoVenta
      );
      if (!medicamentoVentaCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del medicamento",
          data: null,
        };

      // Actualizamos el stock del medicamento
      const cantidad =
        medicamentoExistente.data.cantidad - medicamentoVenta.cantidad;
      await MedicamentoService.updateMedicamento(
        medicamentoVenta.medicamento_id,
        { cantidad }
      );

      return {
        error: false,
        code: 201,
        message: "Venta de medicamento creada correctamente",
        data: medicamentoVentaCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza una venta de medicamento existente.
   * @param {number} id - ID del registro a actualizar.
   * @param {Object} medicamentoVenta - Nuevos datos de la venta.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateMedicamentoVenta(id, medicamentoVenta) {
    try {
      const existente = await this.objMedicamentoVenta.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
          data: null,
        };

      const medicamentoVentaActualizado = await this.objMedicamentoVenta.update(
        id,
        medicamentoVenta
      );
      if (!medicamentoVentaActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del medicamento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta de medicamento actualizada correctamente",
        data: medicamentoVentaActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina una venta de medicamento por su ID.
   * @param {number} id - ID del registro a eliminar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteMedicamentoVenta(id) {
    try {
      const medicamentoVenta = await this.objMedicamentoVenta.getById(id);
      if (!medicamentoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
          data: null,
        };

      const eliminado = await this.objMedicamentoVenta.delete(id);
      if (!eliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del medicamento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Venta del medicamento eliminada correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todas las ventas de medicamentos asociadas a una venta específica.
   * @param {number} venta_id - ID de la venta.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllMedicamentosVentasByVentaId(venta_id) {
    try {
      const medicamentosVenta = await this.objMedicamentoVenta.getAllByVentaId(
        venta_id
      );

      if (!medicamentosVenta || medicamentosVenta.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos vendidos en la venta",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de medicamentos obtenidas correctamente",
        data: medicamentosVenta,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default MedicamentoVentaService;
