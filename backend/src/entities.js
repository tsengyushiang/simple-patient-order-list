const { EntitySchema } = require("typeorm");

const Patient = new EntitySchema({
    name: "Patient",
    tableName: "patients",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        age: {
            type: "int",
            nullable: true,
        }
    },
    relations: {
        orders: {
            target: "Order",
            type: "one-to-many",
            inverseSide: "patient",
            cascade: true,
        },
    },
});

const Order = new EntitySchema({
    name: "Order",
    tableName: "orders",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        description: {
            type: "varchar",
        },
        amount: {
            type: "decimal",
            nullable: true,
        }
    },
    relations: {
        patient: {
            target: "Patient",
            type: "many-to-one",
            joinColumn: true,
            inverseSide: "orders",
        },
    },
});

module.exports = {
    Patient,
    Order
};
