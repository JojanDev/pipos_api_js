import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de Medicamentos en la base de datos.
 * Extiende de la clase genérica Modelo para reutilizar operaciones CRUD.
 */
class Medicamento extends Modelo {
  #tableName = "medicamentos"; // Nombre de la tabla en la base de datos

  /**
   * Obtiene todos los medicamentos de la base de datos.
   * @returns {Promise<Array>} Lista de todos los medicamentos.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los medicamentos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un medicamento específico por su ID.
   * @param {number} id - ID del medicamento.
   * @returns {Promise<Object|null>} El medicamento encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo medicamento en la base de datos.
   * @param {Object} medicamento - Objeto con los datos del medicamento.
   * @returns {Promise<Object|null>} El medicamento creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(medicamento) {
    try {
      const idCreado = await super.create(this.#tableName, medicamento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el medicamento: ${error.message}`);
    }
  }

  /**
   * Actualiza un medicamento existente.
   * @param {number} id - ID del medicamento a actualizar.
   * @param {Object} medicamento - Objeto con los nuevos datos del medicamento.
   * @returns {Promise<Object|null>} El medicamento actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, medicamento) {
    try {
      if (await super.update(this.#tableName, id, medicamento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un medicamento de la base de datos.
   * @param {number} id - ID del medicamento a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene medicamentos filtrados por número de lote.
   * @param {string} numero_lote - Número de lote del medicamento.
   * @returns {Promise<Array>} Lista de medicamentos con ese número de lote.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getByNumeroLote(numero_lote) {
    try {
      return await super.getByField(
        this.#tableName,
        "numero_lote",
        numero_lote
      );
    } catch (error) {
      throw new Error(
        `Error al obtener medicamentos por número de lote: ${error.message}`
      );
    }
  }

  /**
   * Obtiene medicamentos relacionados a un ID de información de medicamento.
   * @param {number} info_medicamento_id - ID de la información del medicamento.
   * @returns {Promise<Array>} Lista de medicamentos asociados.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByInfoMedicamentoId(info_medicamento_id) {
    try {
      return await super.getByField(
        this.#tableName,
        "info_medicamento_id",
        info_medicamento_id
      );
    } catch (error) {
      throw new Error(
        `Error al obtener medicamentos por info_medicamento_id: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los medicamentos cuya cantidad sea mayor a cero.
   * @returns {Promise<Array>} Lista de medicamentos con stock positivo.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByCantidadPositiva() {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM ${this.#tableName} WHERE cantidad > 0 ORDER BY id DESC`
      );
      return rows;
    } catch (error) {
      throw new Error(
        `Error al obtener medicamentos con cantidad positiva: ${error.message}`
      );
    }
  }
}

export default Medicamento;
