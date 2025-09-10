import connection from "../utils/db.js";
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de mascotas.
 * Hereda métodos genéricos de la clase Modelo y los especializa
 * para interactuar con la tabla `mascotas`.
 */
class Mascota extends Modelo {
  #tableName = "mascotas";

  /**
   * Obtiene todas las mascotas registradas en la base de datos.
   * @returns {Promise<Array>} Lista de todas las mascotas
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAll() {
    try {
      return await super.getAll(this.#tableName);
    } catch (error) {
      throw new Error(`Error al obtener todas las mascotas: ${error.message}`);
    }
  }

  /**
   * Obtiene una mascota específica por su ID.
   * @param {number} id - ID de la mascota
   * @returns {Promise<Object|null>} La mascota encontrada o null si no existe
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getById(id) {
    try {
      return await super.getById(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al obtener la mascota con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea una nueva mascota en la base de datos.
   * @param {Object} mascota - Objeto con los datos de la mascota (ejemplo: { nombre, edad, especie_id, raza_id, usuario_id })
   * @returns {Promise<Object|null>} La mascota creada con su ID, o null si falló
   * @throws {Error} Si ocurre un error en la inserción
   */
  async create(mascota) {
    try {
      const idCreado = await super.create(this.#tableName, mascota);
      if (idCreado) {
        return await this.getById(idCreado);
      }
      return null;
    } catch (error) {
      throw new Error(`Error al crear la mascota: ${error.message}`);
    }
  }

  /**
   * Actualiza una mascota existente.
   * @param {number} id - ID de la mascota a actualizar
   * @param {Object} mascota - Objeto con los nuevos datos de la mascota
   * @returns {Promise<Object|null>} La mascota actualizada, o null si no existe
   * @throws {Error} Si ocurre un error en la actualización
   */
  async update(id, mascota) {
    try {
      if (await super.update(this.#tableName, id, mascota)) {
        return await this.getById(id);
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la mascota con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina una mascota de la base de datos.
   * @param {number} id - ID de la mascota a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no
   * @throws {Error} Si ocurre un error en la eliminación
   */
  async delete(id) {
    try {
      return await super.delete(this.#tableName, id);
    } catch (error) {
      throw new Error(
        `Error al eliminar la mascota con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las mascotas asociadas a un usuario.
   * @param {number} usuario_id - ID del usuario propietario
   * @returns {Promise<Array>} Lista de mascotas del usuario
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByUsuarioId(usuario_id) {
    try {
      return await super.getByField(this.#tableName, "usuario_id", usuario_id);
    } catch (error) {
      throw new Error(
        `Error al obtener las mascotas del usuario con ID ${usuario_id}: ${error.message}`
      );
    }
  }

  /**
   * Obtiene todas las mascotas de una raza específica.
   * @param {number} raza_id - ID de la raza
   * @returns {Promise<Array>} Lista de mascotas de esa raza
   * @throws {Error} Si ocurre un error en la consulta
   */
  async getAllByRazaId(raza_id) {
    try {
      return await super.getByField(this.#tableName, "raza_id", raza_id);
    } catch (error) {
      throw new Error(
        `Error al obtener las mascotas de la raza con ID ${raza_id}: ${error.message}`
      );
    }
  }
}

export default Mascota;
