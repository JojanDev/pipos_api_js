import Especie from "../models/Especie.js";
import RazaService from "./RazaService.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con las especies.
 *
 * Se apoya en el modelo `Especie` para interactuar con la base de datos
 * y en `RazaService` para validar dependencias de especies con razas.
 */
class EspecieService {
  // Instancia única del modelo de especie para usar en todo el servicio
  static objEspecie = new Especie();
  // static objUsuario = new Usuario();

  /**
   * Obtiene todas las especies registradas en la base de datos.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllEspecies() {
    try {
      // Ejecutamos el método del modelo para traer todas las especies
      const especies = await this.objEspecie.getAll();

      // Validamos si no se encontraron especies
      if (!especies || especies.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay especies registradas",
        };

      // Retornamos la lista de especies obtenida
      return {
        error: false,
        code: 200,
        message: "Especies obtenidas correctamente",
        data: especies,
      };
    } catch (error) {
      // Capturamos cualquier excepción y retornamos error genérico
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una especie específica por su ID.
   * @param {number} id - Identificador de la especie a consultar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getEspecieById(id) {
    try {
      // Consultamos la especie en el modelo
      const especie = await this.objEspecie.getById(id);

      // Validamos si no existe
      if (!especie)
        return {
          error: true,
          code: 404,
          message: "Especie no encontrada",
        };

      // Retornamos la especie encontrada
      return {
        error: false,
        code: 200,
        message: "Especie obtenida correctamente",
        data: especie,
      };
    } catch (error) {
      // Capturamos cualquier excepción y retornamos error genérico
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva especie en la base de datos.
   * @param {Object} especie - Datos de la especie a registrar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createEspecie(especie) {
    try {
      // Ejecutamos el método crear del modelo
      const especieCreada = await this.objEspecie.create(especie);

      // Validamos si la creación falló
      if (especieCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la especie",
        };

      // Retornamos la especie creada
      return {
        error: false,
        code: 201,
        message: "Especie creada correctamente",
        data: especieCreada,
      };
    } catch (error) {
      // Capturamos cualquier excepción y retornamos error genérico
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una especie existente por su ID.
   * @param {number} id - Identificador de la especie a actualizar
   * @param {Object} especie - Nuevos datos para la especie
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateEspecie(id, especie) {
    try {
      // Validamos si la especie existe antes de actualizar
      const existente = await this.objEspecie.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Especie no encontrada",
        };
      }

      // Ejecutamos la actualización
      const especieActualizada = await this.objEspecie.update(id, especie);

      // Validamos si la actualización falló
      if (especieActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la especie",
        };

      // Retornamos la especie actualizada
      return {
        error: false,
        code: 200,
        message: "Especie actualizada correctamente",
        data: especieActualizada,
      };
    } catch (error) {
      // Capturamos cualquier excepción y retornamos error genérico
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una especie de la base de datos.
   * Antes de eliminar, se valida que no tenga razas asociadas.
   * @param {number} id - Identificador de la especie a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteEspecie(id) {
    try {
      // Validamos si la especie existe
      const especie = await this.getEspecieById(id);
      if (especie.error) return especie;

      // Validamos si la especie tiene razas asociadas
      const razasAsociadas = await RazaService.getAllRazasByEspecieId(id);
      if (!razasAsociadas.error)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la especie, tiene razas asociadas",
        };

      // Ejecutamos el método eliminar en el modelo
      const especieEliminada = await this.objEspecie.delete(id);

      // Validamos si no se eliminó correctamente
      if (!especieEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la especie",
        };

      // Retornamos confirmación de eliminación
      return {
        error: false,
        code: 200,
        message: "Especie eliminada correctamente",
      };
    } catch (error) {
      // Capturamos cualquier excepción y retornamos error genérico
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default EspecieService;
