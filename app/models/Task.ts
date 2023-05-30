import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  updatedAt: false,
  createdAt: true,
  tableName: "tasks",
})
class Task extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public completed!: boolean;
}

export default Task;
