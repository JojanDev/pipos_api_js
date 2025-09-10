import { ResponseProvider } from "../providers/ResponseProvider.js";
import ServicioVentaService from "../services/ServicioVentaService.js";

/**
 * Controlador para las rutas relacionadas con servicios vendidos.
 * Centraliza la lógica HTTP y delega operaciones al ServicioVentaService.
 */
class ServicioVentaController {
  /**
   * Obtiene todos los servicios registrados en ventas.
   * Ruta: GET /servicios-ventas
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllServiciosVentas = async (req, res) => {
    try {
      const response = await ServicioVentaService.getAllServiciosVentas();

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
      console.error("getAllServiciosVentas error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un servicio vendido por su ID.
   * Ruta: GET /servicios-ventas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getServicioVentaById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServicioVentaService.getServicioVentaById(id);

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
      console.error(`getServicioVentaById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo servicio dentro de una venta.
   * Ruta: POST /servicios-ventas
   *
   * @param {import('express').Request} req - req.body contiene los datos del servicio vendido
   * @param {import('express').Response} res
   */
  static createServicioVenta = async (req, res) => {
    const servicioVenta = req.body;

    try {
      const response = await ServicioVentaService.createServicioVenta(
        servicioVenta
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
      console.error("createServicioVenta error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un servicio vendido por su ID.
   * Ruta: PUT /servicios-ventas/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateServicioVenta = async (req, res) => {
    const { id } = req.params;
    const servicioVenta = req.body;

    try {
      const response = await ServicioVentaService.updateServicioVenta(
        id,
        servicioVenta
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
      console.error(`updateServicioVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un servicio vendido por su ID.
   * Ruta: DELETE /servicios-ventas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteServicioVenta = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServicioVentaService.deleteServicioVenta(id);

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
      console.error(`deleteServicioVenta error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todos los servicios vendidos asociados a una venta específica.
   * Ruta: GET /ventas/:id/servicios
   *
   * @param {import('express').Request} req - req.params.id (ID de la venta)
   * @param {import('express').Response} res
   */
  static getAllServicioVentaByVentaId = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await ServicioVentaService.getAllServicioVentaByVentaId(
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
        `getAllServicioVentaByVentaId error (ventaId=${id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default ServicioVentaController;
