-- explicitly turn off sync requires us to init schema here

-- 1. Create Patient schema
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT
);

-- 2. Create Order schema
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    amount DECIMAL,
    "patientId" INT,
    CONSTRAINT "FK_patientOrder" FOREIGN KEY ("patientId") REFERENCES patients(id) ON DELETE CASCADE
);

-- 3. Seed Patient
INSERT INTO patients (id, name, age) VALUES (1, 'John Doe', 35)
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Order
INSERT INTO orders (id, description, amount, "patientId") 
VALUES (1, 'Routine checkup', 150.00, 1)
ON CONFLICT (id) DO NOTHING;
