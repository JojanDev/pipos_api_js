

-- ============================================
-- DATOS BÁSICOS
-- ============================================

-- Tipos de documentos (solo 3)
INSERT INTO tipos_documentos (nombre) VALUES
('Cédula de ciudadanía'),
('Cédula de extranjería'),
('Tarjeta de identidad');

-- Roles
INSERT INTO roles (nombre, descripcion) VALUES
('Administrador', 'Acceso total al sistema'),
('Veterinario', 'Gestión parcial del sistema'),
('Cliente', 'Este rol no accede directamente al sistema, pero es referenciado o gestionado');

-- Especies (mascotas domésticas comunes)
INSERT INTO especies (nombre) VALUES
('Perro'),
('Gato'),
('Ave'),
('Conejo'),
('Hámster'),
('Pez');

-- Tipos de productos (sin incluir medicamento ni servicio)
INSERT INTO tipos_productos (nombre) VALUES
('Alimento'),
('Accesorio'),
('Higiene'),
('Juguete'),
('Suplemento');

-- ============================================
-- INFO MEDICAMENTOS 
-- ============================================
INSERT INTO info_medicamentos (nombre, uso_general, via_administracion, presentacion, informacion_adicional) VALUES
('Amoxicilina', 'Antibiótico de amplio espectro', 'Oral', 'Tabletas 500 mg', 'Tomar con alimento'),
('Metronidazol', 'Antiprotozoario y antibacteriano', 'Oral', 'Suspensión 100 mg/5 ml', 'Agitar antes de usar'),
('Carprofeno', 'Antiinflamatorio no esteroideo', 'Oral', 'Tabletas 50 mg', 'Evitar uso prolongado'),
('Ivermectina', 'Antiparasitario', 'Oral', 'Tabletas 6 mg', 'No administrar en cachorros menores de 6 semanas'),
('Doxiciclina', 'Antibiótico tetraciclina', 'Oral', 'Cápsulas 100 mg', 'No tomar con lácteos'),
('Prednisona', 'Corticoesteroide', 'Oral', 'Tabletas 20 mg', 'Reducir dosis gradualmente'),
('Furosemida', 'Diurético', 'Oral/Inyectable', 'Tabletas 40 mg', 'Monitorear electrolitos'),
('Meloxicam', 'Antiinflamatorio AINE', 'Oral', 'Suspensión 1.5 mg/ml', 'Dar con alimento'),
('Cefalexina', 'Antibiótico cefalosporina', 'Oral', 'Cápsulas 250 mg', 'Completar tratamiento'),
('Tramadol', 'Analgésico opioide', 'Oral', 'Tabletas 50 mg', 'Puede causar somnolencia');

-- ============================================
-- USUARIOS 
-- ============================================
INSERT INTO usuarios (tipo_documento_id, numero_documento, nombre, telefono, correo, direccion) VALUES
(1, '12345678', 'Johan Sebastian Delgado Mantilla', '3121002001', 'johan@veterinaria.com', 'Calle 10 #20-30'),
(1, '23456789', 'María García Rodríguez', '3165004002', 'maria@veterinaria.com', 'Carrera 5 #50-15'),
(1, '34567890', 'Pedro Martínez López', '3107008003', 'pedro@veterinaria.com', 'Av. Colombia #100-40'),
(2, '12345678', 'Ana Sofía Hernández', '3149001004', 'ana.hernandez@email.com', 'Diagonal 25 #75-60'),
(1, '45678901', 'Carlos Ruiz Mendoza', '3153002005', 'carlos.ruiz@email.com', 'Transversal 8 #33-22'),
(3, '98765432', 'Laura Jiménez Castro', '3162003006', 'laura.jimenez@email.com', 'Calle 45 #12-67'),
(1, '56789012', 'Miguel Torres Vega', '3178004007', 'miguel.torres@email.com', 'Carrera 15 #89-34'),
(2, '87654321', 'Daniela Moreno Silva', '3184005008', 'daniela.moreno@email.com', 'Avenida 6 #23-78'),
(1, '67890123', 'Roberto Vargas Peña', '3195006009', 'roberto.vargas@email.com', 'Calle 78 #45-12'),
(1, '78901234', 'Camila Rojas Ortega', '3146007010', 'camila.rojas@email.com', 'Diagonal 12 #56-90');

-- ============================================
-- ROLES USUARIOS
-- ============================================
INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES
(1, 1), -- Johan: Administrador
(2, 2), -- María: Veterinario
(2, 3), -- Pedro: Veterinario
(3, 4), -- Ana: Cliente
(3, 5), -- Carlos: Cliente
(3, 6), -- Laura: Cliente
(2, 7), -- Miguel: Veterinario
(3, 8), -- Daniela: Cliente
(3, 9), -- Roberto: Cliente
(3, 10), -- Camila: Cliente
(2, 4), -- Ana también es Veterinario (múltiples roles)
(2, 5); -- Carlos también es Veterinario

-- ============================================
-- CREDENCIALES (solo para Administrador y Veterinarios)
-- ============================================
INSERT INTO credenciales (usuario_id, usuario, contrasena) VALUES
(1, 'johan', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
(2, 'maria', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
(3, 'pedro', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
(4, 'ana', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
(5, 'carlos', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW'),
(7, 'miguel', '$2b$10$Byf1iv5eLpzZ5qA79r2U2.TP6YmqqxhwPr5RlW0CdTKNheKny06yW');

-- ============================================
-- RAZAS (múltiples por especie)
-- ============================================
INSERT INTO razas (nombre, especie_id) VALUES
-- Perros (especie 1)
('Labrador', 1),
('Golden Retriever', 1),
('Pastor Alemán', 1),
('Bulldog Francés', 1),
('Chihuahua', 1),
('Yorkshire Terrier', 1),
('Poodle', 1),
('Beagle', 1),
-- Gatos (especie 2)
('Siamés', 2),
('Persa', 2),
('Maine Coon', 2),
('Angora', 2),
('Común Europeo', 2),
-- Aves (especie 3)
('Canario', 3),
('Periquito', 3),
('Cacatúa', 3),
('Agaporni', 3),
-- Conejos (especie 4)
('Holandés', 4),
('Angora', 4),
('Enano', 4),
-- Hámsters (especie 5)
('Sirio', 5),
('Ruso', 5),
-- Peces (especie 6)
('Goldfish', 6),
('Betta', 6),
('Guppy', 6);

-- ============================================
-- MASCOTAS (10 registros - usuarios clientes)
-- ============================================
INSERT INTO mascotas (usuario_id, nombre, raza_id, edad_semanas, sexo) VALUES
(4, 'Max', 1, 52, 'macho'),           -- Ana (cliente)
(5, 'Luna', 9, 40, 'hembra'),         -- Carlos (cliente)
(6, 'Rocky', 3, 78, 'macho'),         -- Laura (cliente)
(8, 'Bella', 2, 65, 'hembra'),        -- Daniela (cliente)
(9, 'Simba', 10, 45, 'macho'),        -- Roberto (cliente)
(10, 'Nala', 5, 30, 'hembra'),        -- Camila (cliente)
(4, 'Coco', 14, 20, 'macho'),         -- Ana (cliente) - segunda mascota
(5, 'Pipo', 16, 15, 'macho'),         -- Carlos (cliente) - segunda mascota
(6, 'Mimi', 11, 35, 'hembra'),        -- Laura (cliente) - segunda mascota
(8, 'Goldie', 24, 10, 'desconocido'); -- Daniela (cliente) - segunda mascota

-- ============================================
-- ANTECEDENTES 
-- ============================================
INSERT INTO antecedentes (mascota_id, titulo, diagnostico) VALUES
(1, 'Vacunación anual', 'Aplicación de vacuna múltiple sin complicaciones'),
(2, 'Desparasitación', 'Tratamiento antiparasitario interno y externo'),
(3, 'Chequeo general', 'Revisión de rutina - estado de salud óptimo'),
(4, 'Infección urinaria', 'Cistitis bacteriana tratada con antibióticos'),
(5, 'Limpieza dental', 'Profilaxis dental con extracción de sarro'),
(6, 'Dermatitis alérgica', 'Reacción alérgica en piel tratada'),
(7, 'Control reproductivo', 'Evaluación previa a esterilización'),
(8, 'Trauma menor', 'Herida superficial en pata tratada'),
(9, 'Otitis', 'Infección del oído medio tratada'),
(10, 'Revisión post-quirúrgica', 'Control después de cirugía menor');

-- ============================================
-- TRATAMIENTOS 
-- ============================================
INSERT INTO tratamientos (antecedente_id, usuario_id, titulo, descripcion) VALUES
(1, 2, 'Refuerzo vacunal', 'Programar refuerzo en 6 meses'),
(2, 3, 'Antiparasitario mensual', 'Aplicar pipeta cada 30 días'),
(3, 2, 'Controles regulares', 'Chequeo cada 6 meses'),
(4, 3, 'Antibióticoterapia', 'Cefalexina oral por 7 días'),
(5, 2, 'Cuidado dental', 'Pasta dental especial diariamente'),
(6, 7, 'Tratamiento antialérgico', 'Prednisona y baños medicinales'),
(7, 3, 'Preparación quirúrgica', 'Ayuno y medicación pre-anestésica'),
(8, 2, 'Cuidado de herida', 'Limpieza y vendaje diario'),
(9, 7, 'Gotas óticas', 'Aplicar 3 veces al día por 10 días'),
(10, 3, 'Recuperación', 'Reposo y medicación analgésica');

-- ============================================
-- MEDICAMENTOS (10 registros - fechas futuras, precios en COP)
-- ============================================
INSERT INTO medicamentos (info_medicamento_id, precio, fecha_caducidad, cantidad, numero_lote) VALUES
(1, 45000, '2025-12-15', 100, 'AMX2024001'),
(2, 32000, '2025-11-20', 50, 'MTZ2024002'),
(3, 28000, '2025-10-30', 75, 'CAR2024003'),
(4, 65000, '2026-01-15', 40, 'IVR2024004'),
(5, 38000, '2025-12-10', 80, 'DOX2024005'),
(6, 42000, '2026-02-20', 60, 'PRD2024006'),
(7, 55000, '2025-11-05', 30, 'FUR2024007'),
(8, 35000, '2026-01-25', 90, 'MEL2024008'),
(9, 48000, '2025-12-30', 70, 'CEF2024009'),
(10, 52000, '2026-03-10', 45, 'TRA2024010');

-- ============================================
-- SERVICIOS (10 registros - precios en COP)
-- ============================================
INSERT INTO servicios (nombre, descripcion, precio) VALUES
('Consulta general', 'Evaluación veterinaria completa', 80000),
('Vacunación', 'Aplicación de vacunas según esquema', 65000),
('Desparasitación', 'Tratamiento antiparasitario completo', 45000),
('Baño medicinal', 'Baño terapéutico especializado', 50000),
('Limpieza dental', 'Profilaxis dental profesional', 150000),
('Cirugía menor', 'Procedimientos quirúrgicos ambulatorios', 200000),
('Radiografía', 'Estudio radiológico diagnóstico', 120000),
('Ecografía', 'Estudio ecográfico abdominal', 100000),
('Hospitalización día', 'Cuidado intensivo diurno', 180000),
('Eutanasia humanitaria', 'Procedimiento de eutanasia asistida', 250000);

-- ============================================
-- PRODUCTOS (10 registros - precios en COP)
-- ============================================
INSERT INTO productos (nombre, precio, descripcion, fecha_caducidad, tipo_producto_id, stock) VALUES
('Concentrado Premium Perro Adulto', 85000, 'Bolsa 15kg - alta calidad nutricional', '2025-11-30', 1, 25),
('Arena Aglomerante Gato', 25000, 'Saco 10kg - control de olores', '2026-06-15', 3, 40),
('Collar Antipulgas', 35000, 'Protección 8 meses - todas las tallas', '2025-12-31', 2, 30),
('Juguete Kong Perro', 45000, 'Caucho resistente - estimulación mental', NULL, 4, 20),
('Vitaminas para Aves', 28000, 'Complejo vitamínico 100ml', '2025-10-20', 5, 50),
('Transportadora Gato', 120000, 'Plástico resistente - ventilación óptima', NULL, 2, 15),
('Shampoo Medicinal', 42000, 'Tratamiento dermatológico 500ml', '2026-01-15', 3, 35),
('Pelota Interactiva', 18000, 'Estimulación física y mental', NULL, 4, 60),
('Alimento Peces Tropicales', 22000, 'Escamas nutritivas 200g', '2025-11-10', 1, 80),
('Suplemento Articular', 75000, 'Condroprotector canino 60 tabletas', '2026-02-28', 5, 25);

-- ============================================
-- MEDICAMENTOS TRATAMIENTOS 
-- ============================================
INSERT INTO medicamentos_tratamientos (tratamiento_id, info_medicamento_id, dosis, frecuencia_aplicacion, duracion) VALUES
(1, 1, '500mg', 'Cada 12 horas', 7),
(2, 4, '6mg', 'Dosis única mensual', 1),
(3, 2, '250mg', 'Cada 8 horas', 5),
(4, 9, '250mg', 'Cada 12 horas', 7),
(5, 8, '1.5ml', 'Cada 24 horas', 3),
(6, 6, '20mg', 'Cada 12 horas', 5),
(7, 5, '100mg', 'Cada 24 horas', 3),
(8, 1, '500mg', 'Cada 8 horas', 10),
(9, 3, '50mg', 'Cada 12 horas', 7),
(10, 10, '50mg', 'Cada 8 horas', 5);

-- ============================================
-- VENTAS 
-- ============================================
-- Primero insertamos las ventas con totales temporales
INSERT INTO ventas (total, monto, completada, vendedor_id, comprador_id) VALUES
(0, 0, 1, 2, 4),   -- Venta 1: María vende a Ana
(0, 0, 1, 3, 5),   -- Venta 2: Pedro vende a Carlos  
(0, 0, 1, 2, 6),   -- Venta 3: María vende a Laura
(0, 0, 1, 7, 8),   -- Venta 4: Miguel vende a Daniela
(0, 0, 1, 3, 9),   -- Venta 5: Pedro vende a Roberto
(0, 0, 1, 2, 10),  -- Venta 6: María vende a Camila
(0, 0, 1, 7, 4),   -- Venta 7: Miguel vende a Ana
(0, 0, 1, 3, 5),   -- Venta 8: Pedro vende a Carlos
(0, 0, 1, 2, 8),   -- Venta 9: María vende a Daniela
(0, 0, 1, 7, 9);   -- Venta 10: Miguel vende a Roberto

-- ============================================
-- MEDICAMENTOS VENTAS
-- ============================================
INSERT INTO medicamentos_ventas (venta_id, medicamento_id, precio, valor_adicional, cantidad, subtotal) VALUES
-- Venta 1: 2 medicamentos
(1, 1, 45000, 0, 1, 45000),      -- 45000 * 1 + 0 = 45000
(1, 3, 28000, 2000, 2, 58000),   -- 28000 * 2 + 2000 = 58000
-- Venta 2: 1 medicamento  
(2, 2, 32000, 0, 1, 32000),      -- 32000 * 1 + 0 = 32000
-- Venta 3: 1 medicamento
(3, 4, 65000, 5000, 1, 70000),   -- 65000 * 1 + 5000 = 70000
-- Venta 4: 2 medicamentos
(4, 5, 38000, 0, 1, 38000),      -- 38000 * 1 + 0 = 38000
(4, 7, 55000, 0, 1, 55000),      -- 55000 * 1 + 0 = 55000
-- Venta 5: 1 medicamento
(5, 6, 42000, 3000, 2, 87000),   -- 42000 * 2 + 3000 = 87000
-- Ventas 6-10: 1 medicamento cada una
(6, 8, 35000, 0, 1, 35000),      -- 35000 * 1 + 0 = 35000
(7, 9, 48000, 2000, 1, 50000),   -- 48000 * 1 + 2000 = 50000
(8, 10, 52000, 0, 2, 104000),    -- 52000 * 2 + 0 = 104000
(9, 1, 45000, 1000, 1, 46000),   -- 45000 * 1 + 1000 = 46000
(10, 2, 32000, 0, 1, 32000);     -- 32000 * 1 + 0 = 32000

-- ============================================
-- SERVICIOS VENTAS
-- ============================================
INSERT INTO servicios_ventas (venta_id, servicio_id, precio, valor_adicional, cantidad, subtotal) VALUES
-- Venta 1: 1 servicio
(1, 1, 80000, 0, 1, 80000),      -- 80000 * 1 + 0 = 80000
-- Venta 2: 1 servicio
(2, 2, 65000, 5000, 1, 70000),   -- 65000 * 1 + 5000 = 70000
-- Venta 3: 2 servicios  
(3, 3, 45000, 0, 1, 45000),      -- 45000 * 1 + 0 = 45000
(3, 4, 50000, 0, 1, 50000),      -- 50000 * 1 + 0 = 50000
-- Venta 4: 1 servicio
(4, 5, 150000, 10000, 1, 160000), -- 150000 * 1 + 10000 = 160000
-- Venta 5: 1 servicio
(5, 6, 200000, 0, 1, 200000),    -- 200000 * 1 + 0 = 200000
-- Ventas 6-10: 1 servicio cada una
(6, 7, 120000, 0, 1, 120000),    -- 120000 * 1 + 0 = 120000
(7, 8, 100000, 5000, 1, 105000), -- 100000 * 1 + 5000 = 105000
(8, 9, 180000, 0, 1, 180000),    -- 180000 * 1 + 0 = 180000
(9, 10, 250000, 0, 1, 250000),   -- 250000 * 1 + 0 = 250000
(10, 1, 80000, 0, 1, 80000);     -- 80000 * 1 + 0 = 80000

-- ============================================
-- PRODUCTOS VENTAS
-- ============================================
INSERT INTO productos_ventas (venta_id, producto_id, precio, valor_adicional, cantidad, subtotal) VALUES
-- Venta 1: 1 producto
(1, 1, 85000, 0, 1, 85000),      -- 85000 * 1 + 0 = 85000
-- Venta 2: 1 producto
(2, 2, 25000, 0, 2, 50000),      -- 25000 * 2 + 0 = 50000
-- Venta 3: 1 producto
(3, 3, 35000, 0, 1, 35000),      -- 35000 * 1 + 0 = 35000
-- Venta 4: 1 producto  
(4, 4, 45000, 0, 1, 45000),      -- 45000 * 1 + 0 = 45000
-- Venta 5: 2 productos
(5, 5, 28000, 0, 1, 28000),      -- 28000 * 1 + 0 = 28000
(5, 6, 120000, 0, 1, 120000),    -- 120000 * 1 + 0 = 120000
-- Ventas 6-10: 1 producto cada una
(6, 7, 42000, 0, 1, 42000),      -- 42000 * 1 + 0 = 42000
(7, 8, 18000, 0, 2, 36000),      -- 18000 * 2 + 0 = 36000
(8, 9, 22000, 0, 3, 66000),      -- 22000 * 3 + 0 = 66000
(9, 10, 75000, 0, 1, 75000),     -- 75000 * 1 + 0 = 75000
(10, 1, 85000, 5000, 1, 90000);  -- 85000 * 1 + 5000 = 90000

SET SQL_SAFE_UPDATES = 0;
-- ============================================
-- ACTUALIZAR TOTALES DE VENTAS
-- ============================================
-- Calcular y actualizar los totales reales
UPDATE ventas SET 
    total = (
        COALESCE((SELECT SUM(subtotal) FROM medicamentos_ventas WHERE venta_id = ventas.id), 0) +
        COALESCE((SELECT SUM(subtotal) FROM servicios_ventas WHERE venta_id = ventas.id), 0) +
        COALESCE((SELECT SUM(subtotal) FROM productos_ventas WHERE venta_id = ventas.id), 0)
    ),
    monto = (
        COALESCE((SELECT SUM(subtotal) FROM medicamentos_ventas WHERE venta_id = ventas.id), 0) +
        COALESCE((SELECT SUM(subtotal) FROM servicios_ventas WHERE venta_id = ventas.id), 0) +
        COALESCE((SELECT SUM(subtotal) FROM productos_ventas WHERE venta_id = ventas.id), 0)
    );

-- Verificar totales calculados
SELECT 
    v.id,
    v.total as total_venta,
    COALESCE(mv_sum.subtotal_medicamentos, 0) as medicamentos,
    COALESCE(sv_sum.subtotal_servicios, 0) as servicios,  
    COALESCE(pv_sum.subtotal_productos, 0) as productos,
    (COALESCE(mv_sum.subtotal_medicamentos, 0) + COALESCE(sv_sum.subtotal_servicios, 0) + COALESCE(pv_sum.subtotal_productos, 0)) as suma_calculada
FROM ventas v
LEFT JOIN (SELECT venta_id, SUM(subtotal) as subtotal_medicamentos FROM medicamentos_ventas GROUP BY venta_id) mv_sum ON v.id = mv_sum.venta_id
LEFT JOIN (SELECT venta_id, SUM(subtotal) as subtotal_servicios FROM servicios_ventas GROUP BY venta_id) sv_sum ON v.id = sv_sum.venta_id  
LEFT JOIN (SELECT venta_id, SUM(subtotal) as subtotal_productos FROM productos_ventas GROUP BY venta_id) pv_sum ON v.id = pv_sum.venta_id
ORDER BY v.id;