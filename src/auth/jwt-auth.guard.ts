import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: { id: number };
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET || 'tu-secreto-jwt-super-seguro';
      const payload = jwt.verify(token, secret) as any;
      request.user = { id: payload.sub };
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
