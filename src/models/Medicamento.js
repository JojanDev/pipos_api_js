import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

class Medicamento extends Modelo {
  #tableName = "medicamentos";

  /**
   * Obtiene todos los tipos de documentos de la base de datos
   * @returns {Promise<Array>} Lista de todos los tipos de documentos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todas los medicamentos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de documento específico por su ID
   * @param {number} id - ID del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
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
   * Crea un nuevo tipo de documento en la base de datos
   * @param {Object} medicamento - Objeto con los datos del tipo de documento {nombre}
   * @returns {Promise<Object|null>} El tipo de documento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
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
   * Actualiza un tipo de documento existente
   * @param {number} id - ID del tipo de documento a actualizar
   * @param {Object} medicamento - Objeto con los nuevos datos del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
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
   * Elimina un tipo de documento de la base de datos
   * @param {number} id - ID del tipo de documento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
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
   * Obtiene todos los tipos de documentos de la base de datos
   * @returns {Promise<Array>} Lista de todos los tipos de documentos
   * @throws {Error} Si ocurre un error en la consulta
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
        `Error al obtener todas los medicamentos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los tipos de documentos de la base de datos
   * @returns {Promise<Array>} Lista de todos los tipos de documentos
   * @throws {Error} Si ocurre un error en la consulta
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
        `Error al obtener todas los medicamentos: ${error.message}`
      );
    }
  }
}

export default Medicamento;
