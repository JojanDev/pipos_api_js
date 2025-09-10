// import Usuario from "../models/Usuario.js";
import RolUsuario from "../models/RolUsuario.js";
import Tratamiento from "../models/Tratamiento.js";
import AntecedenteService from "./AntecedenteService.js";
import MedicamentoTratamientoService from "./MedicamentoTratamientoService.js";
import RolUsuarioService from "./RolUsuarioService.js";
import UsuarioService from "./UsuarioService.js";

/**
 * Servicio para gestionar tratamientos médicos de mascotas.
 * Incluye métodos CRUD y consultas específicas por antecedente.
 */
class TratamientoService {
  static objTratamiento = new Tratamiento();
  static objRolUsuario = new RolUsuario();

  /**
   * Obtiene todos los tratamientos registrados.
   * @returns {Promise<Object>} Estado, código HTTP, mensaje y datos.
   */
  static async getAllTratamientos() {
    try {
      const tratamientos = await this.objTratamiento.getAll();

      if (!tratamientos || tratamientos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tratamientos registrados",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Tratamientos obtenidos correctamente",
        data: tratamientos,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene un tratamiento por su ID.
   * @param {number} id - ID del tratamiento.
   * @returns {Promise<Object>} Estado, código HTTP, mensaje y datos.
   */
  static async getTratamientoById(id) {
    try {
      const tratamiento = await this.objTratamiento.getById(id);

      if (!tratamiento)
        return {
          error: true,
          code: 404,
          message: "Tratamiento no encontrado",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Tratamiento obtenido correctamente",
        data: tratamiento,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Crea un nuevo tratamiento.
   * Valida que el usuario asignado sea un veterinario y que el antecedente exista.
   * @param {Object} tratamiento - Datos del tratamiento a crear.
   * @returns {Promise<Object>} Estado, código HTTP, mensaje y datos.
   */
  static async createTratamiento(tratamiento) {
    try {
      const usuarioExistente = await UsuarioService.getUsuarioById(
        tratamiento.usuario_id
      );
      if (usuarioExistente.error) return usuarioExistente;

      const rolesUsuario =
        await RolUsuarioService.getAllRolesUsuarioByUsuarioId(
          tratamiento.usuario_id
        );
      if (rolesUsuario.error) return usuarioExistente;

      const isVeterinario = rolesUsuario.data.some(
        (rolUsuario) => rolUsuario.rol_id === 2
      );
      if (!isVeterinario)
        return {
          error: true,
          code: 400,
          message: "El usuario asignado al tratamiento no es un veterinario",
          data: null,
        };

      const antecedenteExistente = await AntecedenteService.getAntecedenteById(
        tratamiento.antecedente_id
      );
      if (antecedenteExistente.error) return antecedenteExistente;

      const tratamientoCreado = await this.objTratamiento.create(tratamiento);
      if (!tratamientoCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 201,
        message: "Tratamiento creado correctamente",
        data: tratamientoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Actualiza un tratamiento existente.
   * @param {number} id - ID del tratamiento.
   * @param {Object} tratamiento - Nuevos datos del tratamiento.
   * @returns {Promise<Object>} Estado, código HTTP, mensaje y datos.
   */
  static async updateTratamiento(id, tratamiento) {
    try {
      const existente = await this.objTratamiento.getById(id);
      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Tratamiento no encontrado",
          data: null,
        };

      const tratamientoActualizado = await this.objTratamiento.update(
        id,
        tratamiento
      );
      if (!tratamientoActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Tratamiento actualizado correctamente",
        data: tratamientoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Elimina un tratamiento.
   * Solo permite eliminar si no tiene medicamentos asociados.
   * @param {number} id - ID del tratamiento.
   * @returns {Promise<Object>} Estado, código HTTP y mensaje.
   */
  static async deleteTratamiento(id) {
    try {
      const tratamiento = await this.getTratamientoById(id);
      if (tratamiento.error) return tratamiento;

      const medicamentosAsociados =
        await MedicamentoTratamientoService.getAllMedicamentosTratamientosByTratamientoId(
          id
        );
      if (!medicamentosAsociados.error)
        return {
          error: true,
          code: 400,
          message:
            "Error al eliminar el tratamiento, tiene medicamentos asociados",
          data: null,
        };

      const eliminado = await this.objTratamiento.delete(id);
      if (!eliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el tratamiento",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Tratamiento eliminado correctamente",
        data: null,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message, data: null };
    }
  }

  /**
   * Obtiene todos los tratamientos asociados a un antecedente específico.
   * @param {number} antecedente_id - ID del antecedente.
   * @returns {Promise<Object>} Estado, código HTTP, mensaje y datos.
   */
  static async getAllTratamientosByAntecedenteId(antecedente_id) {
    try {
      const tratamientosAntecedente =
        await this.objTratamiento.getAllByAntecedenteId(antecedente_id);
      if (!tratamientosAntecedente || tratamientosAntecedente.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tratamientos registrados para el antecedente.",
          data: null,
        };

      return {
        error: false,
        code: 200,
        message: "Tratamientos del Antecedente obtenidos correctamente",
        data: tratamientosAntecedente,
      };
    } catch (error) {
      console.error(error);
      return { error: true, code: 500, message: error.message, data: null };
    }
  }
}

export default TratamientoService;
