import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Media } from './media/entities/media.entity';
import { MediaModule } from './media/media.module';
import { Menu } from './menus/entities/menu.entity';
import { MenusModule } from './menus/menus.module';
import { Permission } from './permissions/entities/permission.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { Setting } from './settings/entities/setting.entity';
import { SettingsModule } from './settings/settings.module';
import { Slider } from './sliders/entities/slider.entity';
import { SlidersModule } from './sliders/sliders.module';
import { Tag } from './tags/entities/tag.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'shop',
      entities: [
        Product,
        Media,
        Tag,
        Category,
        Setting,
        Slider,
        Menu,
        Permission,
        Role,
      ],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync schema in development
      logging: process.env.NODE_ENV === 'development',
    }),
    ProductsModule,
    MediaModule,
    TagsModule,
    CategoriesModule,
    AccountsModule,
    RolesModule,
    PermissionsModule,
    SettingsModule,
    SlidersModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
