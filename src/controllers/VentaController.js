import { ResponseProvider } from "../providers/ResponseProvider.js";
import VentaService from "../services/VentaService.js";

/**
 * Controlador para las rutas relacionadas con ventas.
 * Centraliza la lógica HTTP y delega operaciones al VentaService.
 */
class VentaController {
  /**
   * Obtiene todas las ventas registradas.
   * Ruta: GET /ventas
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllVentas = async (req, res) => {
    try {
      const response = await VentaService.getAllVentas();

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
      console.error("getAllVentas error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene una venta por su ID.
   * Ruta: GET /ventas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getVentaById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await VentaService.getVentaById(id);

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
      console.error(`getVentaById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea una nueva venta.
   * Ruta: POST /ventas
   *
   * @param {import('express').Request} req - req.body contiene los datos de la venta
   * @param {import('express').Response} res
   */
  static createVenta = async (req, res) => {
    const venta = req.body;

    try {
      const response = await VentaService.createVenta(venta);

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
      console.error("createVenta error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza una venta existente por su ID.
   * Ruta: PUT /ventas/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateVenta = async (req, res) => {
    const { id } = req.params;
    const venta = req.body;

    try {
      const response = await VentaService.updateVenta(id, venta);

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
      console.error(`updateVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina una venta por su ID.
   * Ruta: DELETE /ventas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteVenta = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await VentaService.deleteVenta(id);

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
      console.error(`deleteVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default VentaController;
