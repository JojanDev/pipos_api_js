import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

class Usuario extends Modelo {
  #tableName = "usuarios";

  /**
   * Obtiene todos los tipos de documentos de la base de datos
   * @returns {Promise<Array>} Lista de todos los tipos de documentos
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
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
        `Error al obtener el usuario con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de documento específico por su ID
   * @param {number} documento - ID del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByDocumento(documento) {
    try {
      return (await super.getByField(this.#tableName, "numero_documento", documento))[0];
    } catch (error) {
      throw new Error(
        `Error al obtener el usuario con el numero de documento ${documento}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo tipo de documento en la base de datos
   * @param {Object} usuario - Objeto con los datos del tipo de documento {nombre}
   * @returns {Promise<Object|null>} El tipo de documento creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(usuario) {
    try {
      const idCreado = await super.create(this.#tableName, usuario);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  /**
   * Actualiza un tipo de documento existente
   * @param {number} id - ID del tipo de documento a actualizar
   * @param {Object} usuario - Objeto con los nuevos datos del tipo de documento
   * @returns {Promise<Object|null>} El tipo de documento actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, usuario) {
    try {
      if (await super.update(this.#tableName, id, usuario)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el usuario con ID ${id}: ${error.message}`
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
        `Error al eliminar el usuario con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Método para obtener un usuario por su documento
   *
   * @param {Number} usuario Documento del usuario
   * @returns {Object} Objeto usuario
   */
  async getByUsuario(usuario) {
    try {
      return (await super.getByField(this.#tableName, "usuario", usuario))[0];
    } catch (error) {
      throw new Error(
        `Error al obtener el usuario "${usuario}": ${error.message}`
      );
    }
  }
}

export default Usuario;
