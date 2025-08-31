import Especie from "../models/Especie.js";
import Mascota from "../models/Mascota.js";
import Raza from "../models/Raza.js";
import Usuario from "../models/Usuario.js";
import RazaService from "./RazaService.js";
import UsuarioService from "./UsuarioService.js";

class MascotaService {
  static objMascota = new Mascota();
  static objUsuario = new Usuario();
  static objRaza = new Raza();
  static objEspecie = new Especie();

  static async getAllMascotas() {
    try {
      // Llamamos el método listar
      const mascotas = await this.objMascota.getAll();

      // Validamos si no hay tipos de productos
      if (!mascotas || mascotas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay mascotas registradas",
        };

      const mascotasInfo = await Promise.all(
        mascotas.map(async (mascota) => {
          const user = await this.objUsuario.getById(mascota.usuario_id);
          const raza = await this.objRaza.getById(mascota.raza_id);
          const especie = await this.objEspecie.getById(raza.especie_id);
          mascota["cliente"] = user.nombre;
          mascota["telefono"] = user.telefono;
          mascota["raza"] = raza.nombre;
          mascota["especie"] = especie.nombre;
          return mascota;
        })
      );

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Mascotas obtenidas correctamente",
        data: mascotasInfo,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getMascotaById(id) {
    try {
      // Llamamos el método consultar por ID
      const mascota = await this.objMascota.getById(id);
      // Validamos si no hay mascota
      if (!mascota)
        return {
          error: true,
          code: 404,
          message: "Mascota no encontrada",
        };

      const raza = await RazaService.getRazaById(mascota.raza_id);
      mascota["raza"] = raza.data;

      // Retornamos la mascota obtenida
      return {
        error: false,
        code: 200,
        message: "Mascota obtenida correctamente",
        data: mascota,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createMascota(mascota) {
    try {
      const usuarioExistente = await UsuarioService.getUsuarioById(
        mascota.usuario_id
      );

      if (usuarioExistente.error) return usuarioExistente;

      const razaExistente = await RazaService.getRazaById(mascota.raza_id);

      if (razaExistente.error) return razaExistente;

      // Llamamos el método crear
      const mascotaCreado = await this.objMascota.create(mascota);
      // Validamos si no se pudo crear el tipo de producto
      if (mascotaCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear la mascota",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Mascota creada correctamente",
        data: mascotaCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateMascota(id, mascota) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objMascota.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Mascota no encontrada",
        };
      }

      // Llamamos el método actualizar
      const mascotaActualizado = await this.objMascota.update(id, mascota);
      // Validamos si no se pudo actualizar el tipo de producto
      if (mascotaActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la mascota",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Mascota actualizada correctamente",
        data: mascotaActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteMascota(id) {
    try {
      // Llamamos el método consultar por ID
      const mascota = await this.objMascota.getById(id);
      // Validamos si el tipo de producto existe
      if (!mascota)
        return {
          error: true,
          code: 404,
          message: "Mascota no encontrada",
        };

      // Llamamos el método eliminar
      const mascotaEliminado = await this.objMascota.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!mascotaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la mascota",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Mascota eliminada correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MascotaService;
