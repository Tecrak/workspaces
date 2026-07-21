import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

enum EnumCacheKey {
  WorkspacesByUserId = 'workspaces:user:',
}

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async findAll(userId: string) {
    const cacheKey = `${EnumCacheKey.WorkspacesByUserId}${userId}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const workspaces = await this.prisma.workspace.findMany({
      where: { OR: [{ userId }, { members: { some: { userId } } }] },
      include: { boards: { include: { tasks: true } } },
    });

    await this.cache.set(cacheKey, workspaces, 60_000);
    return workspaces;
  }

  async findOne(userId: string, id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
      include: {
        boards: { include: { tasks: true } },
        members: true,
      },
    });

    if (!workspace) throw new NotFoundException('Workspace not found');

    const isOwner = workspace.userId === userId;
    const isMember = workspace.members.some((m) => m.userId === userId);
    if (!isOwner && !isMember) throw new ForbiddenException();

    return workspace;
  }

  async create(user: any, dto: CreateWorkspaceDto) {
    await this.cache.del(`${EnumCacheKey.WorkspacesByUserId}${user.userId}`);
    return this.prisma.workspace.create({
      data: {
        name: dto.name,
        userId: user.userId,
        boards: {
          create:
            dto.boards?.map((board, index) => ({
              name: board.name,
              order: index,
              tasks: {
                create:
                  board.tasks?.map((task) => ({
                    title: task.title,
                  })) || [],
              },
            })) || [],
        },
      },
      include: {
        boards: { include: { tasks: true } },
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.assertRole(userId, id, []);
    await this.cache.del(`${EnumCacheKey.WorkspacesByUserId}${userId}`);
    return this.prisma.workspace.delete({ where: { id } });
  }

  async update(userId: string, id: string, dto: UpdateWorkspaceDto) {
    await this.assertRole(userId, id, ['OWNER', 'EDITOR']);
    await this.cache.del(`${EnumCacheKey.WorkspacesByUserId}${userId}`);
    return this.prisma.workspace.update({
      where: { id },
      data: { name: dto.name },
    });
  }

  private async assertRole(
    userId: string,
    workspaceId: string,
    allow: ('OWNER' | 'EDITOR')[],
  ) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: { members: { where: { userId } } },
    });

    if (!workspace) throw new NotFoundException('Нема такого Workspace');

    const isOwner = workspace.userId === userId;
    const role = isOwner ? 'OWNER' : workspace.members[0]?.role;

    if (!isOwner && !allow.includes(role as any))
      throw new ForbiddenException();
    return workspace;
  }

  async share(
    ownerId: string,
    workspaceId: string,
    email: string,
    role: 'EDITOR' | 'VIEWER',
  ) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    if (!workspace) throw new NotFoundException('Workspace not found');
    if (workspace.userId !== ownerId)
      throw new ForbiddenException('Тільки власник може шерити');
    const targetUser = await this.prisma.userRef.findUnique({
      where: { email },
    });
    if (!targetUser)
      throw new NotFoundException('Немає такої людинки з такою поштою );');
    if (targetUser.id === ownerId)
      throw new ForbiddenException('Не можна шерити собі');

    return this.prisma.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId, userId: targetUser.id } },
      update: { role },
      create: { workspaceId, userId: targetUser.id, role },
    });
  }

  async removeMember(
    ownerId: string,
    workspaceId: string,
    targetUserId: string,
  ) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    if (!workspace) throw new NotFoundException('Workspace not found');
    if (workspace.userId !== ownerId) throw new ForbiddenException();

    return this.prisma.workspaceMember.delete({
      where: { workspaceId_userId: { workspaceId, userId: targetUserId } },
    });
  }

  async listMembers(userId: string, workspaceId: string) {
    await this.findOne(userId, workspaceId);

    const members = await this.prisma.workspaceMember.findMany({
      where: { workspaceId },
    });

    const userIds = members.map((m) => m.userId);
    const userRefs = await this.prisma.userRef.findMany({
      where: { id: { in: userIds } },
    });

    const userRefMap = new Map(userRefs.map((u) => [u.id, u]));

    return members.map((member) => ({
      ...member,
      user: userRefMap.get(member.userId) ?? null,
    }));
  }
}
