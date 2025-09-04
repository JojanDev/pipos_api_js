import ProductoVenta from "../models/ProductoVenta.js";
import ProductoService from "./ProductoService.js";
import VentaService from "./VentaService.js";
// import Usuario from "../models/Usuario.js";

class ProductoVentaService {
  static objProductoVenta = new ProductoVenta();
  // static objUsuario = new Usuario();

  static async getAllProductosVentas() {
    try {
      // Llamamos el método listar
      const productoVentas = await this.objProductoVenta.getAll();

      // Validamos si no hay tipos de productos
      if (!productoVentas || productoVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay ventas de productos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Ventas de productos obtenidos correctamente",
        data: productoVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getProductoVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const productoVenta = await this.objProductoVenta.getById(id);
      // Validamos si no hay productoVenta
      if (!productoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };

      // Retornamos la productoVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Venta del producto obtenida correctamente",
        data: productoVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createProductoVenta(productoVenta) {
    try {
      const ventaExistente = await VentaService.getVentaById(
        productoVenta.venta_id
      );

      if (ventaExistente.error) return ventaExistente;

      const productoExistente = await ProductoService.getProductoById(
        productoVenta.producto_id
      );

      if (productoExistente.error) return productoExistente;

      // Llamamos el método crear
      const productoVentaCreado = await this.objProductoVenta.create(
        productoVenta
      );
      // Validamos si no se pudo crear el tipo de producto
      if (productoVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la venta del producto",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Venta del producto creada correctamente",
        data: productoVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateProductoVenta(id, productoVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objProductoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };
      }

      // Llamamos el método actualizar
      const productoVentaActualizado = await this.objProductoVenta.update(
        id,
        productoVenta
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (productoVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la venta del producto",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Venta del producto actualizada correctamente",
        data: productoVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteProductoVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const productoVenta = await this.objProductoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!productoVenta)
        return {
          error: true,
          code: 404,
          message: "Venta del producto no encontrada",
        };

      // Llamamos el método eliminar
      const productoVentaEliminado = await this.objProductoVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!productoVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la venta del producto",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Venta del producto eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllProductoVentaByVentaId(venta_id) {
    try {
      // Llamamos el método consultar por ID
      const productosVenta = await this.objProductoVenta.getAllByVentaId(
        venta_id
      );
      // Validamos si no hay productoVenta
      if (!productosVenta)
        return {
          error: true,
          code: 404,
          message: "La venta no tiene productos registrados",
        };

      // Retornamos la productoVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Ventas del producto obtenida correctamente",
        data: productosVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ProductoVentaService;
