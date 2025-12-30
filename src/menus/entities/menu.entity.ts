import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'menus',
})
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  location: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  link: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'internal',
  })
  linkType: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  icon: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  image: string | null;

  @Column({
    type: 'int',
    default: 0,
  })
  sortOrder: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  openInNewTab: boolean;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  parentId: string | null;

  @ManyToOne(() => Menu, (menu) => menu.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Menu | null;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
