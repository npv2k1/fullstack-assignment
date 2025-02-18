import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuQueryDto } from './dto/find-menu.query.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({
    status: 201,
    description: 'The menu item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get menu items with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of menu items based on the provided filters.',
  })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  async findAll(@Query() query: FindMenuQueryDto) {
    try {
      const where: Prisma.MenuWhereInput = {
        name: query.name ? { contains: query.name, mode: 'insensitive' } : undefined,
        parentId: query.parentId || null,
      };

      return await this.menuService.findMany({
        where,
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid query parameters');
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific menu item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the menu item with its immediate children.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Get(':id/tree')
  @ApiOperation({ summary: 'Get complete menu tree starting from a specific item' })
  @ApiResponse({
    status: 200,
    description: 'Returns the complete menu tree structure starting from the specified item.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  getMenuTree(@Param('id') id: string) {
    return this.menuService.getMenuTree(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item and optionally its children' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
