import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './uploads/uploads.module';
import { Product } from './products/entities/product.entity';
import { Media } from './media/entities/media.entity';
import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { Tag } from './tags/entities/tag.entity';
import { Category } from './categories/entities/category.entity';
import { AccountsModule } from './accounts/accounts.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { PaymentsModule } from './payments/payments.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'shop',
      entities: [Product, Media, Tag, Category],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync schema in development
      logging: process.env.NODE_ENV === 'development',
    }),
    ProductsModule,
    UploadsModule,
    MediaModule,
    TagsModule,
    CategoriesModule,
    AccountsModule,
    RolesModule,
    PermissionsModule,
    OrdersModule,
    CartsModule,
    PaymentsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
