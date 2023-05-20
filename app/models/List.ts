import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  updatedAt: false,
  createdAt: true,
  tableName: "lists",
})
class List extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  // @ForeignKey(() => User)
  // @AllowNull(false)
  // @Column(DataType.UUID)
  // public userId!: string;

  // @BelongsTo(() => User)
  // public user!: User;

  // @HasMany(() => Task)
  // public tasks!: Task[];
}

export default List;
