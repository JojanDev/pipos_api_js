import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo Rol.
 * Extiende la funcionalidad de la clase base Modelo para interactuar
 * con la tabla "roles" en la base de datos.
 */
class Rol extends Modelo {
  #tableName = "roles"; // Nombre de la tabla asociada en la BD

  /**
   * Obtiene todos los roles de la base de datos.
   * @returns {Promise<Array>} Lista de todos los roles
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todos los roles: ${error.message}`);
    }
  }

  /**
   * Obtiene un rol específico por su ID.
   * @param {number} id - ID del rol
   * @returns {Promise<Object|null>} El rol encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(`Error al obtener el rol con ID ${id}: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo rol en la base de datos.
   * @param {Object} rol - Objeto con los datos del rol (ej. {nombre})
   * @returns {Promise<Object|null>} El rol creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(rol) {
    try {
      const idCreado = await super.create(this.#tableName, rol);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el rol: ${error.message}`);
    }
  }

  /**
   * Actualiza un rol existente en la base de datos.
   * @param {number} id - ID del rol a actualizar
   * @param {Object} rol - Objeto con los nuevos datos del rol
   * @returns {Promise<Object|null>} El rol actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, rol) {
    try {
      if (await super.update(this.#tableName, id, rol)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el rol con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un rol de la base de datos.
   * @param {number} id - ID del rol a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el rol con ID ${id}: ${error.message}`
      );
    }
  }
}

export default Rol;
