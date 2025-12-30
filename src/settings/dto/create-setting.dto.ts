import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createSettingSchema = z.object({
  // Theme Colors
  primaryColor: z
    .string()
    .min(1, 'رنگ اصلی الزامی است')
    .max(50)
    .default('#3b82f6'),
  secondaryColor: z
    .string()
    .min(1, 'رنگ ثانویه الزامی است')
    .max(50)
    .default('#6366f1'),
  accentColor: z.string().max(50).default('#10b981'),

  // Site Information
  siteName: z
    .string()
    .min(1, 'نام سایت الزامی است')
    .max(255, 'نام سایت نباید بیش از ۲۵۵ کاراکتر باشد'),
  siteSlogan: z.string().max(255).optional().nullable(),
  siteDescription: z.string().optional().nullable(),
  siteKeywords: z.string().optional().nullable(),

  // Site Assets
  siteLogo: z.string().max(500).optional().nullable(),
  siteLogoDark: z.string().max(500).optional().nullable(),
  siteFavicon: z.string().max(500).optional().nullable(),

  // Contact Information
  siteEmail: z
    .string()
    .email('ایمیل نامعتبر است')
    .max(255)
    .optional()
    .nullable(),
  sitePhone: z.string().max(50).optional().nullable(),
  siteMobile: z.string().max(50).optional().nullable(),
  siteAddress: z.string().optional().nullable(),
  siteCity: z.string().max(100).optional().nullable(),
  siteProvince: z.string().max(100).optional().nullable(),
  sitePostalCode: z.string().max(20).optional().nullable(),

  // Social Media
  socialInstagram: z.string().max(500).optional().nullable(),
  socialTelegram: z.string().max(500).optional().nullable(),
  socialWhatsapp: z.string().max(50).optional().nullable(),
  socialTwitter: z.string().max(500).optional().nullable(),
  socialLinkedin: z.string().max(500).optional().nullable(),
  socialYoutube: z.string().max(500).optional().nullable(),

  // Footer
  footerAbout: z.string().optional().nullable(),
  siteCopyright: z.string().max(255).optional().nullable(),

  // SEO & Analytics
  googleAnalyticsId: z.string().optional().nullable(),
  googleTagManagerId: z.string().optional().nullable(),
  metaPixelId: z.string().optional().nullable(),

  // E-commerce Settings
  currency: z.string().max(10).default('تومان'),
  currencyCode: z.string().max(10).default('IRR'),
  taxRate: z
    .number()
    .int('درصد مالیات باید عدد صحیح باشد')
    .min(0, 'درصد مالیات نمی‌تواند منفی باشد')
    .max(100, 'درصد مالیات نمی‌تواند بیش از ۱۰۰ باشد')
    .default(0),
  shippingCost: z
    .number()
    .int('هزینه ارسال باید عدد صحیح باشد')
    .min(0, 'هزینه ارسال نمی‌تواند منفی باشد')
    .default(0),
  freeShippingThreshold: z
    .number()
    .int('سقف ارسال رایگان باید عدد صحیح باشد')
    .min(0, 'سقف ارسال رایگان نمی‌تواند منفی باشد')
    .default(0),

  // Store Status
  isStoreOpen: z.boolean().default(true),
  storeClosedMessage: z.string().optional().nullable(),

  // Working Hours
  workingHours: z.string().max(255).optional().nullable(),

  // Map Coordinates
  mapLatitude: z.number().min(-90).max(90).optional().nullable(),
  mapLongitude: z.number().min(-180).max(180).optional().nullable(),

  // Header Settings
  headerStyle: z.string().max(50).default('default'),
  headerSticky: z.boolean().default(true),
  headerShowSearch: z.boolean().default(true),
  headerShowCart: z.boolean().default(true),
  headerShowCategories: z.boolean().default(true),
  headerTopBarText: z.string().max(500).optional().nullable(),
  headerTopBarBgColor: z.string().max(50).optional().nullable(),
  headerTopBarEnabled: z.boolean().default(false),

  // Footer Settings
  footerStyle: z.string().max(50).default('default'),
  footerShowNewsletter: z.boolean().default(true),
  footerNewsletterTitle: z.string().max(255).optional().nullable(),
  footerNewsletterDescription: z.string().optional().nullable(),
  footerShowSocial: z.boolean().default(true),
  footerShowContact: z.boolean().default(true),
  footerTrustBadges: z.string().optional().nullable(),
  footerBgColor: z.string().max(50).optional().nullable(),
  footerTextColor: z.string().max(50).optional().nullable(),
});

export class CreateSettingDto extends createZodDto(createSettingSchema) {}
