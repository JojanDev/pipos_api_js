import Producto from "../models/Producto.js";
// import Usuario from "../models/Usuario.js";

class ProductoService {
  static objProducto = new Producto();
  // static objUsuario = new Usuario();

  static async getAllProductos() {
    try {
      // Llamamos el método listar
      const productos = await this.objProducto.getAll();

      // Validamos si no hay tipos de productos
      if (!productos || productos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay productos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: productos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getProductoById(id) {
    try {
      // Llamamos el método consultar por ID
      const producto = await this.objProducto.getById(id);
      // Validamos si no hay producto
      if (!producto)
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
        };

      // Retornamos la producto obtenida
      return {
        error: false,
        code: 200,
        message: "Producto obtenido correctamente",
        data: producto,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createProducto(producto) {
    try {
      // Llamamos el método crear
      const productoCreado = await this.objProducto.create(producto);
      // Validamos si no se pudo crear el tipo de producto
      if (productoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Producto",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Producto creado correctamente",
        data: productoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateProducto(id, producto) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objProducto.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
        };
      }

      // Llamamos el método actualizar
      const productoActualizado = await this.objProducto.update(id, producto);
      // Validamos si no se pudo actualizar el tipo de producto
      if (productoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Producto",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Producto actualizado correctamente",
        data: productoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteProducto(id) {
    try {
      // Llamamos el método consultar por ID
      const producto = await this.objProducto.getById(id);
      // Validamos si el tipo de producto existe
      if (!producto)
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByProductoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const productoEliminado = await this.objProducto.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!productoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Producto",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Producto eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ProductoService;
