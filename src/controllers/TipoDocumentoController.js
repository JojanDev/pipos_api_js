import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoDocumentoService from "../services/TipoDocumentoService.js";

/**
 * Controlador para las rutas de "tipos de documento".
 * Centraliza la comunicación entre Express y el servicio TipoDocumentoService,
 * y unifica las respuestas HTTP mediante ResponseProvider.
 */
class TipoDocumentoController {
  /**
   * Obtiene todos los tipos de documento.
   * Ruta: GET /tipos-documentos
   *
   * @param {import('express').Request}  req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getAllTiposDocumentos = async (req, res) => {
    try {
      const response = await TipoDocumentoService.getAllTiposDocumentos();

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
      console.error("getAllTiposDocumentos error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene un tipo de documento por su ID.
   * Ruta: GET /tipos-documentos/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static getTipoDocumentoById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoDocumentoService.getTipoDocumentoById(id);

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
      console.error(`getTipoDocumentoById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea un nuevo tipo de documento.
   * Ruta: POST /tipos-documentos
   *
   * @param {import('express').Request}  req  – req.body con los datos del tipo de documento
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static createTipoDocumento = async (req, res) => {
    const tipoDocumento = req.body;
    try {
      const response = await TipoDocumentoService.createTipoDocumento(
        tipoDocumento
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
      console.error("createTipoDocumento error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza un tipo de documento existente por su ID.
   * Ruta: PUT /tipos-documentos/:id
   *
   * @param {import('express').Request}  req  – req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static updateTipoDocumento = async (req, res) => {
    const { id } = req.params;
    const tipoDocumento = req.body;
    try {
      const response = await TipoDocumentoService.updateTipoDocumento(
        id,
        tipoDocumento
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
      console.error(`updateTipoDocumento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un tipo de documento por su ID.
   * Ruta: DELETE /tipos-documentos/:id
   *
   * @param {import('express').Request}  req  – req.params.id
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  static deleteTipoDocumento = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoDocumentoService.deleteTipoDocumento(id);

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
      console.error(`deleteTipoDocumento error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default TipoDocumentoController;
