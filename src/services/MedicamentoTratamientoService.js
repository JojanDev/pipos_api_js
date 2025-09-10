import MedicamentoTratamiento from "../models/MedicamentoTratamiento.js";
import InfoMedicamentoService from "./InfoMedicamentoService.js";
import TratamientoService from "./TratamientoService.js";

/**
 * Servicio de gestión de medicamentos asociados a tratamientos.
 * Contiene métodos CRUD y consultas por relaciones con tratamientos e información de medicamentos.
 */
class MedicamentoTratamientoService {
  static objMedicamentoTratamiento = new MedicamentoTratamiento();

  /**
   * Obtiene todos los medicamentos de tratamientos registrados.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllMedicamentosTratamientos() {
    try {
      const medicamentosTratamientos =
        await this.objMedicamentoTratamiento.getAll();

      if (!medicamentosTratamientos || medicamentosTratamientos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos de tratamientos registrados",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamentos de tratamientos obtenidos correctamente",
        data: medicamentosTratamientos,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene un medicamento de tratamiento por su ID.
   * @param {number} id - ID del registro a consultar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getMedicamentoTratamientoById(id) {
    try {
      const medicamentoTratamiento =
        await this.objMedicamentoTratamiento.getById(id);

      if (!medicamentoTratamiento)
        return {
          error: true,
          code: 404,
          message: "Medicamento de tratamiento no encontrado",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento obtenido correctamente",
        data: medicamentoTratamiento,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo medicamento de tratamiento.
   * Valida que existan el tratamiento y la información de medicamento asociados.
   * @param {Object} medicamentoTratamiento - Datos del medicamento de tratamiento.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async createMedicamentoTratamiento(medicamentoTratamiento) {
    try {
      // Validamos existencia del tratamiento
      const tratamientoExistente = await TratamientoService.getTratamientoById(
        medicamentoTratamiento.tratamiento_id
      );
      if (tratamientoExistente.error) return tratamientoExistente;

      // Validamos existencia de la información de medicamento
      const infoMedicamentoExistente =
        await InfoMedicamentoService.getInfoMedicamentoById(
          medicamentoTratamiento.info_medicamento_id
        );
      if (infoMedicamentoExistente.error) return infoMedicamentoExistente;

      // Creamos el registro
      const medicamentoTratamientoCreado =
        await this.objMedicamentoTratamiento.create(medicamentoTratamiento);
      if (!medicamentoTratamientoCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el medicamento de tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Medicamento de tratamiento creado correctamente",
        data: medicamentoTratamientoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un medicamento de tratamiento existente.
   * @param {number} id - ID del registro a actualizar.
   * @param {Object} medicamentoTratamiento - Nuevos datos.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async updateMedicamentoTratamiento(id, medicamentoTratamiento) {
    try {
      const existente = await this.objMedicamentoTratamiento.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Medicamento de tratamiento no encontrado",
          data: null,
        };

      const medicamentoTratamientoActualizado =
        await this.objMedicamentoTratamiento.update(id, medicamentoTratamiento);
      if (!medicamentoTratamientoActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el medicamento de tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento actualizado correctamente",
        data: medicamentoTratamientoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un medicamento de tratamiento por su ID.
   * @param {number} id - ID del registro a eliminar.
   * @returns {Promise<Object>} Objeto con estado, código HTTP y mensaje.
   */
  static async deleteMedicamentoTratamiento(id) {
    try {
      const medicamentoTratamiento = await this.getMedicamentoTratamientoById(
        id
      );
      if (medicamentoTratamiento.error) return medicamentoTratamiento;

      const eliminado = await this.objMedicamentoTratamiento.delete(id);
      if (!eliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el medicamento de tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento eliminado correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los medicamentos asociados a un tratamiento específico.
   * @param {number} tratamiento_id - ID del tratamiento.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllMedicamentosTratamientosByTratamientoId(tratamiento_id) {
    try {
      const medicamentosTratamiento =
        await this.objMedicamentoTratamiento.getAllByTratamientoId(
          tratamiento_id
        );

      if (!medicamentosTratamiento || medicamentosTratamiento.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados para el tratamiento.",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamentos del tratamiento obtenidos correctamente",
        data: medicamentosTratamiento,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los medicamentos asociados a una información de medicamento específica.
   * @param {number} info_medicamento_id - ID de la información de medicamento.
   * @returns {Promise<Object>} Objeto con estado, código HTTP, mensaje y datos.
   */
  static async getAllMedicamentosTratamientosByInfoMedicamentoId(
    info_medicamento_id
  ) {
    try {
      const medicamentosTratamiento =
        await this.objMedicamentoTratamiento.getAllByInfoMedicamentoId(
          info_medicamento_id
        );

      if (!medicamentosTratamiento || medicamentosTratamiento.length === 0)
        return {
          error: true,
          code: 404,
          message:
            "No hay medicamentos registrados en tratamientos con esa información de medicamento.",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Medicamentos del tratamiento obtenidos correctamente",
        data: medicamentosTratamiento,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default MedicamentoTratamientoService;
