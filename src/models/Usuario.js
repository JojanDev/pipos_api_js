// Importamos la conexión a la base de datos (aunque no se usa directamente, es útil para futuras extensiones)
import connection from "../utils/db.js";

// Importamos la clase base "Modelo" que contiene la lógica genérica CRUD
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de "Usuario".
 * Extiende de la clase base `Modelo` para reutilizar métodos genéricos.
 */
class Usuario extends Modelo {
  // Nombre de la tabla asociada a este modelo
  #tableName = "usuarios";

  /**
   * Obtiene todos los usuarios de la base de datos.
   * @returns {Promise<Array>} Lista de todos los usuarios.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param {number} id - ID del usuario.
   * @returns {Promise<Object|null>} Usuario encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
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
   * Obtiene un usuario por su número de documento.
   * @param {number|string} documento - Número de documento del usuario.
   * @returns {Promise<Object|null>} Usuario encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getByDocumento(documento) {
    try {
      return (
        await super.getByField(this.#tableName, "numero_documento", documento)
      )[0];
    } catch (error) {
      throw new Error(
        `Error al obtener el usuario con el número de documento ${documento}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} usuario - Objeto con los datos del usuario (ej. {nombre, usuario, numero_documento}).
   * @returns {Promise<Object|null>} Usuario creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
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
   * Actualiza un usuario existente.
   * @param {number} id - ID del usuario a actualizar.
   * @param {Object} usuario - Objeto con los nuevos datos del usuario.
   * @returns {Promise<Object|null>} Usuario actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
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
   * Elimina un usuario de la base de datos.
   * @param {number} id - ID del usuario a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
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
   * Obtiene un usuario por su nombre de usuario (campo "usuario").
   * @param {string} usuario - Nombre de usuario.
   * @returns {Promise<Object|null>} Usuario encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
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

// Exportamos la clase Usuario para usarla en otras partes del proyecto
export default Usuario;
