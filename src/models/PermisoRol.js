import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Modelo para gestionar la relación entre permisos y roles en la base de datos.
 * Permite consultar, crear, actualizar y eliminar asignaciones de permisos a roles.
 */
class PermisoRol extends Modelo {
  #tableName = "permisos_roles";

  /**
   * Obtiene todos los registros de permisos-roles en la base de datos.
   * @returns {Promise<Array>} Lista de todos los permisos-roles
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los permisos de roles: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un registro de permiso-rol por su ID.
   * @param {number} id - ID del permiso-rol
   * @returns {Promise<Object|null>} El permiso-rol encontrado o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el permiso de rol con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Verifica si ya existe una relación entre un rol y un permiso.
   * @param {number} rolId - ID del rol
   * @param {number} permisoId - ID del permiso
   * @returns {Promise<Array>} Lista de coincidencias (vacía si no existe la relación)
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getByPermisoRolExists(rolId, permisoId) {
    try {
      const [rows] = await connection.query(
        `SELECT * FROM ${this.#tableName} WHERE rol_id = ? AND permiso_id = ?`,
        [rolId, permisoId]
      );
      return rows;
    } catch (error) {
      throw new Error(
        `Error al verificar existencia de permiso-rol (rolId=${rolId}, permisoId=${permisoId}): ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo permiso-rol en la base de datos.
   * @param {Object} permisoRol - Objeto con los datos del permiso-rol { rol_id, permiso_id }
   * @returns {Promise<Object|null>} El permiso-rol creado con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(permisoRol) {
    try {
      const idCreado = await super.create(this.#tableName, permisoRol);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el permiso de rol: ${error.message}`);
    }
  }

  /**
   * Actualiza un permiso-rol existente.
   * @param {number} id - ID del permiso-rol a actualizar
   * @param {Object} permisoRol - Objeto con los nuevos datos del permiso-rol
   * @returns {Promise<Object|null>} El permiso-rol actualizado, o null si falló
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, permisoRol) {
    try {
      if (await super.update(this.#tableName, id, permisoRol)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el permiso de rol con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un permiso-rol de la base de datos.
   * @param {number} id - ID del permiso-rol a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el permiso de rol con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los permisos asociados a un rol específico.
   * @param {number} rolId - ID del rol
   * @returns {Promise<Array>} Lista de permisos asociados al rol
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByRolId(rolId) {
    try {
      return await super.getByField(this.#tableName, "rol_id", rolId);
    } catch (error) {
      throw new Error(
        `Error al obtener los permisos del rol con ID ${rolId}: ${error.message}`
      );
    }
  }
}

export default PermisoRol;
