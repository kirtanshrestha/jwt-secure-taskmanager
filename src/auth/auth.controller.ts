import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() body: { username: string, password: string }) {
        const user = this.authService.validateUser(body.username, body.password);

        if (!user)
            return { message: 'Invalid credentials' }

        const token = this.authService.generateToken(user);
        return { token };
    }

    @Get()
    @UseGuards(AuthGuard)
    getProtected(@Req() req) {
        return { message: 'protected route', user: req.user };
    }
}