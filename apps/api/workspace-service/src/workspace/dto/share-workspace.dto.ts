import { IsEmail, IsIn, IsOptional } from 'class-validator';

export class ShareWorkspaceDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsIn(['EDITOR', 'VIEWER'])
  role?: 'EDITOR' | 'VIEWER' = 'VIEWER';
}
