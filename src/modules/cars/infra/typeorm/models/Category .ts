// interface ICategory {
//   id?: string;
//   name: string;
//   description: string;
//   created_at: Date;
// }

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn()
  created_at: Date;
}

export { Category };
