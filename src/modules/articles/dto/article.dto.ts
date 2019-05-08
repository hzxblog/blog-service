import { IsString, IsNotEmpty } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  readonly content: string;
  readonly watcher: number;
  readonly is_publish: boolean;
}
