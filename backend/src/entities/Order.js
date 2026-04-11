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
        message: {
            type: "varchar",
        },
        deletedAt: {
            type: "timestamp",
            deleteDate: true,
            select: false,
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
