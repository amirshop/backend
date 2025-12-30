import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'sliders',
})
export class Slider {
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
    default: 'home',
  })
  position: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  image: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  imageMobile: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  link: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  subtitle: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  buttonText: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  buttonColor: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  textColor: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'center',
  })
  textAlign: string;

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
    type: 'timestamp',
    nullable: true,
  })
  startDate: Date | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  endDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
