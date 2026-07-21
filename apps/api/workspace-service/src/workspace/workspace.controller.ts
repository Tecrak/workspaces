import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

import { ShareWorkspaceDto } from './dto/share-workspace.dto';
import { PassportJwtAuthGuard } from 'src/auth/guards/guards/passport-jwt.guards';

@UseGuards(PassportJwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @UseGuards(PassportJwtAuthGuard)
  createWorkspace(@Request() req, @Body() dto: CreateWorkspaceDto) {
    return this.workspaceService.create(req.user, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.workspaceService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.workspaceService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.workspaceService.remove(req.user.userId, id);
  }

  // Сюди я впхину усе для share
  @Get(':id/members')
  listMembers(@Request() req, @Param('id') id: string) {
    return this.workspaceService.listMembers(req.user.userId, id);
  }
  @Post(':id/share')
  share(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: ShareWorkspaceDto,
  ) {
    return this.workspaceService.share(
      req.user.userId,
      id,
      dto.email,
      dto.role ?? 'VIEWER',
    );
  }
  @Delete(':id/share/:userId')
  removeMember(
    @Request() req,
    @Param('id') id: string,
    @Param('userId') targetUserId: string,
  ) {
    return this.workspaceService.removeMember(
      req.user.userId,
      id,
      targetUserId,
    );
  }
}
