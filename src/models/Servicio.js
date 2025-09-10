// Importamos la conexión a la base de datos (aunque no se usa directamente aquí,
// puede ser útil si en un futuro extendemos la lógica específica de este modelo)
import connection from "../utils/db.js";

// Importamos la clase base "Modelo" que contiene métodos genéricos para operaciones CRUD
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de "Servicio".
 * Extiende de la clase base `Modelo` para aprovechar sus métodos genéricos.
 */
class Servicio extends Modelo {
  // Nombre de la tabla en la base de datos asociada a este modelo
  #tableName = "servicios";

  /**
   * Obtiene todos los registros de la tabla "servicios".
   * @returns {Promise<Array>} Lista de todos los servicios.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      // Llamamos al método genérico getAll de la clase padre (Modelo)
      return await super.getAll(this.#tableName);
    } catch (error) {
      // Si ocurre un error, lanzamos una excepción con un mensaje detallado
      throw new Error(`Error al obtener todos los servicios: ${error.message}`);
    }
  }

  /**
   * Obtiene un servicio específico por su ID.
   * @param {number} id - ID del servicio.
   * @returns {Promise<Object|null>} El servicio encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      // Llamamos al método genérico getById de la clase padre
      return await super.getById(this.#tableName, id);
    } catch (error) {
      // En caso de error, lanzamos una excepción detallada
      throw new Error(
        `Error al obtener el servicio con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo servicio en la base de datos.
   * @param {Object} servicio - Objeto con los datos del servicio (ej. {nombre, precio, etc.}).
   * @returns {Promise<Object|null>} El servicio creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(servicio) {
    try {
      // Creamos el servicio usando el método genérico create de la clase padre
      const idCreado = await super.create(this.#tableName, servicio);

      // Si se creó correctamente, retornamos el registro recién insertado
      if (idCreado) {
        return await this.getById(idCreado);
      }

      // Si no se pudo crear, retornamos null
      return null;
    } catch (error) {
      // Lanzamos error detallado en caso de fallo
      throw new Error(`Error al crear el servicio: ${error.message}`);
    }
  }

  /**
   * Actualiza un servicio existente en la base de datos.
   * @param {number} id - ID del servicio a actualizar.
   * @param {Object} servicio - Objeto con los nuevos datos del servicio.
   * @returns {Promise<Object|null>} El servicio actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, servicio) {
    try {
      // Usamos el método genérico update de la clase padre
      if (await super.update(this.#tableName, id, servicio)) {
        // Si la actualización fue exitosa, retornamos el servicio actualizado
        return await this.getById(id);
      }

      // Si no se actualizó, retornamos null
      return null;
    } catch (error) {
      // Error detallado en caso de fallo
      throw new Error(
        `Error al actualizar el servicio con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un servicio de la base de datos.
   * @param {number} id - ID del servicio a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      // Usamos el método genérico delete de la clase padre
      return await super.delete(this.#tableName, id);
    } catch (error) {
      // En caso de error, lanzamos excepción detallada
      throw new Error(
        `Error al eliminar el servicio con ID ${id}: ${error.message}`
      );
    }
  }
}

// Exportamos la clase Servicio para poder usarla en otras partes de la aplicación
export default Servicio;
