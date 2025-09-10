/**
 * MedicamentoVentaController
 *
 * Controlador encargado de recibir las peticiones HTTP relacionadas con
 * las ventas de medicamentos y delegar la lógica al servicio correspondiente.
 *
 */

import { ResponseProvider } from "../providers/ResponseProvider.js";
import MedicamentoVentaService from "../services/MedicamentoVentaService.js";

class MedicamentoVentaController {
  /**
   * Obtener todas las ventas de medicamentos
   *
   * @param {import("express").Request} req - petición entrante (no usada aquí)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllMedicamentosVentas = async (req, res) => {
    try {
      // Llamamos al servicio que devuelve todas las ventas de medicamentos
      const response = await MedicamentoVentaService.getAllMedicamentosVentas();

      // Si el servicio indica un error (por ejemplo 404), devolvemos ese error
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa: devolvemos datos y mensaje del servicio
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error inesperado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtener una venta de medicamento por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getMedicamentoVentaById = async (req, res) => {
    // Extraemos el id desde los parámetros de la ruta
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la venta por ID
      const response = await MedicamentoVentaService.getMedicamentoVentaById(
        id
      );

      // Si el servicio devolvió un error (por ejemplo 404), lo propagamos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Devolvemos la venta encontrada
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error no controlado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crear una nueva venta de medicamento
   *
   * @param {import("express").Request} req - petición entrante (req.body contiene los datos)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static createMedicamentoVenta = async (req, res) => {
    // Payload con los datos de la venta
    const medicamentoVenta = req.body;
    try {
      // Llamamos al servicio que crea la venta
      const response = await MedicamentoVentaService.createMedicamentoVenta(
        medicamentoVenta
      );

      // Si el servicio reporta un error (validación, recursos inexistentes...), lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Creación exitosa -> 201 Created
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      // Error no controlado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualizar una venta de medicamento existente
   *
   * @param {import("express").Request} req - petición entrante (req.params.id, req.body)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static updateMedicamentoVenta = async (req, res) => {
    // Extraemos id y nuevo payload
    const { id } = req.params;
    const medicamentoVenta = req.body;
    try {
      // Llamamos al servicio que actualiza la venta
      const response = await MedicamentoVentaService.updateMedicamentoVenta(
        id,
        medicamentoVenta
      );

      // Si el servicio devuelve error (404, 400...), lo propagamos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Actualización correcta -> 200 OK
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      // Error no controlado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Eliminar una venta de medicamento por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static deleteMedicamentoVenta = async (req, res) => {
    // Obtenemos el id a eliminar
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la venta
      const response = await MedicamentoVentaService.deleteMedicamentoVenta(id);

      // Si ocurrió algún problema (por ejemplo 404 o 400), lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Eliminación correcta -> devolvemos el mensaje del servicio
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error no controlado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtener todas las ventas de medicamentos asociadas a una venta (venta_id)
   *
   * @param {import("express").Request} req - petición entrante (req.params.id = venta_id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllMedicamentosVentasByVentaId = async (req, res) => {
    // Extraemos el id de la venta
    const { id } = req.params;
    try {
      // Llamamos al servicio que obtiene los medicamentos vendidos para la venta indicada
      const response =
        await MedicamentoVentaService.getAllMedicamentosVentasByVentaId(id);

      // Si el servicio devuelve error (por ejemplo 404), lo propagamos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa con los datos
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error no controlado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default MedicamentoVentaController;
