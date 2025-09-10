import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de la tabla "especies".
 * Hereda de la clase base Modelo para aprovechar los métodos genéricos de CRUD.
 */
class Especie extends Modelo {
  // Nombre de la tabla asociada en la base de datos
  #tableName = "especies";

  /**
   * Obtiene todas las especies de mascotas de la base de datos.
   *
   * @returns {Promise<Array>} Lista de todas las especies.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todas las especies de mascotas: ${error.message}`
      );
    }
  }

  /**
   * Obtiene una especie específica por su ID.
   *
   * @param {number} id - ID de la especie.
   * @returns {Promise<Object|null>} La especie encontrada o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la especie de mascota ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea una nueva especie en la base de datos.
   *
   * @param {Object} especie - Objeto con los datos de la especie (ej: { nombre }).
   * @returns {Promise<Object|null>} La especie creada con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(especie) {
    try {
      // Insertamos la especie y recuperamos el ID generado
      const idCreado = await super.create(this.#tableName, especie);

      // Si se creó correctamente, devolvemos la especie recién insertada
      if (idCreado) {
        return await this.getById(idCreado);
      }

      return null;
    } catch (error) {
      throw new Error(`Error al crear la especie de mascota: ${error.message}`);
    }
  }

  /**
   * Actualiza una especie existente.
   *
   * @param {number} id - ID de la especie a actualizar.
   * @param {Object} especie - Objeto con los nuevos datos de la especie.
   * @returns {Promise<Object|null>} La especie actualizada, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, especie) {
    try {
      // Si la actualización fue exitosa, devolvemos la especie actualizada
      if (await super.update(this.#tableName, id, especie)) {
        return await this.getById(id);
      }

      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la especie de mascota con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina una especie de la base de datos.
   *
   * @param {number} id - ID de la especie a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la especie de mascota con ID ${id}: ${error.message}`
      );
    }
  }
}

export default Especie;
