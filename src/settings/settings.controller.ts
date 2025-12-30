import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // ============================================
  // SITE ENDPOINTS (Public - for Vue/Nuxt site)
  // ============================================

  /**
   * GET /settings/public
   * Public endpoint for site to get settings
   * Used by Nuxt/Vue site to fetch theme colors, site info, etc.
   */
  @Get('public')
  async getPublicSettings() {
    return await this.settingsService.getPublicSettings();
  }

  // ============================================
  // PANEL ENDPOINTS (Admin - for Vue admin panel)
  // ============================================

  /**
   * GET /settings
   * Get current settings for admin panel
   */
  @Get()
  async findCurrent() {
    const settings = await this.settingsService.findCurrent();
    if (!settings) {
      // Initialize with defaults if no settings exist
      return await this.settingsService.initializeDefaults();
    }
    return settings;
  }

  /**
   * GET /settings/:id
   * Get settings by ID (for admin panel)
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.settingsService.findOne(id);
  }

  /**
   * POST /settings
   * Create or update settings (upsert)
   * For admin panel: creates new settings or updates existing
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.upsert(createSettingDto);
  }

  /**
   * PATCH /settings
   * Update current settings (upsert by finding current first)
   * For admin panel: update settings without needing ID
   */
  @Patch()
  async updateCurrent(@Body() updateSettingDto: Partial<CreateSettingDto>) {
    const current = await this.settingsService.findCurrent();
    if (current) {
      return await this.settingsService.update({
        ...updateSettingDto,
        id: current.id,
      });
    }
    return await this.settingsService.upsert(
      updateSettingDto as CreateSettingDto,
    );
  }

  /**
   * PATCH /settings/:id
   * Update settings by ID
   * For admin panel: update specific settings record
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: Omit<UpdateSettingDto, 'id'>,
  ) {
    return await this.settingsService.update({ ...updateSettingDto, id });
  }

  /**
   * POST /settings/initialize
   * Initialize default settings if none exist
   * Useful for first-time setup
   */
  @Post('initialize')
  @HttpCode(HttpStatus.OK)
  async initialize() {
    return await this.settingsService.initializeDefaults();
  }
}
