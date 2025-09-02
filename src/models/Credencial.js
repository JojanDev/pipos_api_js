import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

class Credencial extends Modelo {
  #tableName = "credenciales";

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
        `Error al obtener todas las credenciales: ${error.message}`
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
        `Error al obtener la credencial con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de documento específico por su ID
   * @param {number} usuarioId - ID del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByUsuarioId(usuarioId) {
    try {
      return (await super.getByField(this.#tableName, "usuario_id", usuarioId))[0];
    } catch (error) {
      throw new Error(
        `Error al obtener la credencial del usuario con ID ${usuarioId}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de documento específico por su ID
   * @param {number} usuario - ID del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByUsuario(usuario) {
    try {
      return (await super.getByField(this.#tableName, "usuario", usuario))[0];
    } catch (error) {
      throw new Error(
        `Error al obtener la credencial con el usuario "${usuario}": ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo tipo de documento en la base de datos
   * @param {Object} credencial - Objeto con los datos del tipo de documento {nombre}
   * @returns {Promise<Object|null>} El tipo de documento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(credencial) {
    try {
      const idCreado = await super.create(this.#tableName, credencial);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la credencial: ${error.message}`);
    }
  }

  /**
   * Actualiza un tipo de documento existente
   * @param {number} id - ID del tipo de documento a actualizar
   * @param {Object} credencial - Objeto con los nuevos datos del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, credencial) {
    try {
      if (await super.update(this.#tableName, id, credencial)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la credencial con ID ${id}: ${error.message}`
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
        `Error al eliminar la credencial con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de documento específico por su ID
   * @param {number} id - ID del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByUsuarioId(usuario_id) {
    try {
      return await super.getByField(this.#tableName, "usuario_id", usuario_id);
    } catch (error) {
      throw new Error(
        `Error al obtener la credencial del usuario con ID ${usuario_id}: ${error.message}`
      );
    }
  }
}

export default Credencial;
