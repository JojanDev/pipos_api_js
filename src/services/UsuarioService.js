import Usuario from "../models/Usuario.js";
import TipoDocumento from "../models/TipoDocumento.js";
import TipoDocumentoService from "./TipoDocumentoService.js";
import RolUsuario from "../models/RolUsuario.js";
import RolUsuarioService from "./RolUsuarioService.js";

class UsuarioService {
  static objUsuario = new Usuario();
  static objTipoDocumento = new TipoDocumento();
  static objTipoDocumentoService = new TipoDocumentoService();
  static objRolUsuario = new RolUsuario();

  static async getAllUsuarios() {
    try {
      // Llamamos el método listar
      const usuarios = await this.objUsuario.getAll();

      // Validamos si no hay tipos de productos
      if (!usuarios || usuarios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };

      // Retornamos las tipos de productos obtenidas
      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: usuarios,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuarioById(id) {
    try {
      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si no hay usuario
      if (!usuario)
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };

      // Retornamos la usuario obtenida
      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async createUsuario(usuario) {
    try {
      const tipoDocumentoExistente =
        await TipoDocumentoService.getTipoDocumentoById(
          usuario.tipo_documento_id
        );

      if (tipoDocumentoExistente.error) return tipoDocumentoExistente;

      if (await this.objUsuario.getByDocumento(usuario.numero_documento))
        return {
          error: true,
          code: 409,
          message: "El nombre de documento ya esta registrado.",
        };

      // Llamamos el método crear
      const usuarioCreado = await this.objUsuario.create(usuario);
      // Validamos si no se pudo crear el tipo de producto
      if (usuarioCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Usuario",
        };

      // Retornamos el tipo de producto creado
      return {
        error: false,
        code: 201,
        message: "Usuario creado correctamente",
        data: usuarioCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async updateUsuario(id, usuario) {
    try {
      // Llamamos el método consultar por ID
      const existente = await this.objUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrada",
        };
      }

      // Llamamos el método actualizar
      const usuarioActualizado = await this.objUsuario.update(id, usuario);
      // Validamos si no se pudo actualizar el tipo de producto
      if (usuarioActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Usuario",
        };

      // Retornamos el tipo de producto actualizado
      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: usuarioActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async deleteUsuario(id) {
    try {
      // Llamamos el método consultar por ID
      const usuario = await this.objUsuario.getById(id);
      // Validamos si el tipo de producto existe
      if (!usuario)
        return {
          error: true,
          code: 404,
          message: "Usuario no encontrado",
        };

      // Llamamos el método eliminar
      const usuarioEliminado = await this.objUsuario.delete(id);
      // Validamos si no se pudo eliminar el tipo de producto
      if (!usuarioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Usuario",
        };

      // Retornamos el tipo de producto eliminado
      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuariosClientes() {
    try {
      // Llamamos el método listar
      const usuarios = await this.getAllUsuarios();
      // Validamos si no hay usuarios
      if (usuarios.error) return usuarios;

      const usuariosCliente = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.some((rolUsuario) => rolUsuario.rol_id === 3)
              ? usuario
              : null;
          })
        )
      ).filter((usuario) => usuario);

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: `Usuarios clientes obtenidos correctamente`,
        data: usuariosCliente.map(
          (usuario) => usuario
          // ({
          //   id: usuario.id,
          //   documento: usuario.documento,
          //   nombre: usuario.nombres.split(" ")[0] + " " + usuario.apellidos.split(" ")[0]
          // })
        ),
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getUsuariosVeterinarios() {
    try {
      // Llamamos el método listar
      const usuarios = await this.getAllUsuarios();
      // Validamos si no hay usuarios
      if (usuarios.error) return usuarios;

      const usuariosVeterinarios = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.some((rolUsuario) => rolUsuario.rol_id === 2)
              ? usuario
              : null;
          })
        )
      ).filter((usuario) => usuario);

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: `Usuarios clientes obtenidos correctamente`,
        data: usuariosVeterinarios.map(
          (usuario) => usuario
          // ({
          //   id: usuario.id,
          //   documento: usuario.documento,
          //   nombre: usuario.nombres.split(" ")[0] + " " + usuario.apellidos.split(" ")[0]
          // })
        ),
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllUsuariosNoClientes() {
    try {
      // Llamamos el método listar
      const usuarios = await this.getAllUsuarios();
      // Validamos si no hay usuarios
      if (usuarios.error) return usuarios;

      const usuariosNoClientes = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );

            return rolesUsuario.every((rol) => rol.rol_id !== 3)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: `Usuarios clientes obtenidos correctamente`,
        data: usuariosNoClientes,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllUsuariosEmpleados() {
    try {
      // Llamamos el método listar
      const usuarios = await this.getAllUsuarios();
      // Validamos si no hay usuarios
      if (usuarios.error) return usuarios;

      const usuariosEmpleados = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );

            return rolesUsuario.some(
              (rol) => rol.rol_id !== 3 && rol.rol_id !== 1
            )
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: `Usuarios empleados obtenidos correctamente`,
        data: usuariosEmpleados,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  static async getAllUsuariosNoEmpleados() {
    try {
      // Llamamos el método listar
      const usuarios = await this.getAllUsuarios();
      // Validamos si no hay usuarios
      if (usuarios.error) return usuarios;

      const usuariosNoEmpleados = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );

            return rolesUsuario.every((rol) => rol.rol_id !== 2)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: `Usuarios no empleados obtenidos correctamente`,
        data: usuariosNoEmpleados,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default UsuarioService;
