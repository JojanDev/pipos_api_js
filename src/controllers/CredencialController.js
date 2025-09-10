/**
 * CredencialController
 *
 * Controlador encargado de recibir las peticiones HTTP relacionadas con
 * las credenciales y delegar la lógica al servicio correspondiente.
 *
 */

import { ResponseProvider } from "../providers/ResponseProvider.js";
import CredencialService from "../services/CredencialService.js";

class CredencialController {
  /**
   * Obtener todas las credenciales
   *
   * @param {import("express").Request} req - petición entrante (no usada aquí)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getAllCredenciales = async (req, res) => {
    try {
      // Llamamos al servicio que obtiene todas las credenciales
      const response = await CredencialService.getAllCredenciales();

      // Si el servicio indica un error, devolvemos la respuesta de error
      if (response.error) {
        // Uso centralizado del provider para errores
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Si todo está bien, respondemos con los datos obtenidos
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Capturamos cualquier excepción no manejada y devolvemos 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtener una credencial por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getCredencialById = async (req, res) => {
    // Extraemos el id desde los parámetros de la ruta
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener la credencial por ID
      const response = await CredencialService.getCredencialById(id);

      // Si el servicio devolvió error (por ejemplo 404), reenvíamos ese error
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Si todo bien, devolvemos los datos
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
   * Crear una nueva credencial
   *
   * @param {import("express").Request} req - petición entrante (req.body contiene la credencial)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static createCredencial = async (req, res) => {
    // Obtenemos el payload con los datos de la credencial
    const credencial = req.body;
    try {
      // Llamamos al servicio que crea la credencial
      const response = await CredencialService.createCredencial(credencial);

      // Si el servicio devolvió un error (validación, conflicto...), lo propagamos
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
      // Error inesperado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualizar una credencial existente
   *
   * @param {import("express").Request} req - petición entrante (req.params.id, req.body)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static updateCredencial = async (req, res) => {
    // Extraemos id y nuevo payload
    const { id } = req.params;
    const credencial = req.body;
    try {
      // Llamamos al servicio que actualiza la credencial
      const response = await CredencialService.updateCredencial(id, credencial);

      // Si el servicio reporta un error (404, 400, etc.), lo devolvemos
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
      // Error inesperado -> 500
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Eliminar una credencial por su ID
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static deleteCredencial = async (req, res) => {
    // Obtenemos el id a eliminar
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar la credencial
      const response = await CredencialService.deleteCredencial(id);

      // Si ocurrió algún problema (por ejemplo 404 o 400), lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Eliminación exitosa -> devolvemos el mensaje apropiado
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
   * Obtener la credencial de un usuario por su ID (usuario_id)
   *
   * @param {import("express").Request} req - petición entrante (req.params.id)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getCredencialByUsuarioId = async (req, res) => {
    // Extraemos el id del usuario desde params
    const { id } = req.params;
    try {
      // Llamamos al servicio que obtiene la credencial por usuario_id
      const response = await CredencialService.getCredencialByUsuarioId(id);

      // Si no existe o hay error, lo retornamos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Éxito -> devolvemos datos
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
   * Obtener la credencial por el campo "usuario" (username o identificador)
   *
   * @param {import("express").Request} req - petición entrante (req.params.usuario)
   * @param {import("express").Response} res - respuesta que se enviará al cliente
   */
  static getCredencialByUsuario = async (req, res) => {
    // Extraemos el identificador 'usuario' desde params
    const { usuario } = req.params;
    try {
      // Llamamos al servicio que obtiene la credencial por usuario
      const response = await CredencialService.getCredencialByUsuario(usuario);

      // Si hay error (no encontrado, etc.), lo devolvemos
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Éxito -> devolvemos datos
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
}

export default CredencialController;
