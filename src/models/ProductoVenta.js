import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de ProductosVentas.
 * Maneja las operaciones CRUD relacionadas con la tabla "productos_ventas".
 */
class ProductoVenta extends Modelo {
  #tableName = "productos_ventas";

  /**
   * Obtiene todas las relaciones de productos con ventas.
   * @returns {Promise<Array>} Lista de todos los registros de productos vendidos en ventas.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todas las ventas de productos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene una relación producto-venta específica por su ID.
   * @param {number} id - ID del registro producto-venta.
   * @returns {Promise<Object|null>} El registro encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la venta del producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo registro de producto asociado a una venta.
   * @param {Object} productoVenta - Objeto con los datos del producto-venta.
   * @returns {Promise<Object|null>} El registro creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(productoVenta) {
    try {
      const idCreado = await super.create(this.#tableName, productoVenta);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la venta del producto: ${error.message}`);
    }
  }

  /**
   * Actualiza un registro producto-venta existente.
   * @param {number} id - ID del registro a actualizar.
   * @param {Object} productoVenta - Objeto con los nuevos datos del producto-venta.
   * @returns {Promise<Object|null>} El registro actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, productoVenta) {
    try {
      if (await super.update(this.#tableName, id, productoVenta)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la venta del producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un registro producto-venta de la base de datos.
   * @param {number} id - ID del registro a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la venta del producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los productos asociados a una venta específica.
   * @param {number} venta_id - ID de la venta.
   * @returns {Promise<Array>} Lista de productos vendidos en la venta indicada.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByVentaId(venta_id) {
    try {
      return await super.getByField(this.#tableName, "venta_id", venta_id);
    } catch (error) {
      throw new Error(
        `Error al obtener los productos vendidos de la venta con ID ${venta_id}: ${error.message}`
      );
    }
  }
}

export default ProductoVenta;
