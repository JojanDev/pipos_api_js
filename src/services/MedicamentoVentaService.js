import MedicamentoVenta from "../models/MedicamentoVenta.js";
import MedicamentoService from "./MedicamentoService.js";
import VentaService from "./VentaService.js";
// import Usuario from "../models/Usuario.js";

class MedicamentoVentaService {
  static objMedicamentoVenta = new MedicamentoVenta();

  static async getAllMedicamentosVentas() {
    try {
      // Llamamos el método listar
      const medicamentosVentas = await this.objMedicamentoVenta.getAll();

      // Validamos si no hay tipos de productos
      if (!medicamentosVentas || medicamentosVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de medicamentos registradas",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Ventas de medicamentos obtenidas correctamente",
        data: medicamentosVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getMedicamentoVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamentoVenta = await this.objMedicamentoVenta.getById(id);
      // Validamos si no hay medicamentoVenta
      if (!medicamentoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
        };

      // Retornamos la medicamentoVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Venta de medicamento obtenida correctamente",
        data: medicamentoVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createMedicamentoVenta(medicamentoVenta) {
    try {
      const ventaExistente = await VentaService.getVentaById(
        productoVenta.venta_id
      );

      if (ventaExistente.error) return ventaExistente;

      const medicamentoExistente = await MedicamentoService.getMedicamentoById(
        medicamentoVenta.medicamento_id
      );

      if (medicamentoExistente.error) return medicamentoExistente;

      // Llamamos el método crear
      const medicamentoVentaCreado = await this.objMedicamentoVenta.create(
        medicamentoVenta
      );
      // Validamos si no se pudo crear el tipo de producto
      if (medicamentoVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del medicamento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Venta de medicamento creada correctamente",
        data: medicamentoVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateMedicamentoVenta(id, medicamentoVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objMedicamentoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
        };
      }

      // Llamamos el método actualizar
      const medicamentoVentaActualizado = await this.objMedicamentoVenta.update(
        id,
        medicamentoVenta
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (medicamentoVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del medicamento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Venta de medicamento actualizada correctamente",
        data: medicamentoVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteMedicamentoVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamentoVenta = await this.objMedicamentoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!medicamentoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta de medicamento no encontrada",
        };

      // Llamamos el método eliminar
      const medicamentoVentaEliminado = await this.objMedicamentoVenta.delete(
        id
      );
      // Validamos si no se pudo eliminar el tipo de producto
      if (!medicamentoVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del medicamento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Venta del medicamento eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllMedicamentosVentasByVentaId(venta_id) {
    try {
      // Llamamos el método listar
      const medicamentosVenta = await this.objMedicamentoVenta.getAllByVentaId(
        venta_id
      );

      // Validamos si no hay tipos de productos
      if (!medicamentosVenta || medicamentosVenta.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos vendidos en la venta",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Ventas de medicamentos obtenidas correctamente",
        data: medicamentosVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MedicamentoVentaService;
