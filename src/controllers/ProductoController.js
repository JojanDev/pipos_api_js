import { ResponseProvider } from "../providers/ResponseProvider.js";
import ProductoService from "../services/ProductoService.js";

/**
 * Controlador para las rutas relacionadas con productos.
 * Centraliza la comunicación entre Express y ProductoService.
 */
class ProductoController {
  /**
   * Obtiene todos los productos registrados.
   * Ruta: GET /productos
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllProductos = async (req, res) => {
    try {
      const response = await ProductoService.getAllProductos();

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un producto por su ID.
   * Ruta: GET /productos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getProductoById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ProductoService.getProductoById(id);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo producto.
   * Ruta: POST /productos
   *
   * @param {import('express').Request} req - req.body contiene los datos del producto
   * @param {import('express').Response} res
   */
  static createProducto = async (req, res) => {
    const producto = req.body;

    try {
      const response = await ProductoService.createProducto(producto);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un producto existente por su ID.
   * Ruta: PUT /productos/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateProducto = async (req, res) => {
    const { id } = req.params;
    const producto = req.body;

    try {
      const response = await ProductoService.updateProducto(id, producto);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un producto por su ID.
   * Ruta: DELETE /productos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteProducto = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ProductoService.deleteProducto(id);

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los productos con stock positivo.
   * Ruta: GET /productos/stock
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllProductosByStockPositivo = async (req, res) => {
    try {
      const response = await ProductoService.getAllProductosByStockPositivo();

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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default ProductoController;
