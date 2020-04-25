import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiResponseProperty({
    type: 'string',
    format: 'string',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    deprecated: false,
  })
  accessToken: string;
}
