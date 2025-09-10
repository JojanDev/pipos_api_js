import { ResponseProvider } from "../providers/ResponseProvider.js";
import MedicamentoService from "../services/MedicamentoService.js";

/**
 * Controlador para las rutas relacionadas con medicamentos.
 * Usa MedicamentoService para la lógica de negocio y ResponseProvider
 * para centralizar las respuestas HTTP.
 */
class MedicamentoController {
  /**
   * Obtiene todos los medicamentos.
   * Ruta: GET /medicamentos
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllMedicamentos = async (req, res) => {
    try {
      const response = await MedicamentoService.getAllMedicamentos();

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
   * Obtiene un medicamento por su ID.
   * Ruta: GET /medicamentos/:id
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static getMedicamentoById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await MedicamentoService.getMedicamentoById(id);

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
   * Crea un nuevo medicamento.
   * Ruta: POST /medicamentos
   *
   * @param {import('express').Request} req - req.body contiene los datos del medicamento
   * @param {import('express').Response} res
   */
  static createMedicamento = async (req, res) => {
    const medicamento = req.body;

    try {
      const response = await MedicamentoService.createMedicamento(medicamento);

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
   * Actualiza un medicamento existente.
   * Ruta: PUT /medicamentos/:id
   *
   * @param {import('express').Request} req - req.params.id y req.body con datos a actualizar
   * @param {import('express').Response} res
   */
  static updateMedicamento = async (req, res) => {
    const { id } = req.params;
    const medicamento = req.body;

    try {
      const response = await MedicamentoService.updateMedicamento(
        id,
        medicamento
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
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  /**
   * Elimina un medicamento.
   * Ruta: DELETE /medicamentos/:id
   *
   * Nota: el servicio puede devolver solo mensaje/código, por eso aquí
   * devolvemos explicitamente `null` como data cuando la eliminación es exitosa.
   *
   * @param {import('express').Request} req - req.params.id
   * @param {import('express').Response} res
   */
  static deleteMedicamento = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await MedicamentoService.deleteMedicamento(id);

      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }

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

  /**
   * Obtiene todos los medicamentos asociados a una info_medicamento.
   * Ruta: GET /medicamentos/info/:id
   *
   * @param {import('express').Request} req - req.params.id (info_medicamento_id)
   * @param {import('express').Response} res
   */
  static getAllMedicamentosByInfoMedicamentoId = async (req, res) => {
    const { id } = req.params;

    try {
      const response =
        await MedicamentoService.getAllMedicamentosByInfoMedicamentoId(id);

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
   * Obtiene todos los medicamentos con cantidad positiva.
   * Ruta: GET /medicamentos/cantidad-positiva
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllMedicamentosByCantidadPositiva = async (req, res) => {
    try {
      const response =
        await MedicamentoService.getAllMedicamentosByCantidadPositiva();

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

export default MedicamentoController;
