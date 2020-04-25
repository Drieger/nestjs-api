import { ApiResponseProperty } from '@nestjs/swagger';

export class LogoutResponseDTO {
  @ApiResponseProperty({
    type: 'number',
    format: 'number',
    example: 200,
    deprecated: false,
  })
  readonly statusCode: number;

  @ApiResponseProperty({
    type: 'boolean',
    format: 'boolean',
    example: true,
    deprecated: false,
  })
  readonly success: boolean;
}
