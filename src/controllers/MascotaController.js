/**
 * MascotaController
 *
 * Controlador encargado de recibir las peticiones HTTP relacionadas con
 * las mascotas y delegar la lógica al servicio correspondiente (MascotaService).
 *
 */

import { ResponseProvider } from "../providers/ResponseProvider.js";
import MascotaService from "../services/MascotaService.js";

class MascotaController {
  /**
   * Obtener todas las mascotas
   *
   * @param {import("express").Request} req - petición entrante (no usada aquí)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllMascotas = async (req, res) => {
    try {
      // Llamamos al servicio que devuelve la lista de mascotas
      const response = await MascotaService.getAllMascotas();

      // Si el servicio indica error (por ejemplo 404), devolvemos ese error
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa con los datos devueltos por el servicio
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
   * Obtener una mascota por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getMascotaById = async (req, res) => {
    // Extraemos el id desde los parámetros de ruta
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la mascota por ID
      const response = await MascotaService.getMascotaById(id);

      // Si no se encontró o hay otro error, lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Devolvemos la mascota obtenida
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
   * Crear una nueva mascota
   *
   * @param {import("express").Request} req - petición entrante (req.body tiene los datos)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static createMascota = async (req, res) => {
    // Payload con los datos de la mascota
    const mascota = req.body;
    try {
      // Llamamos al servicio que crea la mascota
      const response = await MascotaService.createMascota(mascota);

      // Si el servicio reporta un error (validaciones, recursos no existentes...), lo retornamos
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
   * Actualizar una mascota existente
   *
   * @param {import("express").Request} req - petición entrante (req.params.id, req.body)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static updateMascota = async (req, res) => {
    // Extraemos id y nuevo payload
    const { id } = req.params;
    const mascota = req.body;
    try {
      // Llamamos al servicio que actualiza la mascota
      const response = await MascotaService.updateMascota(id, mascota);

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
   * Eliminar una mascota por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static deleteMascota = async (req, res) => {
    // Obtenemos el id a eliminar
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la mascota
      const response = await MascotaService.deleteMascota(id);

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
   * Obtener todas las mascotas asociadas a un usuario (usuario_id)
   *
   * @param {import("express").Request} req - petición entrante (req.params.id = usuario_id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllMascotasByUsuarioId = async (req, res) => {
    // Extraemos el id del usuario
    const { id } = req.params;
    try {
      // Llamamos al servicio que obtiene mascotas por usuario
      const response = await MascotaService.getAllMascotasByUsuarioId(id);

      // Si hay error (por ejemplo 404), lo propagamos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos la lista de mascotas del usuario
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
   * Obtener todas las mascotas por raza (raza_id)
   *
   * @param {import("express").Request} req - petición entrante (req.params.id = raza_id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllMascotasByRazaId = async (req, res) => {
    // Extraemos el id de la raza
    const { id } = req.params;
    try {
      // Llamamos al servicio que obtiene mascotas por raza
      const response = await MascotaService.getAllMascotasByRazaId(id);

      // Si hay error (por ejemplo 404), lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa con las mascotas encontradas
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

export default MascotaController;
