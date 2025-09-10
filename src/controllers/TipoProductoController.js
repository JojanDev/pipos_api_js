import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoProductoService from "../services/TipoProductoService.js";

/**
 * Controlador para las rutas relacionadas con tipos de productos.
 * Centraliza la lógica HTTP y delega operaciones al TipoProductoService.
 */
class TipoProductoController {
  /**
   * Obtiene todos los tipos de productos registrados.
   * Ruta: GET /tipos-productos
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllTiposProductos = async (req, res) => {
    try {
      const response = await TipoProductoService.getAllTiposProductos();

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
      console.error("getAllTiposProductos error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un tipo de producto por su ID.
   * Ruta: GET /tipos-productos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getTipoProductoById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await TipoProductoService.getTipoProductoById(id);

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
      console.error(`getTipoProductoById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo tipo de producto.
   * Ruta: POST /tipos-productos
   *
   * @param {import('express').Request} req - req.body contiene los datos del tipo de producto
   * @param {import('express').Response} res
   */
  static createTipoProducto = async (req, res) => {
    const tipoProducto = req.body;

    try {
      const response = await TipoProductoService.createTipoProducto(
        tipoProducto
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
      console.error("createTipoProducto error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un tipo de producto existente por su ID.
   * Ruta: PUT /tipos-productos/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateTipoProducto = async (req, res) => {
    const { id } = req.params;
    const tipoProducto = req.body;

    try {
      const response = await TipoProductoService.updateTipoProducto(
        id,
        tipoProducto
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
      console.error(`updateTipoProducto error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un tipo de producto por su ID.
   * Ruta: DELETE /tipos-productos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteTipoProducto = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await TipoProductoService.deleteTipoProducto(id);

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
      console.error(`deleteTipoProducto error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default TipoProductoController;
