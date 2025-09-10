import InfoMedicamento from "../models/InfoMedicamento.js";
import MedicamentoService from "./MedicamentoService.js";
import MedicamentoTratamientoService from "./MedicamentoTratamientoService.js";

/**
 * Servicio de gestión de información de medicamentos.
 * Contiene métodos para CRUD y consultas específicas.
 */
class InfoMedicamentoService {
  static objInfoMedicamento = new InfoMedicamento();

  /**
   * Obtiene toda la información de medicamentos registrada.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllInfosMedicamentos() {
    try {
      // Llamamos al método para obtener todos los registros
      const infosMedicamentos = await this.objInfoMedicamento.getAll();

      // Validamos si hay registros
      if (!infosMedicamentos || infosMedicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay información de medicamentos registrados",
          data: null,
        };

      // Retornamos los registros obtenidos
      return {
        error: false,
        code: 200,
        message: "Información de medicamentos obtenida correctamente",
        data: infosMedicamentos,
      };
    } catch (error) {
      // Retorno en caso de excepción
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene la información de un medicamento por su ID.
   * @param {number} id - ID del registro a consultar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getInfoMedicamentoById(id) {
    try {
      const infoMedicamento = await this.objInfoMedicamento.getById(id);

      // Validamos si existe la información
      if (!infoMedicamento)
        return {
          error: true,
          code: 404,
          message: "Información de medicamento no encontrada",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Información de medicamento obtenida correctamente",
        data: infoMedicamento,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo registro de información de medicamento.
   * @param {Object} infoMedicamento - Datos del medicamento a registrar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createInfoMedicamento(infoMedicamento) {
    try {
      // Llamamos al método crear en el modelo
      const infoMedicamentoCreado = await this.objInfoMedicamento.create(
        infoMedicamento
      );

      if (!infoMedicamentoCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la información de medicamento",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Información de medicamento creada correctamente",
        data: infoMedicamentoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un registro de información de medicamento existente.
   * @param {number} id - ID del registro a actualizar.
   * @param {Object} infoMedicamento - Nuevos datos del medicamento.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateInfoMedicamento(id, infoMedicamento) {
    try {
      // Verificamos que el registro exista
      const existente = await this.objInfoMedicamento.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Información de medicamento no encontrada",
          data: null,
        };

      // Actualizamos el registro
      const infoMedicamentoActualizado = await this.objInfoMedicamento.update(
        id,
        infoMedicamento
      );

      if (!infoMedicamentoActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la información del medicamento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Información de medicamento actualizada correctamente",
        data: infoMedicamentoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un registro de información de medicamento.
   * Valida que no existan medicamentos o tratamientos asociados.
   * @param {number} id - ID del registro a eliminar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteInfoMedicamento(id) {
    try {
      // Verificamos que el registro exista
      const infoMedicamento = await this.getInfoMedicamentoById(id);
      if (infoMedicamento.error) return infoMedicamento;

      // Validamos que no haya medicamentos asociados en inventario
      const medicamentosAsociados =
        await MedicamentoService.getAllMedicamentosByInfoMedicamentoId(id);
      if (!medicamentosAsociados.error)
        return {
          error: true,
          code: 400,
          message:
            "No se puede eliminar la información, tiene medicamentos en inventario asociados",
          data: null,
        };

      // Validamos que no haya medicamentos asociados a tratamientos
      const medicamentosTratamientosAsociados =
        await MedicamentoTratamientoService.getAllMedicamentosTratamientosByInfoMedicamentoId(
          id
        );
      if (!medicamentosTratamientosAsociados.error)
        return {
          error: true,
          code: 400,
          message:
            "No se puede eliminar la información, tiene tratamientos asociados",
          data: null,
        };

      // Eliminamos el registro
      const infoMedicamentoEliminado = await this.objInfoMedicamento.delete(id);
      if (!infoMedicamentoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la información de medicamento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Información de medicamento eliminada correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default InfoMedicamentoService;
