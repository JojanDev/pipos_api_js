import Antecedente from "../models/Antecedente.js";
import MascotaService from "./MascotaService.js";
import TratamientoService from "./TratamientoService.js";

/**
 * Servicio de gestión de antecedentes de mascotas.
 * Contiene métodos para CRUD y consultas específicas.
 */
class AntecedenteService {
  static objAntecedente = new Antecedente();

  /**
   * Obtiene todos los antecedentes registrados en la base de datos.
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async getAllAntecedentes() {
    try {
      const antecedentes = await this.objAntecedente.getAll();

      // Validamos si hay antecedentes
      if (!antecedentes || antecedentes.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay antecedentes registrados",
          data: null,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Antecedentes obtenidos correctamente",
        data: antecedentes,
      };
    } catch (error) {
      // Retorno en caso de excepción
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene un antecedente por su ID.
   * @param {number} id - ID del antecedente a consultar
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async getAntecedenteById(id) {
    try {
      const antecedente = await this.objAntecedente.getById(id);

      // Validamos si el antecedente existe
      if (!antecedente) {
        return {
          error: true,
          code: 404,
          message: "Antecedente no encontrado",
          data: null,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Antecedente obtenido correctamente",
        data: antecedente,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo antecedente asociado a una mascota.
   * @param {Object} antecedente - Datos del antecedente a crear
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async createAntecedente(antecedente) {
    try {
      // Validamos que la mascota exista
      const mascotaExistente = await MascotaService.getMascotaById(
        antecedente.mascota_id
      );
      if (mascotaExistente.error) return mascotaExistente;

      // Creamos el antecedente
      const antecedenteCreado = await this.objAntecedente.create(antecedente);

      if (!antecedenteCreado) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el antecedente",
          data: null,
        };
      }

      return {
        error: false,
        code: 201,
        message: "Antecedente creado correctamente",
        data: antecedenteCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un antecedente existente.
   * @param {number} id - ID del antecedente a actualizar
   * @param {Object} antecedente - Nuevos datos del antecedente
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async updateAntecedente(id, antecedente) {
    try {
      // Verificamos que el antecedente exista
      const existente = await this.objAntecedente.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Antecedente no encontrado",
          data: null,
        };
      }

      // Actualizamos el antecedente
      const antecedenteActualizado = await this.objAntecedente.update(
        id,
        antecedente
      );

      if (!antecedenteActualizado) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el antecedente",
          data: null,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Antecedente actualizado correctamente",
        data: antecedenteActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un antecedente.
   * @param {number} id - ID del antecedente a eliminar
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async deleteAntecedente(id) {
    try {
      // Verificamos que exista
      const antecedenteExistente = await this.getAntecedenteById(id);
      if (antecedenteExistente.error) return antecedenteExistente;

      // Revisamos si tiene tratamientos asociados
      const tratamientosAsociados =
        await TratamientoService.getAllTratamientosByAntecedenteId(id);
      if (
        !tratamientosAsociados.error &&
        tratamientosAsociados.data.length > 0
      ) {
        return {
          error: true,
          code: 400,
          message:
            "No se puede eliminar el antecedente, tiene tratamientos asociados",
          data: null,
        };
      }

      // Eliminamos el antecedente
      const antecedenteEliminado = await this.objAntecedente.delete(id);
      if (!antecedenteEliminado) {
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el antecedente",
          data: null,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Antecedente eliminado correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los antecedentes de una mascota.
   * @param {number} mascotaId - ID de la mascota
   * @returns {Promise<Object>} Objeto con información de error, código, mensaje y datos.
   */
  static async getAntecedentesByMascotaId(mascotaId) {
    try {
      const antecedentesMascota = await this.objAntecedente.getAllByMascotaId(
        mascotaId
      );

      if (!antecedentesMascota || antecedentesMascota.length === 0) {
        return {
          error: true,
          code: 404,
          message: "La mascota no tiene antecedentes registrados",
          data: null,
        };
      }

      return {
        error: false,
        code: 200,
        message: "Antecedentes de la mascota obtenidos correctamente",
        data: antecedentesMascota,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default AntecedenteService;
