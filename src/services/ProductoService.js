import Producto from "../models/Producto.js";
import TipoProductoService from "./TipoProductoService.js";

/**
 * Servicio para gestionar productos.
 * Incluye métodos CRUD y consultas por tipo de producto y stock.
 */
class ProductoService {
  static objProducto = new Producto();

  /**
   * Obtiene todos los productos registrados.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllProductos() {
    try {
      const productos = await this.objProducto.getAll();

      if (!productos || productos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay productos registrados",
          data: null,
        };

      // Incluye información del tipo de producto en cada producto
      const infoProductos = await Promise.all(
        productos.map(async (producto) => {
          const { data: tipoProducto } =
            await TipoProductoService.getTipoProductoById(
              producto.tipo_producto_id
            );
          return { ...producto, tipo_producto: tipoProducto.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: infoProductos,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene un producto por su ID.
   * @param {number} id - ID del producto.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getProductoById(id) {
    try {
      const producto = await this.objProducto.getById(id);

      if (!producto)
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Producto obtenido correctamente",
        data: producto,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo producto.
   * Valida que exista el tipo de producto asociado.
   * @param {Object} producto - Datos del producto a crear.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createProducto(producto) {
    try {
      const tipoProductoExistente =
        await TipoProductoService.getTipoProductoById(
          producto.tipo_producto_id
        );
      if (tipoProductoExistente.error) return tipoProductoExistente;

      const productoCreado = await this.objProducto.create(producto);
      if (!productoCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Producto",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Producto creado correctamente",
        data: productoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un producto existente.
   * @param {number} id - ID del producto a actualizar.
   * @param {Object} producto - Nuevos datos del producto.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateProducto(id, producto) {
    try {
      const existente = await this.objProducto.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
          data: null,
        };

      const productoActualizado = await this.objProducto.update(id, producto);
      if (!productoActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Producto",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Producto actualizado correctamente",
        data: productoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un producto por su ID.
   * @param {number} id - ID del producto a eliminar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteProducto(id) {
    try {
      const producto = await this.objProducto.getById(id);
      if (!producto)
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
          data: null,
        };

      const productoEliminado = await this.objProducto.delete(id);
      if (!productoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Producto",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Producto eliminado correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los productos de un tipo de producto específico.
   * @param {number} tipo_producto_id - ID del tipo de producto.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllProductosByTipoProductoId(tipo_producto_id) {
    try {
      const productos = await this.objProducto.getAllByTipoProductoId(
        tipo_producto_id
      );

      if (!productos || productos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay productos registrados para el tipo",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: productos,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los productos que tienen stock positivo.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllProductosByStockPositivo() {
    try {
      const productos = await this.objProducto.getAllByStockPositivo();

      if (!productos || productos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay productos registrados con stock positivo",
          data: null,
        };

      // Incluye información del tipo de producto en cada producto
      const infoProductos = await Promise.all(
        productos.map(async (producto) => {
          const { data: tipoProducto } =
            await TipoProductoService.getTipoProductoById(
              producto.tipo_producto_id
            );
          return { ...producto, tipo_producto: tipoProducto.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: infoProductos,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default ProductoService;
