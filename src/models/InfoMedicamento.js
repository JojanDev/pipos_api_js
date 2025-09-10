import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de información de medicamentos.
 * Hereda métodos genéricos de la clase Modelo y los especializa
 * para interactuar con la tabla `info_medicamentos`.
 */
class InfoMedicamento extends Modelo {
  #tableName = "info_medicamentos";

  /**
   * Obtiene todos los registros de información de medicamentos.
   * @returns {Promise<Array>} Lista de todos los medicamentos registrados
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener toda la información de medicamentos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un registro de información de medicamento por su ID.
   * @param {number} id - ID del medicamento
   * @returns {Promise<Object|null>} El medicamento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la información del medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo registro de información de medicamento en la base de datos.
   * @param {Object} infoMedicamento - Objeto con los datos del medicamento (ejemplo: { nombre, descripcion, dosis })
   * @returns {Promise<Object|null>} El medicamento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(infoMedicamento) {
    try {
      const idCreado = await super.create(this.#tableName, infoMedicamento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al crear la información de medicamento: ${error.message}`
      );
    }
  }

  /**
   * Actualiza un registro de información de medicamento existente.
   * @param {number} id - ID del medicamento a actualizar
   * @param {Object} infoMedicamento - Objeto con los nuevos datos del medicamento
   * @returns {Promise<Object|null>} El medicamento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, infoMedicamento) {
    try {
      if (await super.update(this.#tableName, id, infoMedicamento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la información del medicamento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un registro de información de medicamento de la base de datos.
   * @param {number} id - ID del medicamento a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la información de medicamento con ID ${id}: ${error.message}`
      );
    }
  }
}

export default InfoMedicamento;
