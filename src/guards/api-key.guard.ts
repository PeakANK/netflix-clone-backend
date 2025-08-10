import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly key: string | undefined;

  constructor() {
    this.key = process.env.X_API_KEY?.trim();
  }

  canActivate(context: ExecutionContext): boolean {
    // if (!this.key) return true;

    const req = context.switchToHttp().getRequest();
    const provided = (req.headers['x-api-key'] as string | undefined)?.trim();

    if (!provided || provided !== this.key) {
      throw new UnauthorizedException('Invalid or missing x-api-key');
    }
    return true;
  }
}
