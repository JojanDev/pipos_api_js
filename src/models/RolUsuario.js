import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de RolesUsuarios.
 * Maneja las operaciones CRUD relacionadas con la tabla "roles_usuarios".
 */
class RolUsuario extends Modelo {
  #tableName = "roles_usuarios";

  /**
   * Obtiene todos los registros de roles asignados a usuarios.
   * @returns {Promise<Array>} Lista de roles de usuarios.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(
        `Error al obtener todos los roles de usuarios: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un rol de usuario específico por su ID.
   * @param {number} id - ID del rol de usuario.
   * @returns {Promise<Object|null>} El rol de usuario encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener el rol de usuario con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Asigna un nuevo rol a un usuario en la base de datos.
   * @param {Object} rolUsuario - Objeto con los datos {usuario_id, rol_id}.
   * @returns {Promise<Object|null>} El rol asignado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(rolUsuario) {
    try {
      const idCreado = await super.create(this.#tableName, rolUsuario);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear el rol de usuario: ${error.message}`);
    }
  }

  /**
   * Actualiza un rol de usuario existente.
   * @param {number} id - ID del rol de usuario a actualizar.
   * @param {Object} rolUsuario - Objeto con los nuevos datos.
   * @returns {Promise<Object|null>} El rol de usuario actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, rolUsuario) {
    try {
      if (await super.update(this.#tableName, id, rolUsuario)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar el rol de usuario con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un rol de usuario de la base de datos.
   * @param {number} id - ID del rol de usuario a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar el rol de usuario con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Verifica si un usuario ya tiene asignado un rol específico.
   * @param {number} usuario_id - ID del usuario.
   * @param {number} rol_id - ID del rol.
   * @returns {Promise<Array>} Lista con los registros encontrados (vacía si no existe).
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getByRolUsuarioExists(usuario_id, rol_id) {
    try {
      return (
        await connection.query(
          `SELECT * FROM ${
            this.#tableName
          } WHERE usuario_id = ? AND rol_id = ?`,
          [usuario_id, rol_id]
        )
      )[0];
    } catch (error) {
      throw new Error(
        `Error al verificar existencia del rol ${rol_id} en el usuario ${usuario_id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todos los roles asignados a un usuario específico.
   * @param {number} usuarioId - ID del usuario.
   * @returns {Promise<Array>} Lista de roles del usuario.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAllByUsuarioId(usuarioId) {
    try {
      return await super.getByField(this.#tableName, "usuario_id", usuarioId);
    } catch (error) {
      throw new Error(
        `Error al obtener los roles del usuario con ID ${usuarioId}: ${error.message}`
      );
    }
  }
}

export default RolUsuario;
