import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    validateUser(username: string, password: string): any {
        if (username === 'admin' && password === 'adminpass')
            return { id: 1, username: 'admin', } //current user
        return null;// wrong uname or pass
    }

    generateToken(user: any): any {
        const payload = {username: user.username, sub:user.id}
        
        return this.jwtService.sign(payload,{expiresIn:'3m'});
    }

    
}