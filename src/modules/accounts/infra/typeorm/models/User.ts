import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  drive_license: string;
  @Column()
  avatar: string;
  @Column("boolean")
  adm: boolean;
  @CreateDateColumn()
  created_at: Date;
}

export { User };
