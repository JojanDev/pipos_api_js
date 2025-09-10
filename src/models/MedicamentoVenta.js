import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de medicamentos asociados a ventas.
 * Hereda métodos genéricos de la clase Modelo y los especializa
 * para interactuar con la tabla `medicamentos_ventas`.
 */
class MedicamentoVenta extends Modelo {
  #tableName = "medicamentos_ventas";

  /**
   * Obtiene todas las ventas de medicamentos registradas en la base de datos.
   * @returns {Promise<Array>} Lista de todas las ventas de medicamentos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todas las ventas de medicamentos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene una venta de medicamento específica por su ID.
   * @param {number} id - ID de la venta de medicamento
   * @returns {Promise<Object|null>} La venta encontrada o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la venta de medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo registro de venta de medicamento en la base de datos.
   * @param {Object} medicamentoVenta - Objeto con los datos de la venta de medicamento (ejemplo: { medicamento_id, venta_id, cantidad, precio })
   * @returns {Promise<Object|null>} La venta de medicamento creada con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(medicamentoVenta) {
    try {
      const idCreado = await super.create(this.#tableName, medicamentoVenta);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al crear la venta de medicamento: ${error.message}`
      );
    }
  }

  /**
   * Actualiza un registro de venta de medicamento existente.
   * @param {number} id - ID de la venta de medicamento a actualizar
   * @param {Object} medicamentoVenta - Objeto con los nuevos datos de la venta de medicamento
   * @returns {Promise<Object|null>} La venta actualizada, o null si no existe
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, medicamentoVenta) {
    try {
      if (await super.update(this.#tableName, id, medicamentoVenta)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la venta de medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un registro de venta de medicamento de la base de datos.
   * @param {number} id - ID de la venta de medicamento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la venta de medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las ventas de medicamentos asociadas a una venta en particular.
   * @param {number} venta_id - ID de la venta
   * @returns {Promise<Array>} Lista de medicamentos vendidos en esa venta
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByVentaId(venta_id) {
    try {
      return await super.getByField(this.#tableName, "venta_id", venta_id);
    } catch (error) {
      throw new Error(
        `Error al obtener los medicamentos asociados a la venta con ID ${venta_id}: ${error.message}`
      );
    }
  }
}

export default MedicamentoVenta;
