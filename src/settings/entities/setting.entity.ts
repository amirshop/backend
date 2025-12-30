import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'settings',
})
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Theme Colors
  @Column({
    type: 'varchar',
    length: 50,
    default: '#3b82f6',
  })
  primaryColor: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '#6366f1',
  })
  secondaryColor: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '#10b981',
  })
  accentColor: string;

  // Site Information
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  siteName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  siteSlogan: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  siteDescription: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  siteKeywords: string | null;

  // Site Assets
  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  siteLogo: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  siteLogoDark: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  siteFavicon: string | null;

  // Contact Information
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  siteEmail: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  sitePhone: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  siteMobile: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  siteAddress: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  siteCity: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  siteProvince: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  sitePostalCode: string | null;

  // Social Media
  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialInstagram: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialTelegram: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialWhatsapp: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialTwitter: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialLinkedin: string | null;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  socialYoutube: string | null;

  // Footer
  @Column({
    type: 'text',
    nullable: true,
  })
  footerAbout: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  siteCopyright: string | null;

  // SEO & Analytics
  @Column({
    type: 'text',
    nullable: true,
  })
  googleAnalyticsId: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  googleTagManagerId: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  metaPixelId: string | null;

  // E-commerce Settings
  @Column({
    type: 'varchar',
    length: 10,
    default: 'تومان',
  })
  currency: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'IRR',
  })
  currencyCode: string;

  @Column({
    type: 'int',
    default: 0,
  })
  taxRate: number;

  @Column({
    type: 'int',
    default: 0,
  })
  shippingCost: number;

  @Column({
    type: 'int',
    default: 0,
  })
  freeShippingThreshold: number;

  // Store Status
  @Column({
    type: 'boolean',
    default: true,
  })
  isStoreOpen: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  storeClosedMessage: string | null;

  // Working Hours
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  workingHours: string | null;

  // Map Coordinates
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  mapLatitude: number | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  mapLongitude: number | null;

  // Header Settings
  @Column({
    type: 'varchar',
    length: 50,
    default: 'default',
  })
  headerStyle: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  headerSticky: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  headerShowSearch: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  headerShowCart: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  headerShowCategories: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  headerTopBarText: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  headerTopBarBgColor: string | null;

  @Column({
    type: 'boolean',
    default: false,
  })
  headerTopBarEnabled: boolean;

  // Footer Settings
  @Column({
    type: 'varchar',
    length: 50,
    default: 'default',
  })
  footerStyle: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  footerShowNewsletter: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  footerNewsletterTitle: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  footerNewsletterDescription: string | null;

  @Column({
    type: 'boolean',
    default: true,
  })
  footerShowSocial: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  footerShowContact: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  footerTrustBadges: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  footerBgColor: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  footerTextColor: string | null;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
