import connection from "../utils/db.js"; // Conexión a la base de datos
import Modelo from "./Modelo.js"; // Clase base genérica para modelos

/**
 * Modelo que representa la tabla "antecedentes".
 * Hereda de la clase genérica Modelo y extiende con métodos
 * específicos relacionados a los antecedentes de una mascota.
 */
class Antecedente extends Modelo {
  // Nombre de la tabla en la base de datos (privado)
  #tableName = "antecedentes";

  /**
   * Obtiene todos los antecedentes de la base de datos.
   *
   * @returns {Promise<Array>} Lista de todos los antecedentes.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los antecedentes: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un antecedente específico por su ID.
   *
   * @param {number} id - ID del antecedente.
   * @returns {Promise<Object|null>} El antecedente encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el antecedente con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo antecedente en la base de datos.
   *
   * @param {Object} antecedente - Objeto con los datos del antecedente.
   * @returns {Promise<Object|null>} El antecedente creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(antecedente) {
    try {
      const idCreado = await super.create(this.#tableName, antecedente);

      if (idCreado) {
        return await this.getById(idCreado); // Retorna el registro recién creado
      }

      return null;
    } catch (error) {
      throw new Error(`Error al crear el antecedente: ${error.message}`);
    }
  }

  /**
   * Actualiza un antecedente existente.
   *
   * @param {number} id - ID del antecedente a actualizar.
   * @param {Object} antecedente - Objeto con los nuevos datos del antecedente.
   * @returns {Promise<Object|null>} El antecedente actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, antecedente) {
    try {
      if (await super.update(this.#tableName, id, antecedente)) {
        return await this.getById(id); // Devuelve el registro actualizado
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el antecedente con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un antecedente de la base de datos.
   *
   * @param {number} id - ID del antecedente a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el antecedente con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los antecedentes de una mascota.
   *
   * @param {number} mascotaId - ID de la mascota.
   * @returns {Promise<Array>} Lista de antecedentes asociados a la mascota.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByMascotaId(mascotaId) {
    try {
      return await super.getByField(this.#tableName, "mascota_id", mascotaId);
    } catch (error) {
      throw new Error(
        `Error al obtener los antecedentes de la mascota con ID ${mascotaId}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene la fecha del último antecedente registrado para una mascota.
   *
   * @param {number} mascotaId - ID de la mascota.
   * @returns {Promise<Object|null>} Objeto con la fecha del último antecedente o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getUltimoByMascotaId(mascotaId) {
    try {
      const [row] = await connection.query(
        `SELECT fecha_creado 
         FROM ${this.#tableName} 
         WHERE mascota_id = ? 
         ORDER BY fecha_creado DESC 
         LIMIT 1`,
        [mascotaId]
      );

      return row[0] || null;
    } catch (error) {
      throw new Error(
        `Error al obtener la fecha del último antecedente de la mascota con ID ${mascotaId}: ${error.message}`
      );
    }
  }
}

export default Antecedente;
