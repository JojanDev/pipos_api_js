import ProductoVenta from "../models/ProductoVenta.js";
import ProductoService from "./ProductoService.js";
import VentaService from "./VentaService.js";

class ProductoVentaService {
  static objProductoVenta = new ProductoVenta();

  /**
   * Obtiene todas las ventas de productos registradas
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de ventas de productos
   */
  static async getAllProductosVentas() {
    try {
      // Obtenemos todas las ventas de productos
      const productoVentas = await this.objProductoVenta.getAll();

      if (!productoVentas || productoVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de productos registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Ventas de productos obtenidos correctamente",
        data: productoVentas,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una venta de producto por su ID
   * @param {number} id - ID de la venta de producto
   * @returns {Promise<Object>} Respuesta con éxito o error y la venta del producto
   */
  static async getProductoVentaById(id) {
    try {
      const productoVenta = await this.objProductoVenta.getById(id);

      if (!productoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };

      return {
        error: false,
        code: 200,
        message: "Venta del producto obtenida correctamente",
        data: productoVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva venta de producto
   * @param {Object} productoVenta - Datos de la venta de producto a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y la venta creada
   */
  static async createProductoVenta(productoVenta) {
    try {
      // Validamos que la venta exista
      const ventaExistente = await VentaService.getVentaById(
        productoVenta.venta_id
      );
      if (ventaExistente.error) return ventaExistente;

      // Validamos que el producto exista
      const productoExistente = await ProductoService.getProductoById(
        productoVenta.producto_id
      );
      if (productoExistente.error) return productoExistente;

      // Creamos la venta de producto
      const productoVentaCreado = await this.objProductoVenta.create(
        productoVenta
      );
      if (!productoVentaCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del producto",
        };

      // Actualizamos el stock del producto después de la venta
      const stock = productoExistente.data.stock - productoVentaCreado.cantidad;
      await ProductoService.updateProducto(productoVenta.producto_id, {
        stock,
      });

      return {
        error: false,
        code: 201,
        message: "Venta del producto creada correctamente",
        data: productoVentaCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una venta de producto existente
   * @param {number} id - ID de la venta de producto a actualizar
   * @param {Object} productoVenta - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y la venta actualizada
   */
  static async updateProductoVenta(id, productoVenta) {
    try {
      const existente = await this.objProductoVenta.getById(id);

      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };

      const productoVentaActualizado = await this.objProductoVenta.update(
        id,
        productoVenta
      );
      if (!productoVentaActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del producto",
        };

      return {
        error: false,
        code: 200,
        message: "Venta del producto actualizada correctamente",
        data: productoVentaActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una venta de producto por su ID
   * @param {number} id - ID de la venta de producto a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteProductoVenta(id) {
    try {
      const productoVenta = await this.objProductoVenta.getById(id);

      if (!productoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };

      const productoVentaEliminado = await this.objProductoVenta.delete(id);
      if (!productoVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del producto",
        };

      return {
        error: false,
        code: 200,
        message: "Venta del producto eliminada correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todas las ventas de productos asociadas a una venta específica
   * @param {number} venta_id - ID de la venta
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de productos de la venta
   */
  static async getAllProductoVentaByVentaId(venta_id) {
    try {
      const productosVenta = await this.objProductoVenta.getAllByVentaId(
        venta_id
      );

      if (!productosVenta || productosVenta.length === 0)
        return {
          error: true,
          code: 404,
          message: "La venta no tiene productos registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Ventas del producto obtenida correctamente",
        data: productosVenta,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ProductoVentaService;
