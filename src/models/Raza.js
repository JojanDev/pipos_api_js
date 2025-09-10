import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de Razas en la base de datos.
 * Extiende de la clase genérica Modelo para reutilizar operaciones CRUD.
 */
class Raza extends Modelo {
  #tableName = "razas"; // Nombre de la tabla en la base de datos

  /**
   * Obtiene todas las razas de la base de datos.
   * @returns {Promise<Array>} Lista de todas las razas.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todas las razas: ${error.message}`);
    }
  }

  /**
   * Obtiene una raza específica por su ID.
   * @param {number} id - ID de la raza.
   * @returns {Promise<Object|null>} La raza encontrada o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la raza con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea una nueva raza en la base de datos.
   * @param {Object} raza - Objeto con los datos de la raza (ejemplo: {nombre, especie_id}).
   * @returns {Promise<Object|null>} La raza creada con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(raza) {
    try {
      const idCreado = await super.create(this.#tableName, raza);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la raza: ${error.message}`);
    }
  }

  /**
   * Actualiza una raza existente.
   * @param {number} id - ID de la raza a actualizar.
   * @param {Object} raza - Objeto con los nuevos datos de la raza.
   * @returns {Promise<Object|null>} La raza actualizada, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, raza) {
    try {
      if (await super.update(this.#tableName, id, raza)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la raza con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina una raza de la base de datos.
   * @param {number} id - ID de la raza a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la raza con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las razas pertenecientes a una especie.
   * @param {number} especie_id - ID de la especie.
   * @returns {Promise<Array>} Lista de razas de la especie indicada.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByEspecieId(especie_id) {
    try {
      return await super.getByField(this.#tableName, "especie_id", especie_id);
    } catch (error) {
      throw new Error(
        `Error al obtener las razas de la especie con ID ${especie_id}: ${error.message}`
      );
    }
  }
}

export default Raza;
