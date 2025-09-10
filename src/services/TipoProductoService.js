import TipoProducto from "../models/TipoProducto.js";
import ProductoService from "./ProductoService.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los tipos de productos de la veterinaria.
 *
 * Se apoya en el modelo `TipoProducto` para interactuar con la base de datos
 * y en `ProductoService` para validar relaciones con productos asociados.
 */
class TipoProductoService {
  // Instancia única del modelo TipoProducto
  static objTipoProducto = new TipoProducto();

  /**
   * Obtiene todos los tipos de productos registrados.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllTiposProductos() {
    try {
      const tiposProductos = await this.objTipoProducto.getAll();

      if (!tiposProductos || tiposProductos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tipos de productos registradas",
        };

      return {
        error: false,
        code: 200,
        message: "Tipos de productos obtenidos correctamente",
        data: tiposProductos,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un tipo de producto por su ID.
   * @param {number} id - Identificador del tipo de producto
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getTipoProductoById(id) {
    try {
      const tipoProducto = await this.objTipoProducto.getById(id);

      if (!tipoProducto)
        return {
          error: true,
          code: 404,
          message: "Tipo de producto no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de producto obtenido correctamente",
        data: tipoProducto,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo tipo de producto.
   * @param {Object} tipoProducto - Datos del tipo de producto a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createTipoProducto(tipoProducto) {
    try {
      const tipoProductoCreado = await this.objTipoProducto.create(
        tipoProducto
      );

      if (tipoProductoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de producto",
        };

      return {
        error: false,
        code: 201,
        message: "Tipo de producto creado correctamente",
        data: tipoProductoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un tipo de producto existente.
   * @param {number} id - ID del tipo de producto a actualizar
   * @param {Object} tipoProducto - Nuevos datos del tipo de producto
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateTipoProducto(id, tipoProducto) {
    try {
      const existente = await this.objTipoProducto.getById(id);

      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Tipo de producto no encontrado",
        };
      }

      const tipoProductoActualizado = await this.objTipoProducto.update(
        id,
        tipoProducto
      );

      if (tipoProductoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de producto",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de producto actualizado correctamente",
        data: tipoProductoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un tipo de producto, previa validación de productos asociados.
   * @param {number} id - ID del tipo de producto a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteTipoProducto(id) {
    try {
      // Validamos que el tipo de producto exista
      const tipoProductoExistente = await this.getTipoProductoById(id);
      if (tipoProductoExistente.error) return tipoProductoExistente;

      // Validamos que no existan productos asociados
      const productosAsociados =
        await ProductoService.getAllProductosByTipoProductoId(id);

      if (!productosAsociados.error)
        return {
          error: true,
          code: 400,
          message:
            "Error al eliminar el tipo de producto, tiene productos asociados",
        };

      // Eliminamos el tipo de producto
      const tipoProductoEliminado = await this.objTipoProducto.delete(id);

      if (!tipoProductoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el tipo de producto",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de producto eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default TipoProductoService;
