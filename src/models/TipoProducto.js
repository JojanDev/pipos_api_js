// Importamos la conexión a la base de datos (aunque no se usa directamente aquí,
// puede ser útil si en un futuro se extiende la lógica particular de este modelo)
import connection from "../utils/db.js";

// Importamos la clase base "Modelo" que contiene métodos genéricos CRUD
import Modelo from "./Modelo.js";

/**
 * Clase que representa el modelo de "TipoProducto".
 * Extiende de la clase base `Modelo` para reutilizar la lógica genérica.
 */
class TipoProducto extends Modelo {
  // Nombre de la tabla en la base de datos asociada a este modelo
  #tableName = "tipos_productos";

  /**
   * Obtiene todos los tipos de productos de la base de datos.
   * @returns {Promise<Array>} Lista de todos los tipos de productos.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getAll() {
    try {
      // Llamamos al método genérico getAll de la clase padre (Modelo)
      return await super.getAll(this.#tableName);
    } catch (error) {
      // Si ocurre un error, lanzamos excepción con detalle
      throw new Error(
        `Error al obtener todos los tipos de productos: ${error.message}`
      );
    }
  }

  /**
   * Obtiene un tipo de producto específico por su ID.
   * @param {number} id - ID del tipo de producto.
   * @returns {Promise<Object|null>} El tipo de producto encontrado o null si no existe.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  async getById(id) {
    try {
      // Usamos el método genérico getById de la clase padre
      return await super.getById(this.#tableName, id);
    } catch (error) {
      // En caso de fallo, lanzamos excepción detallada
      throw new Error(
        `Error al obtener el tipo de producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Crea un nuevo tipo de producto en la base de datos.
   * @param {Object} tipoProducto - Objeto con los datos del tipo de producto (ej. {nombre}).
   * @returns {Promise<Object|null>} El tipo de producto creado con su ID, o null si falló.
   * @throws {Error} Si ocurre un error en la inserción.
   */
  async create(tipoProducto) {
    try {
      // Insertamos el nuevo registro usando el método create de la clase padre
      const idCreado = await super.create(this.#tableName, tipoProducto);

      // Si se creó correctamente, buscamos y retornamos el registro creado
      if (idCreado) {
        return await this.getById(idCreado);
      }

      // Si no se pudo crear, retornamos null
      return null;
    } catch (error) {
      // Lanzamos error detallado si ocurre un problema en la inserción
      throw new Error(`Error al crear el tipo de producto: ${error.message}`);
    }
  }

  /**
   * Actualiza un tipo de producto existente.
   * @param {number} id - ID del tipo de producto a actualizar.
   * @param {Object} tipoProducto - Objeto con los nuevos datos del tipo de producto.
   * @returns {Promise<Object|null>} El tipo de producto actualizado, o null si falló.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  async update(id, tipoProducto) {
    try {
      // Llamamos al método update genérico de la clase padre
      if (await super.update(this.#tableName, id, tipoProducto)) {
        // Retornamos el registro actualizado si la operación fue exitosa
        return await this.getById(id);
      }

      // Si no se pudo actualizar, retornamos null
      return null;
    } catch (error) {
      // Error detallado en caso de fallo
      throw new Error(
        `Error al actualizar el tipo de producto con ID ${id}: ${error.message}`
      );
    }
  }

  /**
   * Elimina un tipo de producto de la base de datos.
   * @param {number} id - ID del tipo de producto a eliminar.
   * @returns {Promise<boolean>} true si se eliminó correctamente, false si no.
   * @throws {Error} Si ocurre un error en la eliminación.
   */
  async delete(id) {
    try {
      // Llamamos al método delete genérico de la clase padre
      return await super.delete(this.#tableName, id);
    } catch (error) {
      // En caso de error, lanzamos excepción detallada
      throw new Error(
        `Error al eliminar el tipo de producto con ID ${id}: ${error.message}`
      );
    }
  }
}

// Exportamos la clase TipoProducto para usarla en otras partes del proyecto
export default TipoProducto;
