import Especie from "../models/Especie.js";
import RazaService from "./RazaService.js";
// import Usuario from "../models/Usuario.js";

class EspecieService {
  static objEspecie = new Especie();
  // static objUsuario = new Usuario();

  static async getAllEspecies() {
    try {
      // Llamamos el método listar
      const especies = await this.objEspecie.getAll();

      // Validamos si no hay tipos de documentos
      if (!especies || especies.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay especies registradas",
        };

      // const especiesRazas = await Promise.all(
      //   especies.map(async (especie) => {
      //     const razas = await RazaService.getAllRazasByEspecieId(especie.id);
      //     especie["razas"] = razas.data;
      //     return especie;
      //   })
      // );

      // Retornamos las tipos de documentos obtenidas
      return {
        error: false,
        code: 200,
        message: "Especies obtenidas correctamente",
        data: especies,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getEspecieById(id) {
    try {
      // Llamamos el método consultar por ID
      const especie = await this.objEspecie.getById(id);
      // Validamos si no hay especie
      if (!especie)
        return {
          error: true,
          code: 404,
          message: "Especie no encontrada",
        };

      // Retornamos la especie obtenida
      return {
        error: false,
        code: 200,
        message: "Especie obtenida correctamente",
        data: especie,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createEspecie(especie) {
    try {
      // Llamamos el método crear
      const especieCreada = await this.objEspecie.create(especie);
      // Validamos si no se pudo crear el tipo de documento
      if (especieCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la especie",
        };

      // Retornamos el tipo de documento creado
      return {
        error: false,
        code: 201,
        message: "Especie creada correctamente",
        data: especieCreada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateEspecie(id, especie) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objEspecie.getById(id);
      // Validamos si el tipo de documento existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Especie no encontrada",
        };
      }

      // Llamamos el método actualizar
      const especieActualizada = await this.objEspecie.update(id, especie);
      // Validamos si no se pudo actualizar el tipo de documento
      if (especieActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la especie",
        };

      // Retornamos el tipo de documento actualizado
      return {
        error: false,
        code: 200,
        message: "Especie actualizada correctamente",
        data: especieActualizada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteEspecie(id) {
    try {
      const especie = await this.getEspecieById(id);
      // Validamos si el tipo de producto existe
      if (especie.error) return especie;

      const razasAsociadas = await RazaService.getAllRazasByEspecieId(id);
      // Validamos si el tipo de producto existe
      if (!razasAsociadas.error)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la especie, tiene razas asociadas",
        };

      // Llamamos el método eliminar
      const especieEliminada = await this.objEspecie.delete(id);
      // Validamos si no se pudo eliminar el tipo de documento
      if (!especieEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la especie",
        };

      // Retornamos el tipo de documento eliminado
      return {
        error: false,
        code: 200,
        message: "Especie eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default EspecieService;
