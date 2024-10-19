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

  @Column({ nullable: true })  // Novo campo
  actors: string;

  @Column({ nullable: true })  // Novo campo
  director: string;
  
  //novo campo para contagem de visualizações
  @Column({ type: 'int', default: 0 })
  views: number;
}
