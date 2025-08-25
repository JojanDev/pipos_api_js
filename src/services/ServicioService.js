import Servicio from "../models/Servicio.js";
// import Usuario from "../models/Usuario.js";

class ServicioService {
  static objServicio = new Servicio();
  // static objUsuario = new Usuario();

  static async getAllServicios() {
    try {
      // Llamamos el método listar
      const servicios = await this.objServicio.getAll();

      // Validamos si no hay tipos de productos
      if (!servicios || servicios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay servicios registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Servicios obtenidos correctamente",
        data: servicios,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getServicioById(id) {
    try {
      // Llamamos el método consultar por ID
      const servicio = await this.objServicio.getById(id);
      // Validamos si no hay servicio
      if (!servicio)
        return {
          error: true,
          code: 404,
          message: "Servicio no encontrado",
        };

      // Retornamos la servicio obtenida
      return {
        error: false,
        code: 200,
        message: "Servicio obtenido correctamente",
        data: servicio,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createServicio(servicio) {
    try {
      // Llamamos el método crear
      const servicioCreado = await this.objServicio.create(
        servicio
      );
      // Validamos si no se pudo crear el tipo de producto
      if (servicioCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Servicio",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Servicio creado correctamente",
        data: servicioCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateServicio(id, servicio) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objServicio.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Servicio no encontrada",
        };
      }

      // Llamamos el método actualizar
      const servicioActualizado = await this.objServicio.update(
        id,
        servicio
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (servicioActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Servicio",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Servicio actualizado correctamente",
        data: servicioActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteServicio(id) {
    try {
      // Llamamos el método consultar por ID
      const servicio = await this.objServicio.getById(id);
      // Validamos si el tipo de producto existe
      if (!servicio)
        return {
          error: true,
          code: 404,
          message: "Servicio no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByServicioId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const servicioEliminado = await this.objServicio.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!servicioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Servicio",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Servicio eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ServicioService;
