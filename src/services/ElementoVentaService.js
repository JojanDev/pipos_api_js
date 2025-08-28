import ElementoVenta from "../models/ElementoVenta.js";
// import Usuario from "../models/Usuario.js";

class ElementoVentaService {
  static objElementoVenta = new ElementoVenta();
  // static objUsuario = new Usuario();

  static async getAllElementosVentas() {
    try {
      // Llamamos el método listar
      const elementosVentas = await this.objElementoVenta.getAll();

      // Validamos si no hay tipos de productos
      if (!elementosVentas || elementosVentas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay elementos de ventas registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Elementos de ventas obtenidos correctamente",
        data: elementosVentas,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getElementoVentaById(id) {
    try {
      // Llamamos el método consultar por ID
      const elementoVenta = await this.objElementoVenta.getById(id);
      // Validamos si no hay elementoVenta
      if (!elementoVenta)
        return {
          error: true,
          code: 404,
          message: "Elemento de venta no encontrado",
        };

      // Retornamos la elementoVenta obtenida
      return {
        error: false,
        code: 200,
        message: "Elemento de venta obtenido correctamente",
        data: elementoVenta,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createElementoVenta(elementoVenta) {
    try {
      // Llamamos el método crear
      const elementoVentaCreado = await this.objElementoVenta.create(
        elementoVenta
      );
      // Validamos si no se pudo crear el tipo de producto
      if (elementoVentaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Elemento de venta",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Elemento de venta creado correctamente",
        data: elementoVentaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateElementoVenta(id, elementoVenta) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objElementoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Elemento de venta no encontrada",
        };
      }

      // Llamamos el método actualizar
      const elementoVentaActualizado = await this.objElementoVenta.update(
        id,
        elementoVenta
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (elementoVentaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Elemento de venta",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Elemento de venta actualizado correctamente",
        data: elementoVentaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteElementoVenta(id) {
    try {
      // Llamamos el método consultar por ID
      const elementoVenta = await this.objElementoVenta.getById(id);
      // Validamos si el tipo de producto existe
      if (!elementoVenta)
        return {
          error: true,
          code: 404,
          message: "Elemento de venta no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByElementoVentaId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const elementoVentaEliminado = await this.objElementoVenta.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!elementoVentaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Elemento de venta",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Elemento de venta eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ElementoVentaService;
