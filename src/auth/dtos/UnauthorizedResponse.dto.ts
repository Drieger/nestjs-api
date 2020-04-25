import { ApiResponseProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDTO {
  @ApiResponseProperty({
    type: 'number',
    format: 'number',
    example: 401,
    deprecated: false,
  })
  readonly statusCode: number;

  @ApiResponseProperty({
    type: 'string',
    format: 'string',
    example: 'Unauthorized',
    deprecated: false,
  })
  readonly error: string;
}
