import { v4 as uuid } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category ";
@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column("boolean")
  available = true;

  @Column("integer")
  daily_rate: number;

  @Column()
  description: string;

  @Column("integer")
  fine_amount: number;

  @Column()
  license_plate: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;
  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = uuid();
  }
}

export { Car };
