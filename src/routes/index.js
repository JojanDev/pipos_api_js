// Importación de los módulos de rutas para diferentes entidades
// import elementos from './elementosRoutes.js'; // Rutas para la entidad 'elementos'
// import fotos from './fotosRoutes.js'; // Rutas para la entidad 'fotos'
// import reportes from './reportesRoutes.js'; // Rutas para la entidad 'reportes'
// import tiposElementos from './tiposElementosRoutes.js'; // Rutas para la entidad 'tipos de elementos'
// import estados from './estadosRoutes.js'; // Rutas para la entidad 'estados'
// import ambientes from './ambientesRoutes.js'; // Rutas para la entidad 'ambientes'
// import centros from './centrosRoutes.js'; // Rutas para la entidad 'centros'
// import inventarios from './inventariosRoutes.js'; // Rutas para la entidad 'inventarios'
// import rolesUsuarios from './rolesUsuariosRoutes.js'; // Rutas para la entidad 'roles de usuarios'
// import usuarios from './usuariosRoutes.js'; // Rutas para la entidad 'usuarios'
// import generos from './generosRoutes.js'; // Rutas para la entidad 'géneros'
// import fichas from './fichasRoutes.js'; // Rutas para la entidad 'fichas'
// import programaFormacion from './programasFormacion.js'; // Rutas para la entidad 'programas de formación'
import tiposDocumentos from "./tiposDocumentosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import especies from "./especiesRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import tiposProductos from "./tiposProductosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import infoMedicamentos from "./infosMedicamentosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import mascotas from "./mascotasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import antecedentes from "./antecedentesRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import tratamientos from "./tratamientosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import medicamentosTratamientos from "./medicamentosTratamientosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import razas from "./razasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import ventas from "./ventasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import medicamentosVentas from "./medicamentosVentasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import roles from "./rolesRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import permisos from "./permisosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import permisosRoles from "./permisosRolesRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import usuarios from "./usuariosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import rolesUsuarios from "./rolesUsuariosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import medicamentos from "./medicamentosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import servicios from "./serviciosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import productosVentas from "./productosVentasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import serviciosVentas from "./serviciosVentasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import productos from "./productosRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import auth from "./authRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import credenciales from "./credencialesRoutes.js"; // Rutas para la entidad 'tipos de documentos'
import usuariosVentas from "./usuariosVentasRoutes.js"; // Rutas para la entidad 'tipos de documentos'
// import permisosRoles from './permisosRolesRoutes.js'; // Rutas para la entidad 'permisos de roles'
// import permisos from './permisosRoutes.js'; // Rutas para la entidad 'permisos'
// import roles from './rolesRoutes.js'; // Rutas para la entidad 'roles'
// import auth from './authRoutes.js'; // Rutas para la autenticación

// Definición de las rutas de la API
const rutas = [
  { path: "/tipos-documentos", router: tiposDocumentos }, // Ruta para manejar tipos de documentos
  { path: "/especies", router: especies }, // Ruta para manejar tipos de documentos
  { path: "/tipos-productos", router: tiposProductos }, // Ruta para manejar tipos de documentos
  { path: "/info-medicamentos", router: infoMedicamentos }, // Ruta para manejar tipos de documentos
  { path: "/mascotas", router: mascotas }, // Ruta para manejar tipos de documentos
  { path: "/antecedentes", router: antecedentes }, // Ruta para manejar tipos de documentos
  { path: "/tratamientos", router: tratamientos }, // Ruta para manejar tipos de documentos
  { path: "/medicamentos-tratamientos", router: medicamentosTratamientos }, // Ruta para manejar tipos de documentos
  { path: "/razas", router: razas }, // Ruta para manejar tipos de documentos
  { path: "/ventas", router: ventas }, // Ruta para manejar tipos de documentos
  { path: "/medicamentos-ventas", router: medicamentosVentas }, // Ruta para manejar tipos de documentos
  { path: "/roles", router: roles }, // Ruta para manejar tipos de documentos
  { path: "/permisos", router: permisos }, // Ruta para manejar tipos de documentos
  { path: "/permisos-roles", router: permisosRoles }, // Ruta para manejar tipos de documentos
  { path: "/usuarios", router: usuarios }, // Ruta para manejar tipos de documentos
  { path: "/roles-usuarios", router: rolesUsuarios }, // Ruta para manejar tipos de documentos
  { path: "/medicamentos", router: medicamentos }, // Ruta para manejar tipos de documentos
  { path: "/servicios", router: servicios }, // Ruta para manejar tipos de documentos
  { path: "/productos-ventas", router: productosVentas }, // Ruta para manejar tipos de documentos
  { path: "/servicios-ventas", router: serviciosVentas }, // Ruta para manejar tipos de documentos
  { path: "/productos", router: productos }, // Ruta para manejar tipos de documentos
  { path: "/auth", router: auth }, // Ruta para manejar tipos de documentos
  { path: "/credenciales", router: credenciales }, // Ruta para manejar tipos de documentos
  { path: "/usuarios-ventas", router: usuariosVentas }, // Ruta para manejar tipos de documentos
];

// Exporta el array de rutas como valor por defecto del módulo
export default rutas;
