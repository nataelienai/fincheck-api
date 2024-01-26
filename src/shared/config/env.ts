import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  NotEquals,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  frontendUrl: string;

  @IsNumber()
  port: number;
}

export const env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
  port: Number(process.env.PORT) || 3000,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
