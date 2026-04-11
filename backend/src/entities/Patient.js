import typeorm from "typeorm";
const { EntitySchema } = typeorm;

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

export default Patient;
