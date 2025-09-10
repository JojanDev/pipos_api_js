import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

class MedicamentoTratamiento extends Modelo {
  #tableName = "medicamentos_tratamientos";

  /**
   * Obtiene todos los medicamentos de tratamientos de la base de datos
   * @returns {Promise<Array>} Lista de todos los medicamentos de tratamientos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los medicamentos de tratamientos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un medicamento de tratamiento específico por su ID
   * @param {number} id - ID del medicamento de tratamiento
   * @returns {Promise<Object|null>} El medicamento de tratamiento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el medicamento de tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo medicamento asociado a un tratamiento en la base de datos
   * @param {Object} medicamentoTratamiento - Objeto con los datos del medicamento de tratamiento
   * @returns {Promise<Object|null>} El medicamento de tratamiento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(medicamentoTratamiento) {
    try {
      const idCreado = await super.create(
        this.#tableName,
        medicamentoTratamiento
      );
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al crear el medicamento de tratamiento: ${error.message}`
      );
    }
  }

  /**
   * Actualiza un medicamento de tratamiento existente
   * @param {number} id - ID del medicamento de tratamiento a actualizar
   * @param {Object} medicamentoTratamiento - Objeto con los nuevos datos del medicamento de tratamiento
   * @returns {Promise<Object|null>} El medicamento de tratamiento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, medicamentoTratamiento) {
    try {
      if (await super.update(this.#tableName, id, medicamentoTratamiento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el medicamento de tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un medicamento de tratamiento de la base de datos
   * @param {number} id - ID del medicamento de tratamiento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el medicamento de tratamiento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los medicamentos asociados a un tratamiento específico
   * @param {number} tratamientoId - ID del tratamiento
   * @returns {Promise<Array>} Lista de medicamentos del tratamiento
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByTratamientoId(tratamientoId) {
    try {
      return await super.getByField(
        this.#tableName,
        "tratamiento_id",
        tratamientoId
      );
    } catch (error) {
      throw new Error(
        `Error al obtener los medicamentos del tratamiento ${tratamientoId}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los registros de medicamentos asociados a una información de medicamento
   * @param {number} infoMedicamentoId - ID de la información del medicamento
   * @returns {Promise<Array>} Lista de tratamientos que usan ese medicamento
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByInfoMedicamentoId(infoMedicamentoId) {
    try {
      return await super.getByField(
        this.#tableName,
        "info_medicamento_id",
        infoMedicamentoId
      );
    } catch (error) {
      throw new Error(
        `Error al obtener los tratamientos que usan el medicamento ${infoMedicamentoId}: ${error.message}`
      );
    }
  }
}

export default MedicamentoTratamiento;
