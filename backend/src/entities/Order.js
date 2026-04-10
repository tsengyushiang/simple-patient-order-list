import typeorm from "typeorm";
const { EntitySchema } = typeorm;

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

export default Order;
