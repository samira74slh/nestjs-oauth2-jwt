import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const USER = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const { user } = await ctx.switchToHttp().getRequest();
        return data ? user?.[data] : user;
    }
)