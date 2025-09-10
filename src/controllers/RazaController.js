import { ResponseProvider } from "../providers/ResponseProvider.js";
import RazaService from "../services/RazaService.js";

/**
 * Controlador para las rutas relacionadas con razas de animales.
 * Centraliza la comunicación entre Express y RazaService.
 */
class RazaController {
  /**
   * Obtiene todas las razas registradas.
   * Ruta: GET /razas
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllRazas = async (req, res) => {
    try {
      const response = await RazaService.getAllRazas();

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
      console.error("getAllRazas error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene una raza por su ID.
   * Ruta: GET /razas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getRazaById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await RazaService.getRazaById(id);

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
      console.error(`getRazaById error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Crea una nueva raza.
   * Ruta: POST /razas
   *
   * @param {import('express').Request} req - req.body contiene los datos de la raza
   * @param {import('express').Response} res
   */
  static createRaza = async (req, res) => {
    const raza = req.body;

    try {
      const response = await RazaService.createRaza(raza);

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
      console.error("createRaza error:", error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Actualiza una raza existente por su ID.
   * Ruta: PUT /razas/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateRaza = async (req, res) => {
    const { id } = req.params;
    const raza = req.body;

    try {
      const response = await RazaService.updateRaza(id, raza);

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
      console.error(`updateRaza error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina una raza por su ID.
   * Ruta: DELETE /razas/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteRaza = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await RazaService.deleteRaza(id);

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
      console.error(`deleteRaza error (id=${id}):`, error);
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Obtiene todas las razas asociadas a una especie.
   * Ruta: GET /razas/especie/:especie_id
   *
   * @param {import('express').Request} req - req.params.especie_id
   * @param {import('express').Response} res
   */
  static getAllRazasByEspecieId = async (req, res) => {
    const { especie_id } = req.params;

    try {
      const response = await RazaService.getAllRazasByEspecieId(especie_id);

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
        `getAllRazasByEspecieId error (especie_id=${especie_id}):`,
        error
      );
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default RazaController;
