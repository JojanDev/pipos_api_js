import Especie from "../models/Especie.js";
import Raza from "../models/Raza.js";
import EspecieService from "./EspecieService.js";
import MascotaService from "./MascotaService.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con las razas de mascotas.
 *
 * Se apoya en los modelos `Raza` y `Especie` para interactuar con la base de datos.
 */
class RazaService {
  // Instancia única del modelo Raza
  static objRaza = new Raza();
  // Instancia única del modelo Especie
  static objEspecie = new Especie();

  /**
   * Obtiene todas las razas registradas.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllRazas() {
    try {
      const razas = await this.objRaza.getAll();

      if (!razas || razas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay razas registradas",
        };

      return {
        error: false,
        code: 200,
        message: "Razas obtenidas correctamente",
        data: razas,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una raza por su ID.
   * @param {number} id - Identificador de la raza
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getRazaById(id) {
    try {
      const raza = await this.objRaza.getById(id);

      if (!raza)
        return {
          error: true,
          code: 404,
          message: "Raza no encontrada",
        };

      // Obtenemos la especie asociada a la raza
      const especie = await EspecieService.getEspecieById(raza.especie_id);
      raza["especie"] = especie.data;

      return {
        error: false,
        code: 200,
        message: "Raza obtenida correctamente",
        data: raza,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva raza en la base de datos.
   * @param {Object} raza - Datos de la raza a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createRaza(raza) {
    try {
      // Validamos que la especie asociada exista
      const especieExistente = await EspecieService.getEspecieById(
        raza.especie_id
      );

      if (especieExistente.error) return especieExistente;

      // Creamos la raza
      const razaCreada = await this.objRaza.create(raza);

      if (razaCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la raza",
        };

      return {
        error: false,
        code: 201,
        message: "Raza creada correctamente",
        data: razaCreada,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una raza existente.
   * @param {number} id - ID de la raza a actualizar
   * @param {Object} raza - Nuevos datos de la raza
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updateRaza(id, raza) {
    try {
      // Validamos que la raza exista
      const existente = await this.objRaza.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Raza no encontrada",
        };
      }

      // Actualizamos la raza
      const razaActualizada = await this.objRaza.update(id, raza);

      if (razaActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la raza",
        };

      return {
        error: false,
        code: 200,
        message: "Raza actualizada correctamente",
        data: razaActualizada,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una raza de la base de datos.
   * @param {number} id - ID de la raza a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deleteRaza(id) {
    try {
      // Validamos que la raza exista
      const razas = await this.getRazaById(id);
      if (razas.error) return razas;

      // Validamos si hay mascotas asociadas a la raza antes de eliminar
      const mascotasAsociadas = await MascotaService.getAllMascotasByRazaId(id);
      if (!mascotasAsociadas.error)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la raza, tiene mascotas asociadas",
        };

      // Eliminamos la raza
      const razaEliminada = await this.objRaza.delete(id);
      if (!razaEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la raza",
        };

      return {
        error: false,
        code: 200,
        message: "Raza eliminada correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todas las razas asociadas a una especie específica.
   * @param {number} especie_id - ID de la especie
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllRazasByEspecieId(especie_id) {
    try {
      const raza = await this.objRaza.getAllByEspecieId(especie_id);

      if (!raza || raza.length === 0)
        return {
          error: true,
          code: 404,
          message: "Razas de especie no encontradas",
        };

      return {
        error: false,
        code: 200,
        message: "Razas de especie obtenidas correctamente",
        data: raza,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default RazaService;
