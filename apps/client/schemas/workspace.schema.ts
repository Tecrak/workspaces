// import { IsString, IsNotEmpty, ValidateNested } from "class-validator";
// import { Type } from "class-transformer";
// import { createZodDto } from "nestjs-zod";
// import { boardSchema, taskSchema, workspaceSchema } from "@repo/types";

// export class CreateTaskDto extends createZodDto(taskSchema) {
//   @IsString()
//   @IsNotEmpty()
//   title!: string;
// }

// export class CreateBoardDto extends createZodDto(boardSchema) {
//   @IsString()
//   @IsNotEmpty()
//   name!: string;

//   @ValidateNested({ each: true })
//   @Type(() => CreateTaskDto)
//   tasks!: CreateTaskDto[];
// }

// export class CreateWorkspaceDto extends createZodDto(workspaceSchema) {
//   @ValidateNested({ each: true })
//   @Type(() => CreateBoardDto)
//   boards!: CreateBoardDto[];
// }
