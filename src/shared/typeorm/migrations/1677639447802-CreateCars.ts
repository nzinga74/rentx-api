import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1677639447802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            type: "uuid",
            name: "id",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            type: "varchar",
            name: "name",
          },
          {
            type: "varchar",
            name: "description",
          },
          {
            type: "numeric",
            name: "daily_rate",
          },
          {
            type: "boolean",
            name: "available",
          },
          {
            type: "varchar",
            name: "license_plate",
          },
          {
            type: "numeric",
            name: "fine_amount",
          },
          {
            type: "varchar",
            name: "brand",
          },
          {
            type: "uuid",
            name: "category_id",
            isNullable: true,
          },
          {
            type: "timestamp",
            name: "created_at",
            default: "now()",
          },
          {
            type: "timestamp",
            name: "updated_at",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
