import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  /**
   * Create initial settings (only if no settings exist)
   */
  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    // Check if settings already exist
    const existingSettings = await this.settingRepository.find();
    if (existingSettings.length > 0) {
      // Update the existing settings instead
      const existing = existingSettings[0];
      Object.assign(existing, createSettingDto);
      return await this.settingRepository.save(existing);
    }

    const setting = this.settingRepository.create(createSettingDto);
    return await this.settingRepository.save(setting);
  }

  /**
   * Get current settings (returns single settings record)
   * For Site: Public access to get site configuration
   */
  async findCurrent(): Promise<Setting | null> {
    const settings = await this.settingRepository.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });
    return settings.length > 0 ? settings[0] : null;
  }

  /**
   * Get settings by ID
   * For Panel: Admin access
   */
  async findOne(id: string): Promise<Setting> {
    const setting = await this.settingRepository.findOne({ where: { id } });
    if (!setting) {
      throw new NotFoundException('تنظیمات یافت نشد');
    }
    return setting;
  }

  /**
   * Update settings by ID
   * For Panel: Admin can update settings
   */
  async update(updateSettingDto: UpdateSettingDto): Promise<Setting> {
    const setting = await this.findOne(updateSettingDto.id);
    Object.assign(setting, updateSettingDto);
    return await this.settingRepository.save(setting);
  }

  /**
   * Update current settings (upsert - create if not exists, update if exists)
   * Convenient method for panel when ID is not known
   */
  async upsert(createSettingDto: CreateSettingDto): Promise<Setting> {
    const current = await this.findCurrent();
    if (current) {
      Object.assign(current, createSettingDto);
      return await this.settingRepository.save(current);
    }
    return await this.create(createSettingDto);
  }

  /**
   * Initialize default settings if none exist
   */
  async initializeDefaults(): Promise<Setting> {
    const current = await this.findCurrent();
    if (current) {
      return current;
    }

    const defaultSettings = {
      siteName: 'فروشگاه من',
      primaryColor: '#3b82f6',
      secondaryColor: '#6366f1',
      accentColor: '#10b981',
      currency: 'تومان',
      currencyCode: 'IRR',
      isStoreOpen: true,
    };

    const setting = this.settingRepository.create(defaultSettings);
    return await this.settingRepository.save(setting);
  }

  /**
   * Get public settings for site (excludes sensitive data)
   */
  async getPublicSettings(): Promise<Partial<Setting> | null> {
    const settings = await this.findCurrent();
    if (!settings) {
      return null;
    }

    // Return only public fields (exclude analytics IDs, etc.)
    return {
      id: settings.id,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      accentColor: settings.accentColor,
      siteName: settings.siteName,
      siteSlogan: settings.siteSlogan,
      siteDescription: settings.siteDescription,
      siteKeywords: settings.siteKeywords,
      siteLogo: settings.siteLogo,
      siteLogoDark: settings.siteLogoDark,
      siteFavicon: settings.siteFavicon,
      siteEmail: settings.siteEmail,
      sitePhone: settings.sitePhone,
      siteMobile: settings.siteMobile,
      siteAddress: settings.siteAddress,
      siteCity: settings.siteCity,
      siteProvince: settings.siteProvince,
      sitePostalCode: settings.sitePostalCode,
      socialInstagram: settings.socialInstagram,
      socialTelegram: settings.socialTelegram,
      socialWhatsapp: settings.socialWhatsapp,
      socialTwitter: settings.socialTwitter,
      socialLinkedin: settings.socialLinkedin,
      socialYoutube: settings.socialYoutube,
      footerAbout: settings.footerAbout,
      siteCopyright: settings.siteCopyright,
      currency: settings.currency,
      currencyCode: settings.currencyCode,
      taxRate: settings.taxRate,
      shippingCost: settings.shippingCost,
      freeShippingThreshold: settings.freeShippingThreshold,
      isStoreOpen: settings.isStoreOpen,
      storeClosedMessage: settings.storeClosedMessage,
      workingHours: settings.workingHours,
      mapLatitude: settings.mapLatitude,
      mapLongitude: settings.mapLongitude,
    };
  }
}
