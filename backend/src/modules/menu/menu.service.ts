import { BaseService } from '@/common/base.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService extends BaseService<'menu'> {
  constructor(public readonly prismaService: PrismaService) {
    super(prismaService, 'menu');
  }

  async createMenu(createMenuDto: CreateMenuDto) {
    return this.create({
      data: createMenuDto,
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findAll() {
    return this.findMany({
      where: {
        parentId: null, // Get root level menus
      },
      include: {
        children: {
          include: {
            children: true, // Recursive include for nested levels
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const menu = await this.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          include: {
            children: true, // Recursive include for nested levels
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    // Check if menu exists
    await this.findOne(id);

    return this.update({
      where: { id },
      data: updateMenuDto,
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async remove(id: string) {
    // Check if menu exists
    const menu = await this.findOne(id);

    // If this menu has children, we need to handle them
    if (menu.children.length > 0) {
      // Option 1: Delete all children (cascade delete)
      await this.deleteMany({
        where: {
          parentId: id,
        },
      });
    }

    return this.delete({
      where: { id },
      include: {
        parent: true,
      },
    });
  }

  // Additional method to get menu with all its descendants
  async getMenuTree(rootId: string) {
    return this.findUnique({
      where: { id: rootId },
      include: {
        children: true
      },
    });
  }
}
