import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TasksModule, AuthModule, PassportModule,
    JwtModule.register({
      secret: 'mySuperSecretKey123!@#^&*()_+-=',
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
