import { ResponseProvider } from "../providers/ResponseProvider.js";
import EspecieService from "../services/EspecieService.js";

/**
 * Controlador para las operaciones HTTP relacionadas con especies.
 * Cada método usa EspecieService para la lógica de negocio y ResponseProvider
 * para centralizar las respuestas HTTP.
 */
class EspecieController {
  /**
   * Obtiene todas las especies.
   * Ruta típica: GET /especies
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllEspecies = async (req, res) => {
    try {
      const response = await EspecieService.getAllEspecies();

      // Si el servicio devuelve un error, delegamos al ResponseProvider
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Respuesta exitosa con la lista de especies
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Error interno no esperado
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene una especie por su ID.
   * Ruta típica: GET /especies/:id
   *
   * @param {import('express').Request} req - req.params.id contiene el ID
   * @param {import('express').Response} res
   */
  static getEspecieById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await EspecieService.getEspecieById(id);

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
   * Crea una nueva especie.
   * Ruta típica: POST /especies
   *
   * @param {import('express').Request} req - req.body contiene los datos de la especie
   * @param {import('express').Response} res
   */
  static createEspecie = async (req, res) => {
    const especie = req.body;

    try {
      const response = await EspecieService.createEspecie(especie);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Recurso creado -> 201
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
   * Actualiza una especie existente.
   * Ruta típica: PUT /especies/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateEspecie = async (req, res) => {
    const { id } = req.params;
    const especie = req.body;

    try {
      const response = await EspecieService.updateEspecie(id, especie);

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
   * Elimina una especie.
   * Ruta típica: DELETE /especies/:id
   *
   * Nota: el servicio puede devolver sólo mensaje y código, por eso aquí
   * devolvemos `null` como data cuando la eliminación es exitosa.
   *
   * @param {import('express').Request} req - req.params.id contiene el ID
   * @param {import('express').Response} res
   */
  static deleteEspecie = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await EspecieService.deleteEspecie(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos null en data para dejar explícito que no hay payload
      return ResponseProvider.success(
        res,
        null,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default EspecieController;
