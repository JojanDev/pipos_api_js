import Medicamento from "../models/Medicamento.js";
import InfoMedicamentoService from "./InfoMedicamentoService.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los medicamentos.
 *
 * Se apoya en el modelo `Medicamento` para interactuar con la base de datos
 * y en `InfoMedicamentoService` para obtener información adicional del medicamento.
 */
class MedicamentoService {
  // Instancia única del modelo Medicamento
  static objMedicamento = new Medicamento();
  // static objUsuario = new Usuario();

  /**
   * Obtiene todos los medicamentos registrados.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllMedicamentos() {
    try {
      // Obtenemos todos los medicamentos
      const medicamentos = await this.objMedicamento.getAll();

      // Validamos si no hay medicamentos registrados
      if (!medicamentos || medicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados",
        };

      // Obtenemos información adicional de cada medicamento (nombre)
      const infoMedicamentos = await Promise.all(
        medicamentos.map(async (medicamento) => {
          const { data: infoMedicamento } =
            await InfoMedicamentoService.getInfoMedicamentoById(
              medicamento.info_medicamento_id
            );
          // Retornamos el medicamento combinado con el nombre del infoMedicamento
          return { ...medicamento, nombre: infoMedicamento.nombre };
        })
      );

      // Retornamos la lista de medicamentos con información adicional
      return {
        error: false,
        code: 200,
        message: "Medicamentos obtenidos correctamente",
        data: infoMedicamentos,
      };
    } catch (error) {
      // Capturamos excepciones y retornamos error genérico
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un medicamento específico por su ID.
   * @param {number} id - Identificador del medicamento
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getMedicamentoById(id) {
    try {
      const medicamento = await this.objMedicamento.getById(id);

      if (!medicamento)
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento obtenido correctamente",
        data: medicamento,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo medicamento en la base de datos.
   * @param {Object} medicamento - Datos del medicamento a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createMedicamento(medicamento) {
    try {
      // Validamos que la info del medicamento exista
      const infoMedicamentoExistente =
        await InfoMedicamentoService.getInfoMedicamentoById(
          medicamento.info_medicamento_id
        );

      if (infoMedicamentoExistente.error) return infoMedicamentoExistente;

      // Validamos que no exista otro medicamento con el mismo número de lote
      const loteExistente = await this.objMedicamento.getByNumeroLote(
        medicamento.numero_lote
      );

      if (loteExistente && loteExistente.length !== 0)
        return {
          error: true,
          code: 400,
          message:
            "Este lote ya está registrado para el medicamento seleccionado",
        };

      // Creamos el medicamento
      const medicamentoCreado = await this.objMedicamento.create(medicamento);

      if (medicamentoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Medicamento",
        };

      return {
        error: false,
        code: 201,
        message: "Medicamento creado correctamente",
        data: medicamentoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un medicamento existente.
   * @param {number} id - ID del medicamento a actualizar
   * @param {Object} medicamento - Nuevos datos del medicamento
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateMedicamento(id, medicamento) {
    try {
      // Validamos que el medicamento exista
      const existente = await this.objMedicamento.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };
      }

      // Validamos que no exista otro medicamento con el mismo lote
      const loteExistente = await this.objMedicamento.getByNumeroLote(
        medicamento.numero_lote
      );

      if (
        loteExistente &&
        loteExistente.length !== 0 &&
        loteExistente[0].id != id
      )
        return {
          error: true,
          code: 400,
          message:
            "Este lote ya está registrado para el medicamento seleccionado",
        };

      // Ejecutamos la actualización
      const medicamentoActualizado = await this.objMedicamento.update(
        id,
        medicamento
      );

      if (medicamentoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Medicamento",
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento actualizado correctamente",
        data: medicamentoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un medicamento de la base de datos.
   * @param {number} id - ID del medicamento a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteMedicamento(id) {
    try {
      // Validamos que exista
      const medicamento = await this.objMedicamento.getById(id);
      if (!medicamento)
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };

      // Eliminamos el medicamento
      const medicamentoEliminado = await this.objMedicamento.delete(id);
      if (!medicamentoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Medicamento",
        };

      return {
        error: false,
        code: 200,
        message: "Medicamento eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todos los medicamentos asociados a un `info_medicamento_id`.
   * @param {number} info_medicamento_id - ID de la info del medicamento
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllMedicamentosByInfoMedicamentoId(info_medicamento_id) {
    try {
      const medicamentos = await this.objMedicamento.getAllByInfoMedicamentoId(
        info_medicamento_id
      );

      if (!medicamentos || medicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados con esa informacion",
        };

      // Obtenemos información adicional
      const infoMedicamentos = await Promise.all(
        medicamentos.map(async (medicamento) => {
          const { data: infoMedicamento } =
            await InfoMedicamentoService.getInfoMedicamentoById(
              medicamento.info_medicamento_id
            );
          return { ...medicamento, nombre: infoMedicamento.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Medicamentos obtenidos correctamente",
        data: infoMedicamentos,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todos los medicamentos con cantidad positiva en inventario.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllMedicamentosByCantidadPositiva() {
    try {
      const medicamentos = await this.objMedicamento.getAllByCantidadPositiva();

      if (!medicamentos || medicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados con cantidad positiva",
        };

      const infoMedicamentos = await Promise.all(
        medicamentos.map(async (medicamento) => {
          const { data: infoMedicamento } =
            await InfoMedicamentoService.getInfoMedicamentoById(
              medicamento.info_medicamento_id
            );
          return { ...medicamento, nombre: infoMedicamento.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Medicamentos obtenidos correctamente",
        data: infoMedicamentos,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MedicamentoService;
