import Elemento from "../models/Elemento.js";
// import Usuario from "../models/Usuario.js";

class ElementoService {
  static objElemento = new Elemento();
  // static objUsuario = new Usuario();

  static async getAllElementos() {
    try {
      // Llamamos el método listar
      const elementos = await this.objElemento.getAll();

      // Validamos si no hay tipos de productos
      if (!elementos || elementos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay elementos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Elementos obtenidos correctamente",
        data: elementos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getElementoById(id) {
    try {
      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si no hay elemento
      if (!elemento)
        return {
          error: true,
          code: 404,
          message: "Elemento no encontrado",
        };

      // Retornamos la elemento obtenida
      return {
        error: false,
        code: 200,
        message: "Elemento obtenido correctamente",
        data: elemento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createElemento(elemento) {
    try {
      // Llamamos el método crear
      const elementoCreado = await this.objElemento.create(elemento);
      // Validamos si no se pudo crear el tipo de producto
      if (elementoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Elemento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Elemento creado correctamente",
        data: elementoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateElemento(id, elemento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objElemento.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Elemento no encontrado",
        };
      }

      // Llamamos el método actualizar
      const elementoActualizado = await this.objElemento.update(id, elemento);
      // Validamos si no se pudo actualizar el tipo de producto
      if (elementoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Elemento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Elemento actualizado correctamente",
        data: elementoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteElemento(id) {
    try {
      // Llamamos el método consultar por ID
      const elemento = await this.objElemento.getById(id);
      // Validamos si el tipo de producto existe
      if (!elemento)
        return {
          error: true,
          code: 404,
          message: "Elemento no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByElementoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const elementoEliminado = await this.objElemento.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!elementoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Elemento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Elemento eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default ElementoService;
