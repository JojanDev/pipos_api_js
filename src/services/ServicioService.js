import Servicio from "../models/Servicio.js";
import ServicioVentaService from "./ServicioVentaService.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los servicios ofrecidos por la veterinaria.
 *
 * Se apoya en el modelo `Servicio` para interactuar con la base de datos
 * y en `ServicioVentaService` para validar relaciones con ventas.
 */
class ServicioService {
  // Instancia única del modelo Servicio
  static objServicio = new Servicio();

  /**
   * Obtiene todos los servicios registrados.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllServicios() {
    try {
      const servicios = await this.objServicio.getAll();

      if (!servicios || servicios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay servicios registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Servicios obtenidos correctamente",
        data: servicios,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un servicio por su ID.
   * @param {number} id - Identificador del servicio
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getServicioById(id) {
    try {
      const servicio = await this.objServicio.getById(id);

      if (!servicio)
        return {
          error: true,
          code: 404,
          message: "Servicio no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Servicio obtenido correctamente",
        data: servicio,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo servicio.
   * @param {Object} servicio - Datos del servicio a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createServicio(servicio) {
    try {
      const servicioCreado = await this.objServicio.create(servicio);

      if (servicioCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Servicio",
        };

      return {
        error: false,
        code: 201,
        message: "Servicio creado correctamente",
        data: servicioCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un servicio existente.
   * @param {number} id - ID del servicio a actualizar
   * @param {Object} servicio - Nuevos datos del servicio
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateServicio(id, servicio) {
    try {
      const existente = await this.objServicio.getById(id);

      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Servicio no encontrada",
        };
      }

      const servicioActualizado = await this.objServicio.update(id, servicio);

      if (servicioActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Servicio",
        };

      return {
        error: false,
        code: 200,
        message: "Servicio actualizado correctamente",
        data: servicioActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un servicio, previa validación de ventas asociadas.
   * @param {number} id - ID del servicio a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteServicio(id) {
    try {
      // Validamos que el servicio exista
      const servicio = await this.getServicioById(id);
      if (servicio.error) return servicio;

      // Validamos que no existan ventas asociadas
      const ventasAsociados =
        await ServicioVentaService.getAllServicioVentaByServicioId(id);

      if (!ventasAsociados.error)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el servicio, tiene ventas asociadas",
        };

      // Eliminamos el servicio
      const servicioEliminado = await this.objServicio.delete(id);

      if (!servicioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Servicio",
        };

      return {
        error: false,
        code: 200,
        message: "Servicio eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ServicioService;
