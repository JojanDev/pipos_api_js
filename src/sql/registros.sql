INSERT INTO tipos_documentos (nombre) VALUES
  ('Cédula de ciudadanía'),
  ('Cédula de extranjería'),
  ('Tarjeta de identidad'),
  ('Pasaporte'),
  ('Registro civil');

INSERT INTO roles (nombre, descripcion) VALUES
  ('Administrador', 'Acceso total al sistema'),
  ('Veterinario', 'Gestión parcial del sistema'),
  ('Cliente', 'Este rol no accede directamente al sistema, pero es referenciado o gestionado.');
select * from roles;
INSERT INTO especies (nombre) VALUES
  ('Perro'),
  ('Gato'),
  ('Ave'),
  ('Reptil'),
  ('Roedor');

INSERT INTO tipos_productos (nombre) VALUES
  ('Alimento'),
  ('Accesorio'),
  ('Higiene'),
  ('Juguete');

INSERT INTO info_medicamentos (nombre, uso_general, via_administracion, presentacion, informacion_adicional) VALUES
  ('Amoxicilina', 'Antibiótico de amplio espectro', 'Oral', 'Tabletas 500 mg', 'Tomar con alimento'),
  ('Metronidazol', 'Antiprotozoario y antibacteriano', 'Oral', 'Suspensión 100 mg/5 ml', 'Agitar antes de usar'),
  ('Carprofeno', 'Antiinflamatorio no esteroideo', 'Oral', 'Tabletas 50 mg', 'Evitar uso prolongado'),
  ('Ivermectina', 'Antiparasitario', 'Oral', 'Tabletas 6 mg', 'No administrar en cachorros menores de 6 semanas'),
  ('Doxiciclina', 'Antibiótico tetraciclina', 'Oral', 'Cápsulas 100 mg', 'No tomar con lácteos');

INSERT INTO usuarios (tipo_documento_id, numero_documento, nombre, telefono, correo, direccion) VALUES
  (1, '100200300', 'Johan Sebastian Delgado Mantilla', '3121002001', 'jlopez@mail.com', 'Calle 10 #20-30'),
  (2, 'E12345678', 'María García', '3165004002', 'mgarcia@mail.com', 'Carrera 5 #50-15'),
  (3, '800900800', 'Pedro Martínez', '3107008003', 'pmartinez@mail.com', 'Av. Colombia #100-40'),
  (4, 'P9876543', 'Luisa Rodríguez', '3149001004', 'lrodriguez@mail.com', 'Diagonal 25 #75-60'),
  (5, 'RC102030', 'Ana Gómez', '3153002005', 'agomez@mail.com', 'Transversal 8 #33-22');

INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 4),
  (3, 5);

INSERT INTO credenciales (usuario_id, usuario, contrasena) VALUES
  (1, 'johan', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
  (2, 'maria', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
  (3, 'martinez', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW');

INSERT INTO permisos_roles (permiso_id, rol_id) VALUES
  (6, 1),   -- mascota.*
(7, 1),   -- usuario.view
(8, 1),   -- usuario.read
(9, 1),   -- usuario.create
(11, 1),  -- usuario.create-client
(12, 1),  -- usuario.create-personal
(13, 1),  -- usuario.disable
(14, 1),  -- usuario.change-state
(16, 1),  -- credencial.read
(17, 1),  -- credencial.create
(24, 1),  -- rol-usuario.*
(29, 1),  -- rol.*
(34, 1),  -- permiso.*
(39, 1),  -- permiso-rol.*
(45, 1),  -- tratamiento.*
(51, 1),  -- venta.*
(56, 1),  -- medicamento-venta.*
(61, 1),  -- producto-venta.*
(66, 1),  -- servicio-venta.*
(72, 1),  -- medicamento.*
(78, 1),  -- antecedente.*
(84, 1),  -- medicamento-tratamiento.*
(90, 1),  -- info-medicamento.*
(96, 1),  -- producto.*
(102, 1), -- servicio.*
(108, 1), -- raza.*
(114, 1), -- especie.*
(119, 1), -- tipo-documento.*
(124, 1), -- tipo-producto.*
(125, 1), -- usuario.update-client
(126, 1), -- usuario.view-client

-- Todos los .read (incluidos credenciales, permisos y permisos-roles)
(5, 1),   -- mascota.read
(20, 1),  -- rol-usuario.read
(25, 1),  -- rol.read
(30, 1),  -- permiso.read
(35, 1),  -- permiso-rol.read
(41, 1),  -- tratamiento.read
(47, 1),  -- venta.read
(52, 1),  -- medicamento-venta.read
(57, 1),  -- producto-venta.read
(62, 1),  -- servicio-venta.read
(68, 1),  -- medicamento.read
(74, 1),  -- antecedente.read
(80, 1),  -- medicamento-tratamiento.read
(86, 1),  -- info-medicamento.read
(92, 1),  -- producto.read
(98, 1),  -- servicio.read
(104, 1), -- raza.read
(110, 1), -- especie.read
(115, 1), -- tipo-documento.read
(127, 1),

  (6, 2), (126,2), (11,2),(125,2),
(40,2),(41,2),(42,2),(43,2),(46,2),(47,2),(48,2),(49,2),
(52,2),(53,2),
(57,2), (58,2),
(62,2), (63,2),
(67,2), (68,2),
(73,2), (74,2),(75,2),(76,2),
(79,2),(80,2),(81,2),(82,2),
(85,2), (86,2),(87,2),(88,2),
(91,2), (92,2),
(97,2), (98,2),
(104,2),
(110,2),
(115,2),
(127,2),

-- Todos los permisos .read que faltaban (excepto credenciales, permisos y permisos-roles)
(5, 2),   -- mascota.read
(8, 2),   -- usuario.read
(20, 2),  -- rol-usuario.read
(25, 2),  -- rol.read
(41, 2),  -- tratamiento.read (ya estaba arriba, pero lo dejo claro)
(47, 2),  -- venta.read (ya estaba arriba, pero lo dejo claro)
(52, 2),  -- medicamento-venta.read (ya estaba arriba)
(57, 2),  -- producto-venta.read (ya estaba arriba)
(62, 2),  -- servicio-venta.read (ya estaba arriba)
(68, 2),  
(74, 2),  
(80, 2),  
(86, 2),
(92, 2),  
(98, 2),  
(104, 2), 
(110, 2),
(115, 2), 
(127, 2); 

select * from permisos;
use veterinaria_pipos;
INSERT INTO razas (nombre, especie_id) VALUES
  ('Labrador', 1),
  ('Siamés', 2),
  ('Canario', 3),
  ('Iguana verde', 4),
  ('Hámster sirio', 5);

INSERT INTO mascotas (usuario_id, nombre, raza_id, edad_semanas, sexo) VALUES
  (1, 'Max', 1, 52, 'macho'),
  (2, 'Luna', 2, 40, 'hembra'),
  (3, 'Piquito', 3, 30, 'macho'),
  (4, 'Roco', 4, 75, 'desconocido'),
  (5, 'Nina', 5, 20, 'hembra');

INSERT INTO antecedentes (mascota_id, titulo, diagnostico) VALUES
  (1, 'Vacunación', 'Vacuna antirrábica aplicada sin complicaciones'),
  (2, 'Desparasitación', 'Desparasitado con Piperazina oral'),
  (3, 'Chequeo general', 'Revisión anual sin hallazgos'),
  (4, 'Infección cutánea', 'Tratamiento por dermatitis bacteriana'),
  (5, 'Cirugía menor', 'Extracción de cuerpo extraño en pata');

INSERT INTO tratamientos (antecedente_id, usuario_id, titulo, descripcion) VALUES
  (1, 2, 'Refuerzo VAC', 'Administrar refuerzo de vacuna rábica en 3 semanas'),
  (2, 4, 'Control parasitario', 'Pipeta de Selamectina mensual'),
  (3, 3, 'Examen sangre', 'Tomar hemograma y perfil bioquímico'),
  (4, 2, 'Antibiótico tópico', 'Crema de mupirocina dos veces al día'),
  (5, 2, 'Recuperación postquirúrgica', 'Limpiar herida y vendaje diario');

INSERT INTO medicamentos (info_medicamento_id, precio, fecha_caducidad, cantidad, numero_lote) VALUES
  (1, 45.00, '2026-05-10', 100, 'L-A1001'),
  (2, 60.00, '2025-12-01', 50, 'M-B2022'),
  (3, 30.00, '2025-08-15', 80, 'C-C3033'),
  (4, 75.50, '2026-01-20', 40, 'I-D4044'),
  (5, 55.25, '2025-11-30', 60, 'D-E5055');

INSERT INTO servicios (nombre, descripcion, precio) VALUES
  ('Consulta general', 'Evaluación de salud integral', 50.00),
  ('Baño y peluquería', 'Baño, secado y corte de pelo', 80.00),
  ('Corte de uñas', 'Limado y corte de uñas', 20.00),
  ('Limpieza dental', 'Profilaxis dental con ultrasonido', 120.00),
  ('Cirugía menor', 'Procedimientos quirúrgicos ambulatorios', 200.00);

INSERT INTO productos (nombre, precio, descripcion, fecha_caducidad, tipo_producto_id, stock) VALUES
  ('Alimento premium perro', 150.00, 'Bolsa 20kg, alto en proteínas', '2026-03-01', 1, 25),
  ('Arena para gato', 30.00, 'Arena aglomerante 10L', '2027-01-15', 4, 40),
  ('Jaula para aves', 200.00, 'Metal reforzado 60x40x50cm', NULL, 2, 10),
  ('Terrario reptil', 350.00, 'Cristal y madera 80x45x50cm', NULL, 2, 5),
  ('Snack hámster', 15.00, 'Paquete 200g, mezcla de semillas', '2025-09-10', 1, 60);

INSERT INTO medicamentos_tratamientos (tratamiento_id, info_medicamento_id, dosis, frecuencia_aplicacion, duracion) VALUES
  (1, 1, '500 mg', 'Cada 12 horas', 5),
  (2, 4, '6 mg', 'Una vez al mes', 1),
  (3, 5, '100 mg', 'Cada 24 horas', 7),
  (4, 3, '50 mg', 'Cada 8 horas', 10),
  (5, 2, '5 ml', 'Cada 12 horas', 3);

INSERT INTO ventas (total, monto, estado, vendedor_id, comprador_id) VALUES
  (95.00, 95.00, 'completada',1,2),
  (150.00, 150.00, 'pendiente',2,3),
  (200.00, 200.00, 'completada',3,4),
  (60.00, 60.00, 'completada',4,5),
  (300.00, 300.00, 'pendiente',1,3);


INSERT INTO medicamentos_ventas (venta_id, medicamento_id, precio, valor_adicional, cantidad, subtotal) VALUES
  (1, 1, 45.00, 0.00, 1, 45.00),
  (2, 2, 60.00, 0.00, 2, 120.00),
  (3, 3, 30.00, 0.00, 3, 90.00),
  (4, 4, 75.50, 0.00, 1, 75.50),
  (5, 5, 55.25, 0.00, 2, 110.50);

INSERT INTO servicios_ventas (venta_id, servicio_id, precio, valor_adicional, cantidad, subtotal) VALUES
  (1, 1, 50.00, 0.00, 1, 50.00),
  (2, 2, 80.00, 0.00, 1, 80.00),
  (3, 3, 20.00, 0.00, 2, 40.00),
  (4, 4, 120.00, 0.00, 1, 120.00),
  (5, 5, 200.00, 0.00, 1, 200.00);

INSERT INTO productos_ventas (venta_id, producto_id, precio, valor_adicional, cantidad, subtotal) VALUES
  (1, 1, 150.00, 0.00, 1, 150.00),
  (2, 2, 30.00, 0.00, 2, 60.00),
  (3, 3, 200.00, 0.00, 1, 200.00),
  (4, 4, 350.00, 0.00, 1, 350.00),
  (5, 5, 15.00, 0.00, 3, 45.00);
