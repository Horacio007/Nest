import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { GenderModule } from './gender/gender.module';
import { CommonModule } from './common/common.module';
import { SizesModule } from './sizes/sizes.module';
import { ProductSizeModule } from './product-size/product-size.module';

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
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        driver: "msnodesqlv8",
        options: {
          trustedConnection: true,
          trustServerCertificate: true,
          encrypt: false,
        }
      }
    }),
    TypeOrmModule.forRoot({
      name:'PoS',
      type: 'mssql',
      host: '192.168.42.52',
      //port: +process.env.DB_PORT,
      database: 'PoS',
      username: process.env.DB_USERNAME,
      password: 'B1Admin',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        driver: "msnodesqlv8",
        options: {
          trustedConnection: true,
          trustServerCertificate: true,
          encrypt: false,
        }
      }
    }),
    ProductsModule,
    GenderModule,
    CommonModule,
    SizesModule,
    ProductSizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
