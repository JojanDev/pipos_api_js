import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo Tratamiento.
 * Gestiona los tratamientos médicos de las mascotas en la base de datos.
 * Extiende de la clase base Modelo, utilizando la tabla "tratamientos".
 */
class Tratamiento extends Modelo {
  #tableName = "tratamientos"; // Nombre de la tabla en la BD

  /**
   * Obtiene todos los tratamientos de la base de datos.
   * @returns {Promise<Array>} Lista de todos los tratamientos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los tratamientos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tratamiento específico por su ID.
   * @param {number} id - ID del tratamiento
   * @returns {Promise<Object|null>} El tratamiento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo tratamiento en la base de datos.
   * @param {Object} tratamiento - Objeto con los datos del tratamiento
   * @returns {Promise<Object|null>} El tratamiento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(tratamiento) {
    try {
      const idCreado = await super.create(this.#tableName, tratamiento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el tratamiento: ${error.message}`);
    }
  }

  /**
   * Actualiza un tratamiento existente.
   * @param {number} id - ID del tratamiento a actualizar
   * @param {Object} tratamiento - Objeto con los nuevos datos del tratamiento
   * @returns {Promise<Object|null>} El tratamiento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, tratamiento) {
    try {
      if (await super.update(this.#tableName, id, tratamiento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un tratamiento de la base de datos.
   * @param {number} id - ID del tratamiento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los tratamientos asociados a un antecedente específico.
   * @param {number} antecedente_id - ID del antecedente médico
   * @returns {Promise<Array>} Lista de tratamientos relacionados con ese antecedente
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByAntecedenteId(antecedente_id) {
    try {
      return await super.getByField(
        this.#tableName,
        "antecedente_id",
        antecedente_id
      );
    } catch (error) {
      throw new Error(
        `Error al obtener los tratamientos del antecedente con ID ${antecedente_id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los tratamientos asociados a una información de medicamento específica.
   * @param {number} info_medicamento_id - ID de la información del medicamento
   * @returns {Promise<Array>} Lista de tratamientos relacionados con esa información de medicamento
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
        `Error al obtener los tratamientos con información de medicamento ID ${info_medicamento_id}: ${error.message}`
      );
    }
  }
}

export default Tratamiento;
