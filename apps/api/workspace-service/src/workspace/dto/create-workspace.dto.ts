import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks!: CreateTaskDto[];
}

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @ValidateNested({ each: true })
  @Type(() => CreateBoardDto)
  boards!: CreateBoardDto[];
}
