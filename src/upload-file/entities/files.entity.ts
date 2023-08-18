import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class files {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  shortUrl: string;
  @Column()
  longUrl: string;
  @Column()
  shortCode: string;
}
