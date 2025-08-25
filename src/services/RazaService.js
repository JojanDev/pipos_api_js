import Raza from "../models/Raza.js";
// import Usuario from "../models/Usuario.js";

class RazaService {
  static objRaza = new Raza();
  // static objUsuario = new Usuario();

  static async getAllRazas() {
    try {
      // Llamamos el método listar
      const razas = await this.objRaza.getAll();

      // Validamos si no hay tipos de productos
      if (!razas || razas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay razas registradas",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Razas obtenidas correctamente",
        data: razas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getRazaById(id) {
    try {
      // Llamamos el método consultar por ID
      const raza = await this.objRaza.getById(id);
      // Validamos si no hay raza
      if (!raza)
        return {
          error: true,
          code: 404,
          message: "Raza no encontrada",
        };

      // Retornamos la raza obtenida
      return {
        error: false,
        code: 200,
        message: "Raza obtenida correctamente",
        data: raza,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createRaza(raza) {
    try {
      // Llamamos el método crear
      const razaCreada = await this.objRaza.create(
        raza
      );
      // Validamos si no se pudo crear el tipo de producto
      if (razaCreada === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la raza",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Raza creada correctamente",
        data: razaCreada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateRaza(id, raza) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objRaza.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Raza no encontrada",
        };
      }

      // Llamamos el método actualizar
      const razaActualizada = await this.objRaza.update(
        id,
        raza
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (razaActualizada === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la raza",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Raza actualizada correctamente",
        data: razaActualizada,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteRaza(id) {
    try {
      // Llamamos el método consultar por ID
      const raza = await this.objRaza.getById(id);
      // Validamos si el tipo de producto existe
      if (!raza)
        return {
          error: true,
          code: 404,
          message: "Raza no encontrada",
        };

      // const usuariosTipo = await this.objUsuario.getAllByRazaId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const razaEliminada = await this.objRaza.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!razaEliminada)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la raza",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Raza eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default RazaService;
