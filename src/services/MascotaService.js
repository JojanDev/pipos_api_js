import Antecedente from "../models/Antecedente.js";
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
  static objAntecedente = new Antecedente();

  /**
   * Obtiene todas las mascotas registradas y agrega información adicional
   * como cliente, raza, especie y fecha del último antecedente.
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de mascotas
   */
  static async getAllMascotas() {
    try {
      // Obtenemos todas las mascotas
      const mascotas = await this.objMascota.getAll();

      if (!mascotas || mascotas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay mascotas registradas",
        };

      // Enriquecemos la información de cada mascota con datos relacionados
      const mascotasInfo = await Promise.all(
        mascotas.map(async (mascota) => {
          // Obtenemos datos del usuario (cliente)
          const { nombre, apellido, telefono } = await this.objUsuario.getById(
            mascota.usuario_id
          );

          // Obtenemos la raza y especie de la mascota
          const raza = await this.objRaza.getById(mascota.raza_id);
          const especie = await this.objEspecie.getById(raza.especie_id);

          // Obtenemos la fecha del último antecedente médico registrado
          const ultimoAntecedente =
            await this.objAntecedente.getUltimoByMascotaId(mascota.id);
          const fecha_creado = ultimoAntecedente
            ? ultimoAntecedente.fecha_creado
            : null;

          return {
            ...mascota,
            cliente: `${nombre} ${apellido}`,
            telefono,
            raza: raza.nombre,
            especie: especie.nombre,
            ultimo_antecedente: fecha_creado || null,
          };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Mascotas obtenidas correctamente",
        data: mascotasInfo,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una mascota por su ID
   * @param {number} id - ID de la mascota
   * @returns {Promise<Object>} Respuesta con éxito o error y la mascota encontrada
   */
  static async getMascotaById(id) {
    try {
      const mascota = await this.objMascota.getById(id);
      if (!mascota)
        return {
          error: true,
          code: 404,
          message: "Mascota no encontrada",
        };

      // Obtenemos información de la raza mediante el servicio
      const raza = await RazaService.getRazaById(mascota.raza_id);
      mascota["raza"] = raza.data;

      return {
        error: false,
        code: 200,
        message: "Mascota obtenida correctamente",
        data: mascota,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva mascota
   * @param {Object} mascota - Datos de la mascota a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y la mascota creada
   */
  static async createMascota(mascota) {
    try {
      // Validamos que el usuario y la raza existan
      const usuarioExistente = await UsuarioService.getUsuarioById(
        mascota.usuario_id
      );
      if (usuarioExistente.error) return usuarioExistente;

      const razaExistente = await RazaService.getRazaById(mascota.raza_id);
      if (razaExistente.error) return razaExistente;

      // Creamos la mascota
      const mascotaCreado = await this.objMascota.create(mascota);
      if (!mascotaCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la mascota",
        };

      // Enriquecemos la información de la mascota creada
      const { nombre, apellido, telefono } = await this.objUsuario.getById(
        mascotaCreado.usuario_id
      );
      const raza = await this.objRaza.getById(mascotaCreado.raza_id);
      const especie = await this.objEspecie.getById(raza.especie_id);

      const mascotaInfo = {
        ...mascotaCreado,
        cliente: `${nombre} ${apellido}`,
        telefono,
        raza: raza.nombre,
        especie: especie.nombre,
      };

      return {
        error: false,
        code: 201,
        message: "Mascota creada correctamente",
        data: mascotaInfo,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una mascota existente
   * @param {number} id - ID de la mascota a actualizar
   * @param {Object} mascota - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y mascota actualizada
   */
  static async updateMascota(id, mascota) {
    try {
      const existente = await this.objMascota.getById(id);
      if (!existente)
        return { error: true, code: 404, message: "Mascota no encontrada" };

      // Validamos existencia del usuario y la raza
      const usuarioExistente = await UsuarioService.getUsuarioById(
        mascota.usuario_id
      );
      if (usuarioExistente.error) return usuarioExistente;

      const razaExistente = await RazaService.getRazaById(mascota.raza_id);
      if (razaExistente.error) return razaExistente;

      // Actualizamos la mascota
      const mascotaActualizado = await this.objMascota.update(id, mascota);
      if (!mascotaActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la mascota",
        };

      return {
        error: false,
        code: 200,
        message: "Mascota actualizada correctamente",
        data: mascotaActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una mascota por su ID
   * @param {number} id - ID de la mascota a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteMascota(id) {
    try {
      const mascota = await this.objMascota.getById(id);
      if (!mascota)
        return { error: true, code: 404, message: "Mascota no encontrada" };

      const mascotaEliminado = await this.objMascota.delete(id);
      if (!mascotaEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la mascota",
        };

      return {
        error: false,
        code: 200,
        message: "Mascota eliminada correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todas las mascotas de un usuario por su ID
   * @param {number} usuario_id - ID del usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de mascotas del usuario
   */
  static async getAllMascotasByUsuarioId(usuario_id) {
    try {
      const mascotas = await this.objMascota.getAllByUsuarioId(usuario_id);

      if (!mascotas || mascotas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay mascotas registradas para el cliente",
        };

      const mascotasInfo = await Promise.all(
        mascotas.map(async (mascota) => {
          const raza = await this.objRaza.getById(mascota.raza_id);
          const especie = await this.objEspecie.getById(raza.especie_id);
          return { ...mascota, raza: raza.nombre, especie: especie.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Mascotas del cliente obtenidas correctamente",
        data: mascotasInfo,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene todas las mascotas de una raza específica
   * @param {number} raza_id - ID de la raza
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de mascotas
   */
  static async getAllMascotasByRazaId(raza_id) {
    try {
      const mascotas = await this.objMascota.getAllByRazaId(raza_id);

      if (!mascotas || mascotas.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay mascotas registradas para la raza",
        };

      const mascotasInfo = await Promise.all(
        mascotas.map(async (mascota) => {
          const raza = await this.objRaza.getById(mascota.raza_id);
          const especie = await this.objEspecie.getById(raza.especie_id);
          return { ...mascota, raza: raza.nombre, especie: especie.nombre };
        })
      );

      return {
        error: false,
        code: 200,
        message: "Mascotas de raza obtenidas correctamente",
        data: mascotasInfo,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default MascotaService;
