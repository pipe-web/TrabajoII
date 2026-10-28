import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [EquiposModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
