import Medicamento from "../models/Medicamento.js";
import InfoMedicamentoService from "./InfoMedicamentoService.js";
// import Usuario from "../models/Usuario.js";

class MedicamentoService {
  static objMedicamento = new Medicamento();
  // static objUsuario = new Usuario();

  static async getAllMedicamentos() {
    try {
      // Llamamos el método listar
      const medicamentos = await this.objMedicamento.getAll();

      // Validamos si no hay tipos de productos
      if (!medicamentos || medicamentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Medicamentos obtenidos correctamente",
        data: medicamentos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getMedicamentoById(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamento = await this.objMedicamento.getById(id);
      // Validamos si no hay medicamento
      if (!medicamento)
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };

      // Retornamos la medicamento obtenida
      return {
        error: false,
        code: 200,
        message: "Medicamento obtenido correctamente",
        data: medicamento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createMedicamento(medicamento) {
    try {
      const infoMedicamentoExistente =
        await InfoMedicamentoService.getInfoMedicamentoById(
          medicamento.info_medicamento_id
        );

      if (infoMedicamentoExistente.error) return infoMedicamentoExistente;

      const loteExistente = await this.objMedicamento.create(medicamento);
      // Validamos si no se pudo crear el tipo de producto
      if (loteExistente || loteExistente.length !== 0)
        return {
          error: true,
          code: 400,
          message:
            "Este lote ya está registrado para el medicamento seleccionado",
        };

      // Llamamos el método crear
      const medicamentoCreado = await this.objMedicamento.create(medicamento);
      // Validamos si no se pudo crear el tipo de producto
      if (medicamentoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Medicamento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Medicamento creado correctamente",
        data: medicamentoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateMedicamento(id, medicamento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objMedicamento.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };
      }

      // Llamamos el método actualizar
      const medicamentoActualizado = await this.objMedicamento.update(
        id,
        medicamento
      );
      // Validamos si no se pudo actualizar el tipo de producto
      if (medicamentoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Medicamento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Medicamento actualizado correctamente",
        data: medicamentoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteMedicamento(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamento = await this.objMedicamento.getById(id);
      // Validamos si el tipo de producto existe
      if (!medicamento)
        return {
          error: true,
          code: 404,
          message: "Medicamento no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByMedicamentoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const medicamentoEliminado = await this.objMedicamento.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!medicamentoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Medicamento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Medicamento eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MedicamentoService;
