import TipoProducto from "../models/TipoProducto.js";
import ProductoService from "./ProductoService.js";
// import Usuario from "../models/Usuario.js";

class TipoProductoService {
  static objTipoProducto = new TipoProducto();
  // static objUsuario = new Usuario();

  static async getAllTiposProductos() {
    try {
      // Llamamos el método listar
      const tiposProductos = await this.objTipoProducto.getAll();

      // Validamos si no hay tipos de productos
      if (!tiposProductos || tiposProductos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tipos de productos registradas",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Tipos de productos obtenidos correctamente",
        data: tiposProductos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getTipoProductoById(id) {
    try {
      // Llamamos el método consultar por ID
      const tipoProducto = await this.objTipoProducto.getById(id);
      // Validamos si no hay tipoProducto
      if (!tipoProducto)
        return {
          error: true,
          code: 404,
          message: "Tipo de producto no encontrado",
        };

      // Retornamos la tipoProducto obtenida
      return {
        error: false,
        code: 200,
        message: "Tipo de producto obtenido correctamente",
        data: tipoProducto,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createTipoProducto(tipoProducto) {
    try {
      // Llamamos el método crear
      const tipoProductoCreado = await this.objTipoProducto.create(
        tipoProducto
      );
      // Validamos si no se pudo crear el tipo de producto
      if (tipoProductoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de producto",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Tipo de producto creado correctamente",
        data: tipoProductoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateTipoProducto(id, tipoProducto) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objTipoProducto.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Tipo de producto no encontrado",
        };
      }

      // Llamamos el método actualizar
      const tipoProductoActualizado = await this.objTipoProducto.update(
        id,
        tipoProducto
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (tipoProductoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de producto",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Tipo de producto actualizado correctamente",
        data: tipoProductoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteTipoProducto(id) {
    try {
      // Llamamos el método consultar por ID
      const tipoProductoExistente = await this.getTipoProductoById(id);
      // Validamos si el tipo de producto existe
      if (tipoProductoExistente.error) return tipoProductoExistente;

      const productosAsociados =
        await ProductoService.getAllProductosByTipoProductoId(id);
      // Validamos si el tipo de producto existe
      if (!productosAsociados.error)
        return {
          error: true,
          code: 400,
          message:
            "Error al eliminar el tipo de producto, tiene productos asociados",
        };

      // const usuariosTipo = await this.objUsuario.getAllByTipoProductoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const tipoProductoEliminado = await this.objTipoProducto.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!tipoProductoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el tipo de producto",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Tipo de producto eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default TipoProductoService;
