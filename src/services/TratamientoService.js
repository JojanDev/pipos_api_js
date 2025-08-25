// import Usuario from "../models/Usuario.js";
import Tratamiento from "../models/Tratamiento.js";

class TratamientoService {
  static objTratamiento = new Tratamiento();
  // static objUsuario = new Usuario();

  static async getAllTratamientos() {
    try {
      // Llamamos el método listar
      const tratamientos = await this.objTratamiento.getAll();

      // Validamos si no hay tipos de productos
      if (!tratamientos || tratamientos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tratamientos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Tratamientos obtenidos correctamente",
        data: tratamientos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getTratamientoById(id) {
    try {
      // Llamamos el método consultar por ID
      const tratamiento = await this.objTratamiento.getById(id);
      // Validamos si no hay tratamiento
      if (!tratamiento)
        return {
          error: true,
          code: 404,
          message: "Tratamiento no encontrado",
        };

      // Retornamos la tratamiento obtenida
      return {
        error: false,
        code: 200,
        message: "Tratamiento obtenido correctamente",
        data: tratamiento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createTratamiento(tratamiento) {
    try {
      // Llamamos el método crear
      const tratamientoCreado = await this.objTratamiento.create(
        tratamiento
      );
      // Validamos si no se pudo crear el tipo de producto
      if (tratamientoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el tratamiento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Tratamiento creado correctamente",
        data: tratamientoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateTratamiento(id, tratamiento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objTratamiento.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Tratamiento no encontrado",
        };
      }

      // Llamamos el método actualizar
      const tratamientoActualizado = await this.objTratamiento.update(
        id,
        tratamiento
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (tratamientoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tratamiento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Tratamiento actualizado correctamente",
        data: tratamientoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteTratamiento(id) {
    try {
      // Llamamos el método consultar por ID
      const tratamiento = await this.objTratamiento.getById(id);
      // Validamos si el tipo de producto existe
      if (!tratamiento)
        return {
          error: true,
          code: 404,
          message: "Tratamiento no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByTratamientoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const tratamientoEliminado = await this.objTratamiento.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!tratamientoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el tratamiento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Tratamiento eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default TratamientoService;
