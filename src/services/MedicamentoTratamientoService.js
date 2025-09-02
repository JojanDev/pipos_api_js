// import Usuario from "../models/Usuario.js";

import MedicamentoTratamiento from "../models/MedicamentoTratamiento.js";
import InfoMedicamentoService from "./InfoMedicamentoService.js";
import TratamientoService from "./TratamientoService.js";

class MedicamentoTratamientoService {
  static objMedicamentoTratamiento = new MedicamentoTratamiento();
  // static objUsuario = new Usuario();

  static async getAllMedicamentosTratamientos() {
    try {
      // Llamamos el método listar
      const medicamentosTratamientos =
        await this.objMedicamentoTratamiento.getAll();

      // Validamos si no hay tipos de productos
      if (!medicamentosTratamientos || medicamentosTratamientos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos de tratamientos registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Medicamentos de tratamientos obtenidos correctamente",
        data: medicamentosTratamientos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getMedicamentoTratamientoById(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamentoTratamiento =
        await this.objMedicamentoTratamiento.getById(id);
      // Validamos si no hay medicamentoTratamiento
      if (!medicamentoTratamiento)
        return {
          error: true,
          code: 404,
          message: "Medicamento de tratamiento no encontrado",
        };

      // Retornamos la medicamentoTratamiento obtenida
      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento obtenido correctamente",
        data: medicamentoTratamiento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createMedicamentoTratamiento(medicamentoTratamiento) {
    try {
      const tratamientoExistente = await TratamientoService.getTratamientoById(
        medicamentoTratamiento.tratamiento_id
      );

      if (tratamientoExistente.error) return tratamientoExistente;

      const infoMedicamentoExistente =
        await InfoMedicamentoService.getInfoMedicamentoById(
          medicamentoTratamiento.info_medicamento_id
        );

      if (infoMedicamentoExistente.error) return infoMedicamentoExistente;

      // Llamamos el método crear
      const medicamentoTratamientoCreado =
        await this.objMedicamentoTratamiento.create(medicamentoTratamiento);
      // Validamos si no se pudo crear el tipo de producto
      if (medicamentoTratamientoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Medicamento de tratamiento",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Medicamento de tratamiento creado correctamente",
        data: medicamentoTratamientoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateMedicamentoTratamiento(id, medicamentoTratamiento) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objMedicamentoTratamiento.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Medicamento de tratamiento no encontrado",
        };
      }

      // Llamamos el método actualizar
      const medicamentoTratamientoActualizado =
        await this.objMedicamentoTratamiento.update(id, medicamentoTratamiento);
      // Validamos si no se pudo actualizar el tipo de producto
      if (medicamentoTratamientoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Medicamento de tratamiento",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento actualizado correctamente",
        data: medicamentoTratamientoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteMedicamentoTratamiento(id) {
    try {
      // Llamamos el método consultar por ID
      const medicamentoTratamiento =
        await this.objMedicamentoTratamiento.getById(id);
      // Validamos si el tipo de producto existe
      if (!medicamentoTratamiento)
        return {
          error: true,
          code: 404,
          message: "Medicamento de tratamiento no encontrado",
        };

      // const usuariosTipo = await this.objUsuario.getAllByMedicamentoTratamientoId(id);
      // Validamos si no hay usuarios
      // if (usuariosTipo && usuariosTipo.length > 0) {
      //   return { error: true, code: 409, message: "No se puede eliminar el tipo de producto porque tiene usuarios asociados" };
      // }

      // Llamamos el método eliminar
      const medicamentoTratamientoEliminado =
        await this.objMedicamentoTratamiento.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!medicamentoTratamientoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Medicamento de tratamiento",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Medicamento de tratamiento eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllMedicamentosTratamientosByTratamientoId(tratamiento_id) {
    try {
      // Llamamos el método listar
      const medicamentosTratamiento =
        await this.objMedicamentoTratamiento.getAllByTratamientoId(
          tratamiento_id
        );

      // Validamos si no hay tipos de productos
      if (!medicamentosTratamiento || medicamentosTratamiento.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay medicamentos registrados para el tratamiento.",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Medicamentos del tratamiento obtenidos correctamente",
        data: medicamentosTratamiento,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MedicamentoTratamientoService;
