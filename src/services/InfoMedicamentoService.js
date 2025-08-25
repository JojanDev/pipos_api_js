import InfoMedicamento from "../models/InfoMedicamento.js";
// import Usuario from "../models/Usuario.js";

class InfoMedicamentoService {
  static objInfoMedicamento = new InfoMedicamento();
  // static objUsuario = new Usuario();

  static async getAllInfosMedicamentos() {
    try {
      // Llamamos el método listar
      const infosMedicamentos = await this.objInfoMedicamento.getAll();

      // Validamos si no hay tipos de productos
      if (!infosMedicamentos || infosMedicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay informacion de medicamentos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Informacion de medicamentos obtenidos correctamente",
        data: infosMedicamentos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getInfoMedicamentoById(id) {
    try {
      // Llamamos el método consultar por ID
      const infoMedicamento = await this.objInfoMedicamento.getById(id);
      // Validamos si no hay infoMedicamento
      if (!infoMedicamento)
        return {
          error: true,
          code: 404,
          message: "Informacion de medicamento no encontrado",
        };

      // Retornamos la infoMedicamento obtenida
      return {
        error: false,
        code: 200,
        message: "Informacion de medicamento obtenido correctamente",
        data: infoMedicamento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createInfoMedicamento(infoMedicamento) {
    try {
      // Llamamos el método crear
      const infoMedicamentoCreado = await this.objInfoMedicamento.create(
        infoMedicamento
      );
      // Validamos si no se pudo crear el tipo de producto
      if (infoMedicamentoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la informacion de medicamento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Informacion de medicamento creada correctamente",
        data: infoMedicamentoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateInfoMedicamento(id, infoMedicamento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objInfoMedicamento.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Informacion de medicamento no encontrada",
        };
      }

      // Llamamos el método actualizar
      const infoMedicamentoActualizado = await this.objInfoMedicamento.update(
        id,
        infoMedicamento
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (infoMedicamentoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la informacion del medicamento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Informacion de medicamento actualizada correctamente",
        data: infoMedicamentoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteInfoMedicamento(id) {
    try {
      // Llamamos el método consultar por ID
      const infoMedicamento = await this.objInfoMedicamento.getById(id);
      // Validamos si el tipo de producto existe
      if (!infoMedicamento)
        return {
          error: true,
          code: 404,
          message: "Informacion de medicamento no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByInfoMedicamentoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const infoMedicamentoEliminado = await this.objInfoMedicamento.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!infoMedicamentoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la informacion de medicamento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Informacion de medicamento eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default InfoMedicamentoService;
