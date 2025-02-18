import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    description: 'The name of the menu item',
    example: 'Main Menu',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'The ID of the parent menu item (if this is a child menu)',
    example: 'uuid-of-parent-menu',
  })
  @IsString()
  @IsOptional()
  parentId?: string;
}
