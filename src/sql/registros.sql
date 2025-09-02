INSERT INTO tipos_documentos (nombre) VALUES
  ('Cédula de ciudadanía'),
  ('Cédula de extranjería'),
  ('Tarjeta de identidad'),
  ('Pasaporte'),
  ('Registro civil');

INSERT INTO roles (nombre, descripcion) VALUES
  ('administrador', 'Acceso total al sistema'),
  ('veterinario', 'Gestión de pacientes y tratamientos'),
  ('recepcionista', 'Atención al cliente y ventas'),
  ('auxiliar', 'Soporte en procedimientos'),
  ('cliente', 'Visualización de datos propios');

INSERT INTO permisos (nombre) VALUES
  ('crear_usuarios'),
  ('editar_usuarios'),
  ('eliminar_usuarios'),
  ('ver_reportes'),
  ('gestionar_inventario');

INSERT INTO especies (nombre) VALUES
  ('Perro'),
  ('Gato'),
  ('Ave'),
  ('Reptil'),
  ('Roedor');

INSERT INTO tipos_productos (nombre) VALUES
  ('Alimento'),
  ('Accesorio'),
  ('Medicamento'),
  ('Higiene'),
  ('Juguete');

INSERT INTO info_medicamentos (nombre, uso_general, via_administracion, presentacion, informacion_adicional) VALUES
  ('Amoxicilina', 'Antibiótico de amplio espectro', 'Oral', 'Tabletas 500 mg', 'Tomar con alimento'),
  ('Metronidazol', 'Antiprotozoario y antibacteriano', 'Oral', 'Suspensión 100 mg/5 ml', 'Agitar antes de usar'),
  ('Carprofeno', 'Antiinflamatorio no esteroideo', 'Oral', 'Tabletas 50 mg', 'Evitar uso prolongado'),
  ('Ivermectina', 'Antiparasitario', 'Oral', 'Tabletas 6 mg', 'No administrar en cachorros menores de 6 semanas'),
  ('Doxiciclina', 'Antibiótico tetraciclina', 'Oral', 'Cápsulas 100 mg', 'No tomar con lácteos');

INSERT INTO usuarios (tipo_documento_id, numero_documento, nombre, telefono, correo, direccion) VALUES
  (1, '100200300', 'Juan López', '3121002001', 'jlopez@mail.com', 'Calle 10 #20-30'),
  (2, 'E12345678', 'María García', '3165004002', 'mgarcia@mail.com', 'Carrera 5 #50-15'),
  (3, '800900800', 'Pedro Martínez', '3107008003', 'pmartinez@mail.com', 'Av. Colombia #100-40'),
  (4, 'P9876543', 'Luisa Rodríguez', '3149001004', 'lrodriguez@mail.com', 'Diagonal 25 #75-60'),
  (5, 'RC102030', 'Ana Gómez', '3153002005', 'agomez@mail.com', 'Transversal 8 #33-22');
INSERT INTO usuarios (tipo_documento_id, numero_documento, nombre, telefono, correo, direccion) VALUES (5, 'RC1020310', 'Johan Sebastian', '3153002005', 'agomez@mail.com', 'Transversal 8 #33-22');
INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);

INSERT INTO credenciales (usuario_id, usuario, contrasena) VALUES
  (1, 'jlopez', 'pass123'),
  (2, 'mgarcia', 'secret456'),
  (3, 'pmartinez', 'abc789'),
  (4, 'lrodriguez', 'vetpass1'),
  (5, 'agomez', 'cliente2025');
  INSERT INTO credenciales (usuario_id, usuario, contrasena) VALUES (6, 'johan', 'Wasm_123');

INSERT INTO permisos_roles (permiso_id, rol_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 3);

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
