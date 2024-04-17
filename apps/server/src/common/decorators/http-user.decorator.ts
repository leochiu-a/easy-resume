import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const HttpUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
