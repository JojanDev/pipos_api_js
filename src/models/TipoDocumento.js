import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que gestiona las operaciones relacionadas con la tabla `tipos_documentos`.
 * Extiende de la clase base Modelo para reutilizar las operaciones CRUD genéricas.
 */
class TipoDocumento extends Modelo {
  // Nombre de la tabla en la base de datos
  #tableName = "tipos_documentos";

  /**
   * Obtiene todos los tipos de documentos registrados en la base de datos.
   * @returns {Promise<Array>} Lista de objetos con los tipos de documentos.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los tipos de documentos: ${error.message}`
      );
    }
  }

  /**
   * Busca un tipo de documento específico por su ID.
   * @param {number} id - ID del tipo de documento.
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el tipo de documento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Inserta un nuevo tipo de documento en la base de datos.
   * @param {Object} tipoDocumento - Objeto con los datos del tipo de documento. Ej: { nombre: "CC" }.
   * @returns {Promise<Object|null>} El tipo de documento creado con su ID asignado, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(tipoDocumento) {
    try {
      const idCreado = await super.create(this.#tableName, tipoDocumento);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el tipo de documento: ${error.message}`);
    }
  }

  /**
   * Actualiza los datos de un tipo de documento existente.
   * @param {number} id - ID del tipo de documento a actualizar.
   * @param {Object} tipoDocumento - Objeto con los nuevos datos. Ej: { nombre: "Pasaporte" }.
   * @returns {Promise<Object|null>} El tipo de documento actualizado, o null si no existe.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, tipoDocumento) {
    try {
      if (await super.update(this.#tableName, id, tipoDocumento)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el tipo de documento con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un tipo de documento de la base de datos.
   * @param {number} id - ID del tipo de documento a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no existe.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el tipo de documento con ID ${id}: ${error.message}`
      );
    }
  }
}

export default TipoDocumento;
