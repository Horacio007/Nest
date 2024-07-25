import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      extra: {
        driver: "msnodesqlv8",
        options: {
          trustedConnection: true,
          trustServerCertificate: true,
          encrypt: false,
        }
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
