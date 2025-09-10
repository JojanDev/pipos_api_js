import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de credenciales.
 * Encapsula las operaciones CRUD sobre la tabla `credenciales`.
 *
 * Hereda de la clase `Modelo`, que contiene los métodos genéricos
 * para interactuar con la base de datos.
 */
class Credencial extends Modelo {
  // Nombre de la tabla asociada en la base de datos
  #tableName = "credenciales";

  /**
   * Obtiene todas las credenciales de la base de datos.
   *
   * @returns {Promise<Array>} Lista de todas las credenciales registradas.
   * @throws {Error} Si ocurre un error en la consulta.
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
   * Obtiene una credencial específica por su ID.
   *
   * @param {number} id - ID de la credencial.
   * @returns {Promise<Object|null>} La credencial encontrada o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
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
   * Obtiene una credencial asociada a un usuario específico mediante su ID.
   *
   * @param {number} usuarioId - ID del usuario.
   * @returns {Promise<Object|null>} La credencial encontrada o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getByUsuarioId(usuarioId) {
    try {
      // Se obtiene el primer resultado, ya que un usuario debería tener solo una credencial
      return (
        await super.getByField(this.#tableName, "usuario_id", usuarioId)
      )[0];
    } catch (error) {
      throw new Error(
        `Error al obtener la credencial del usuario con ID ${usuarioId}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene una credencial específica buscando por el campo `usuario`.
   *
   * @param {string} usuario - Nombre de usuario asociado a la credencial.
   * @returns {Promise<Object|null>} La credencial encontrada o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
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
   * Crea una nueva credencial en la base de datos.
   *
   * @param {Object} credencial - Objeto con los datos de la credencial.
   * @returns {Promise<Object|null>} La credencial creada con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
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
   * Actualiza una credencial existente en la base de datos.
   *
   * @param {number} id - ID de la credencial a actualizar.
   * @param {Object} credencial - Objeto con los nuevos datos de la credencial.
   * @returns {Promise<Object|null>} La credencial actualizada o null si no existe.
   * @throws {Error} Si ocurre un error en la actualización.
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
   * Elimina una credencial de la base de datos.
   *
   * @param {number} id - ID de la credencial a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
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
}

export default Credencial;
