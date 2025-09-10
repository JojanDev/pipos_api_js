import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo ServicioVenta.
 * Gestiona la relación entre servicios y ventas en la base de datos.
 * Extiende de la clase base Modelo, utilizando la tabla "servicios_ventas".
 */
class ServicioVenta extends Modelo {
  #tableName = "servicios_ventas"; // Nombre de la tabla en la BD

  /**
   * Obtiene todas las ventas de servicios de la base de datos.
   * @returns {Promise<Array>} Lista de todas las ventas de servicios
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todas las ventas de servicios: ${error.message}`
      );
    }
  }

  /**
   * Obtiene una venta de servicio específica por su ID.
   * @param {number} id - ID de la venta de servicio
   * @returns {Promise<Object|null>} La venta de servicio encontrada o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la venta del servicio con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea una nueva venta de servicio en la base de datos.
   * @param {Object} servicioVenta - Objeto con los datos de la venta del servicio
   * @returns {Promise<Object|null>} La venta creada con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(servicioVenta) {
    try {
      const idCreado = await super.create(this.#tableName, servicioVenta);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la venta del servicio: ${error.message}`);
    }
  }

  /**
   * Actualiza una venta de servicio existente.
   * @param {number} id - ID de la venta de servicio a actualizar
   * @param {Object} servicioVenta - Objeto con los nuevos datos de la venta del servicio
   * @returns {Promise<Object|null>} La venta actualizada, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, servicioVenta) {
    try {
      if (await super.update(this.#tableName, id, servicioVenta)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la venta del servicio con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina una venta de servicio de la base de datos.
   * @param {number} id - ID de la venta de servicio a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la venta del servicio con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las ventas de servicios asociadas a un ID de venta.
   * @param {number} venta_id - ID de la venta
   * @returns {Promise<Array>} Lista de servicios vendidos en esa venta
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByVentaId(venta_id) {
    try {
      return await super.getByField(this.#tableName, "venta_id", venta_id);
    } catch (error) {
      throw new Error(
        `Error al obtener los servicios vendidos en la venta con ID ${venta_id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las ventas de servicios asociadas a un ID de servicio.
   * @param {number} servicio_id - ID del servicio
   * @returns {Promise<Array>} Lista de ventas en las que se incluyó este servicio
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByServicioId(servicio_id) {
    try {
      return await super.getByField(
        this.#tableName,
        "servicio_id",
        servicio_id
      );
    } catch (error) {
      throw new Error(
        `Error al obtener las ventas asociadas al servicio con ID ${servicio_id}: ${error.message}`
      );
    }
  }
}

export default ServicioVenta;
