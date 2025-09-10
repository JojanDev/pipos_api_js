import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de Productos.
 * Se encarga de manejar las operaciones CRUD relacionadas con la tabla "productos".
 */
class Producto extends Modelo {
  #tableName = "productos";

  /**
   * Obtiene todos los productos de la base de datos.
   * @returns {Promise<Array>} Lista de todos los productos.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {number} id - ID del producto.
   * @returns {Promise<Object|null>} El producto encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo producto en la base de datos.
   * @param {Object} producto - Objeto con los datos del producto.
   * @returns {Promise<Object|null>} El producto creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(producto) {
    try {
      const idCreado = await super.create(this.#tableName, producto);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  /**
   * Actualiza un producto existente.
   * @param {number} id - ID del producto a actualizar.
   * @param {Object} producto - Objeto con los nuevos datos del producto.
   * @returns {Promise<Object|null>} El producto actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, producto) {
    try {
      if (await super.update(this.#tableName, id, producto)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un producto de la base de datos.
   * @param {number} id - ID del producto a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los productos de un tipo específico.
   * @param {number} tipo_producto_id - ID del tipo de producto.
   * @returns {Promise<Array>} Lista de productos filtrados por tipo.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByTipoProductoId(tipo_producto_id) {
    try {
      return await super.getByField(
        this.#tableName,
        "tipo_producto_id",
        tipo_producto_id
      );
    } catch (error) {
      throw new Error(
        `Error al obtener los productos por tipo: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los productos que tienen stock mayor a 0.
   * @returns {Promise<Array>} Lista de productos con stock positivo.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByStockPositivo() {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM ${this.#tableName} WHERE stock > 0 ORDER BY id DESC`
      );
      return rows;
    } catch (error) {
      throw new Error(
        `Error al obtener los productos con stock positivo: ${error.message}`
      );
    }
  }
}

export default Producto;
