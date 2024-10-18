import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  imdbRating: string;

  @Column({ nullable: true })
  notes: string;
}
