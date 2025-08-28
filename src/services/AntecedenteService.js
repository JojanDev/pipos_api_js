import Antecedente from "../models/Antecedente.js";
import Mascota from "../models/Mascota.js";
// import Usuario from "../models/Usuario.js";

class AntecedenteService {
  static objAntecedente = new Antecedente();
  static objMascota = new Mascota();

  static async getAllAntecedentes() {
    try {
      // Llamamos el método listar
      const antecedentes = await this.objAntecedente.getAll();

      // Validamos si no hay tipos de productos
      if (!antecedentes || antecedentes.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay antecedentes registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Antecedentes obtenidos correctamente",
        data: antecedentes,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAntecedenteById(id) {
    try {
      // Llamamos el método consultar por ID
      const antecedente = await this.objAntecedente.getById(id);
      // Validamos si no hay antecedente
      if (!antecedente)
        return {
          error: true,
          code: 404,
          message: "Antecedente no encontrado",
        };

      // Retornamos la antecedente obtenida
      return {
        error: false,
        code: 200,
        message: "Antecedente obtenido correctamente",
        data: antecedente,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createAntecedente(antecedente) {
    try {
      const mascotaExistente = await this.objMascota.getById(antecedente.mascota_id);

      if (!mascotaExistente)
        return { error: true, code: 409, message: mascotaExistente.message};

      // Llamamos el método crear
      const antecedenteCreado = await this.objAntecedente.create(
        antecedente
      );
      // Validamos si no se pudo crear el tipo de producto
      if (antecedenteCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el antecedente",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Antecedente creado correctamente",
        data: antecedenteCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateAntecedente(id, antecedente) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objAntecedente.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Antecedente no encontrada",
        };
      }

      // Llamamos el método actualizar
      const antecedenteActualizado = await this.objAntecedente.update(
        id,
        antecedente
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (antecedenteActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el antecedente",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Antecedente actualizado correctamente",
        data: antecedenteActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteAntecedente(id) {
    try {
      // Llamamos el método consultar por ID
      const antecedente = await this.objAntecedente.getById(id);
      // Validamos si el tipo de producto existe
      if (!antecedente)
        return {
          error: true,
          code: 404,
          message: "Antecedente no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByAntecedenteId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const antecedenteEliminado = await this.objAntecedente.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!antecedenteEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el antecedente",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Antecedente eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default AntecedenteService;
