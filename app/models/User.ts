import {
  Table,
  Column,
  DataType,
  AllowNull,
  IsEmail,
  PrimaryKey,
  Default,
  Model,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @AllowNull(false)
  @Column
  public name!: string;

  @IsEmail
  @AllowNull(false)
  @Column(DataType.STRING)
  public email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public hashed_password!: string;

  // @HasMany(() => List)
  // public lists!: List[];
}

export default User;
