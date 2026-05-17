-- ============================================
-- ESPECIALIDADES (10 especialidades comunes)
-- ============================================
INSERT INTO especialidad (nombre_especialidad, descripcion) VALUES
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón'),
('Pediatría', 'Atención médica de bebés, niños y adolescentes'),
('Dermatología', 'Diagnóstico y tratamiento de enfermedades de la piel'),
('Traumatología', 'Tratamiento de lesiones del sistema musculoesquelético'),
('Ginecología', 'Atención de la salud de la mujer'),
('Oftalmología', 'Diagnóstico y tratamiento de enfermedades de los ojos'),
('Neurología', 'Tratamiento de enfermedades del sistema nervioso'),
('Psiquiatría', 'Diagnóstico y tratamiento de trastornos mentales'),
('Medicina General', 'Atención médica integral y preventiva'),
('Odontología', 'Diagnóstico y tratamiento de enfermedades bucales');

-- ============================================
-- MÉDICOS (12 médicos)
-- ============================================
INSERT INTO medico (nombre_medico, apellido_medico, telefono_medico, correo_medico) VALUES
('Carlos', 'Rodríguez', '77001234', 'carlos.rodriguez@hospital.com'),
('María', 'González', '77005678', 'maria.gonzalez@hospital.com'),
('José', 'Martínez', '77009012', 'jose.martinez@hospital.com'),
('Ana', 'López', '77003456', 'ana.lopez@hospital.com'),
('Roberto', 'Hernández', '77007890', 'roberto.hernandez@hospital.com'),
('Laura', 'García', '77002345', 'laura.garcia@hospital.com'),
('Pedro', 'Ramírez', '77006789', 'pedro.ramirez@hospital.com'),
('Carmen', 'Torres', '77000123', 'carmen.torres@hospital.com'),
('Luis', 'Flores', '77004567', 'luis.flores@hospital.com'),
('Patricia', 'Morales', '77008901', 'patricia.morales@hospital.com'),
('Miguel', 'Castillo', '77001122', 'miguel.castillo@hospital.com'),
('Sofia', 'Vásquez', '77005566', 'sofia.vasquez@hospital.com');

-- ============================================
-- ASIGNACIÓN DE ESPECIALIDADES A MÉDICOS
-- ============================================
INSERT INTO medico_especialidad (id_medico, id_especialidad) VALUES
(1, 1), (1, 9),
(2, 2),
(3, 3),
(4, 4), (4, 9),
(5, 5),
(6, 6),
(7, 7), (7, 9),
(8, 8),
(9, 9),
(10, 10),
(11, 1),
(12, 2), (12, 9);

-- ============================================
-- PACIENTES (15 pacientes)
-- ============================================
INSERT INTO paciente (nombre_paciente, apellido_paciente, fecha_nacimiento, telefono_paciente, correo_paciente) VALUES
('Juan', 'Pérez', '1985-03-15', '70001234', 'juan.perez@email.com'),
('María', 'Sánchez', '1990-07-22', '70005678', 'maria.sanchez@email.com'),
('Carlos', 'Mendoza', '1978-11-30', '70009012', 'carlos.mendoza@email.com'),
('Ana', 'Reyes', '1995-01-10', '70003456', 'ana.reyes@email.com'),
('Roberto', 'Cruz', '1982-05-18', '70007890', 'roberto.cruz@email.com'),
('Laura', 'Díaz', '1988-09-25', '70002345', 'laura.diaz@email.com'),
('Pedro', 'Romero', '2010-02-14', '70006789', 'pedro.romero@email.com'),
('Carmen', 'Silva', '1975-12-05', '70000123', 'carmen.silva@email.com'),
('Luis', 'Ortiz', '1992-04-20', '70004567', 'luis.ortiz@email.com'),
('Patricia', 'Navarro', '1987-08-12', '70008901', 'patricia.navarro@email.com'),
('Miguel', 'Campos', '2015-06-30', '70001122', 'miguel.campos@email.com'),
('Sofía', 'Aguilar', '1993-10-08', '70005566', 'sofia.aguilar@email.com'),
('Diego', 'Mejía', '1980-03-27', '70009900', 'diego.mejia@email.com'),
('Gabriela', 'Ramos', '1998-07-15', '70003344', 'gabriela.ramos@email.com'),
('Fernando', 'Vargas', '1970-11-22', '70007788', 'fernando.vargas@email.com');

-- ============================================
-- CITAS 2026
-- Pasadas al 17 de mayo (COMPLETADA / CANCELADA)
-- Hoy 17 de mayo (CONFIRMADA / PENDIENTE)
-- Futuras desde 18 de mayo (PENDIENTE / CONFIRMADA)
-- ============================================
INSERT INTO cita (fecha_cita, hora_cita, motivo_cita, estado_cita, id_paciente, id_medico, id_especialidad) VALUES

-- ── ENERO 2026 ── (COMPLETADAS y CANCELADAS)
('2026-01-05', '08:00:00', 'Control cardiológico anual',            'COMPLETADA'::estado_cita_enum,  1,  1,  1),
('2026-01-06', '09:00:00', 'Revisión de crecimiento infantil',      'COMPLETADA'::estado_cita_enum,  7,  2,  2),
('2026-01-07', '10:00:00', 'Consulta por dermatitis',               'COMPLETADA'::estado_cita_enum,  4,  3,  3),
('2026-01-08', '11:00:00', 'Dolor lumbar crónico',                  'CANCELADA'::estado_cita_enum,   3,  4,  4),
('2026-01-09', '14:00:00', 'Control prenatal primer trimestre',     'COMPLETADA'::estado_cita_enum,  6,  5,  5),
('2026-01-12', '08:30:00', 'Revisión de presión intraocular',       'CANCELADA'::estado_cita_enum,   8,  6,  6),
('2026-01-13', '09:30:00', 'Migraña persistente',                   'COMPLETADA'::estado_cita_enum,  9,  7,  7),
('2026-01-14', '10:30:00', 'Seguimiento de terapia psiquiátrica',   'COMPLETADA'::estado_cita_enum, 10,  8,  8),

-- ── FEBRERO 2026 ── (COMPLETADAS y CANCELADAS)
('2026-02-03', '08:00:00', 'Chequeo general preventivo',           'COMPLETADA'::estado_cita_enum,  2,  9,  9),
('2026-02-04', '09:00:00', 'Ortodoncia inicial',                   'COMPLETADA'::estado_cita_enum, 11, 10, 10),
('2026-02-05', '10:00:00', 'Electrocardiograma de esfuerzo',       'COMPLETADA'::estado_cita_enum,  5,  1,  1),
('2026-02-06', '11:00:00', 'Vacunación infantil refuerzo',         'CANCELADA'::estado_cita_enum,  11, 12,  2),
('2026-02-10', '14:00:00', 'Tratamiento de psoriasis',             'COMPLETADA'::estado_cita_enum, 12,  3,  3),
('2026-02-11', '08:00:00', 'Rehabilitación de rodilla',            'COMPLETADA'::estado_cita_enum, 13,  4,  4),
('2026-02-12', '09:00:00', 'Ecografía ginecológica',               'CANCELADA'::estado_cita_enum,  14,  5,  5),

-- ── MARZO 2026 ── (COMPLETADAS y CANCELADAS)
('2026-03-02', '08:00:00', 'Examen de fondo de ojo',               'COMPLETADA'::estado_cita_enum, 15,  6,  6),
('2026-03-03', '09:00:00', 'EEG - Estudio neurológico',            'COMPLETADA'::estado_cita_enum,  1,  7,  7),
('2026-03-04', '10:00:00', 'Consulta por depresión',               'COMPLETADA'::estado_cita_enum,  2,  8,  8),
('2026-03-05', '11:00:00', 'Consulta gripal con complicaciones',   'CANCELADA'::estado_cita_enum,   3,  9,  9),
('2026-03-09', '14:00:00', 'Extracción de muela del juicio',       'COMPLETADA'::estado_cita_enum,  4, 10, 10),
('2026-03-10', '08:30:00', 'Arritmia cardíaca - seguimiento',      'COMPLETADA'::estado_cita_enum,  5, 11,  1),
('2026-03-11', '09:30:00', 'Control pediátrico de rutina',         'CANCELADA'::estado_cita_enum,   7, 12,  2),

-- ── ABRIL 2026 ── (COMPLETADAS y CANCELADAS)
('2026-04-01', '08:00:00', 'Dermatoscopia de lunares',             'COMPLETADA'::estado_cita_enum,  6,  3,  3),
('2026-04-02', '09:00:00', 'Fractura de tobillo - control',        'COMPLETADA'::estado_cita_enum,  8,  4,  4),
('2026-04-07', '10:00:00', 'Papanicolaou y colposcopia',           'CANCELADA'::estado_cita_enum,   9,  5,  5),
('2026-04-08', '11:00:00', 'Cirugía de cataratas - evaluación',    'COMPLETADA'::estado_cita_enum, 10,  6,  6),
('2026-04-09', '14:00:00', 'Neuropatía diabética',                 'COMPLETADA'::estado_cita_enum, 11,  7,  7),
('2026-04-14', '08:00:00', 'Trastorno bipolar - ajuste dosis',     'CANCELADA'::estado_cita_enum,  12,  8,  8),
('2026-04-15', '09:00:00', 'Chequeo ejecutivo completo',           'COMPLETADA'::estado_cita_enum, 13,  9,  9),

-- ── MAYO 2026 ANTES DE HOY (1–16) ── (COMPLETADAS y CANCELADAS)
('2026-05-02', '08:00:00', 'Implante dental - revisión',           'COMPLETADA'::estado_cita_enum, 14, 10, 10),
('2026-05-05', '09:00:00', 'Holter cardiaco - resultados',         'COMPLETADA'::estado_cita_enum, 15,  1,  1),
('2026-05-06', '10:00:00', 'Control de talla y peso pediátrico',   'COMPLETADA'::estado_cita_enum,  7,  2,  2),
('2026-05-07', '11:00:00', 'Rosácea - tratamiento tópico',         'CANCELADA'::estado_cita_enum,   4,  3,  3),
('2026-05-12', '14:00:00', 'Esguince de hombro',                   'COMPLETADA'::estado_cita_enum,  3,  4,  4),
('2026-05-13', '08:30:00', 'Control embarazo 32 semanas',          'COMPLETADA'::estado_cita_enum,  6,  5,  5),
('2026-05-14', '09:30:00', 'Glaucoma - revisión de presión',       'CANCELADA'::estado_cita_enum,   1,  6,  6),
('2026-05-15', '10:30:00', 'Cefalea tensional - seguimiento',      'COMPLETADA'::estado_cita_enum,  9,  7,  7),
('2026-05-16', '11:30:00', 'Ansiedad generalizada - sesión',       'COMPLETADA'::estado_cita_enum, 10,  8,  8),

-- ── HOY 17 DE MAYO 2026 ── (CONFIRMADA y PENDIENTE)
('2026-05-17', '08:00:00', 'Consulta por diabetes tipo 2',         'CONFIRMADA'::estado_cita_enum,  2,  9,  9),
('2026-05-17', '09:00:00', 'Limpieza dental profunda',             'CONFIRMADA'::estado_cita_enum,  5, 10, 10),
('2026-05-17', '10:00:00', 'Dolor precordial - evaluación',        'PENDIENTE'::estado_cita_enum,  13,  1,  1),
('2026-05-17', '11:00:00', 'Fiebre y dolor de garganta (niño)',    'PENDIENTE'::estado_cita_enum,  11, 12,  2),
('2026-05-17', '14:00:00', 'Manchas en piel - diagnóstico',        'CONFIRMADA'::estado_cita_enum, 14,  3,  3),

-- ── FUTURAS DESDE 18 DE MAYO 2026 ── (PENDIENTE y CONFIRMADA)
('2026-05-19', '08:00:00', 'Fisioterapia columna vertebral',       'CONFIRMADA'::estado_cita_enum,  8,  4,  4),
('2026-05-20', '09:00:00', 'Ecografía obstétrica',                 'PENDIENTE'::estado_cita_enum,   6,  5,  5),
('2026-05-21', '10:00:00', 'Revisión post-operatoria de ojo',      'CONFIRMADA'::estado_cita_enum, 15,  6,  6),
('2026-05-22', '11:00:00', 'Epilepsia - control neurológico',      'PENDIENTE'::estado_cita_enum,  12,  7,  7),
('2026-05-26', '08:00:00', 'Psicosis - evaluación inicial',        'CONFIRMADA'::estado_cita_enum,  2,  8,  8),
('2026-05-27', '09:00:00', 'Chequeo general anual',                'PENDIENTE'::estado_cita_enum,   3,  9,  9),
('2026-06-03', '10:00:00', 'Blanqueamiento dental',                'PENDIENTE'::estado_cita_enum,   4, 10, 10),
('2026-06-10', '08:00:00', 'Marcapasos - control trimestral',      'CONFIRMADA'::estado_cita_enum,  1, 11,  1),
('2026-06-17', '09:00:00', 'Vacunas viaje internacional (niño)',   'PENDIENTE'::estado_cita_enum,   7,  2,  2),
('2026-07-01', '10:00:00', 'Revisión dermatológica anual',         'PENDIENTE'::estado_cita_enum,   9,  3,  3);

-- ============================================
-- Verificación
-- ============================================
SELECT 'Datos de prueba insertados exitosamente' AS estado;
SELECT COUNT(*) AS total_especialidades FROM especialidad;
SELECT COUNT(*) AS total_medicos FROM medico;
SELECT COUNT(*) AS total_pacientes FROM paciente;
SELECT COUNT(*) AS total_citas FROM cita;
SELECT estado_cita, COUNT(*) AS total FROM cita GROUP BY estado_cita ORDER BY estado_cita;