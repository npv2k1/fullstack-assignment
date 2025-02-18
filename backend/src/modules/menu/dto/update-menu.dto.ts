import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiPropertyOptional({
    description: 'The name of the menu item',
    example: 'Updated Menu Name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The ID of the parent menu item (if this is a child menu)',
    example: 'uuid-of-parent-menu',
  })
  parentId?: string;
}
