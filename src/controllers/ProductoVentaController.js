import { ResponseProvider } from "../providers/ResponseProvider.js";
import ProductoVentaService from "../services/ProductoVentaService.js";

/**
 * Controlador para manejar las rutas de "productos de venta".
 * Centraliza la comunicación entre Express y el servicio correspondiente.
 */
class ProductoVentaController {
  /**
   * Obtiene todos los productos de venta.
   * Ruta: GET /producto-ventas
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllProductosVentas = async (req, res) => {
    try {
      const response = await ProductoVentaService.getAllProductosVentas();

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error("getAllProductosVentas error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un producto de venta por su ID.
   * Ruta: GET /producto-ventas/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getProductoVentaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ProductoVentaService.getProductoVentaById(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`getProductoVentaById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo producto de venta.
   * Ruta: POST /producto-ventas
   *
   * @param {import('express').Request}  req  – req.body con datos del productoVenta
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createProductoVenta = async (req, res) => {
    const productoVenta = req.body;
    try {
      const response = await ProductoVentaService.createProductoVenta(
        productoVenta
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      console.error("createProductoVenta error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un producto de venta existente por su ID.
   * Ruta: PUT /producto-ventas/:id
   *
   * @param {import('express').Request}  req  – req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateProductoVenta = async (req, res) => {
    const { id } = req.params;
    const productoVenta = req.body;
    try {
      const response = await ProductoVentaService.updateProductoVenta(
        id,
        productoVenta
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      console.error(`updateProductoVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un producto de venta por su ID.
   * Ruta: DELETE /producto-ventas/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteProductoVenta = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ProductoVentaService.deleteProductoVenta(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(`deleteProductoVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los productos de venta de una venta específica.
   * Ruta: GET /ventas/:id/producto-ventas
   *
   * @param {import('express').Request}  req  – req.params.id (ID de la venta)
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllProductoVentaByVentaId = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ProductoVentaService.getAllProductoVentaByVentaId(
        id
      );

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      console.error(
        `getAllProductoVentaByVentaId error (ventaId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default ProductoVentaController;
