-- explicitly turn off sync requires us to init schema here

-- 1. Create Patient schema
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

-- 2. Create Order schema
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL,
    "patientId" INT,
    "deletedAt" TIMESTAMP,
    CONSTRAINT "FK_patientOrder" FOREIGN KEY ("patientId") REFERENCES patients(id) ON DELETE CASCADE
);

-- 3. Seed Patient
INSERT INTO patients (id, name) VALUES 
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Robert Brown'),
(4, 'Emily Davis'),
(5, 'Michael Wilson')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Order
INSERT INTO orders (id, message, "patientId") VALUES 
(1, 'Initial Consultation', 1),
(2, 'Follow-up Checkup', 1),
(3, 'Blood Test Request', 2),
(4, 'X-Ray Referral', 3),
(5, 'Prescription Renewal', 4),
(6, 'General Wellness Exam', 5)
ON CONFLICT (id) DO NOTHING;

-- 5. Sync sequences
SELECT setval(pg_get_serial_sequence('patients', 'id'), COALESCE(MAX(id), 1)) FROM patients;
SELECT setval(pg_get_serial_sequence('orders', 'id'), COALESCE(MAX(id), 1)) FROM orders;
