import { storage } from './piStorage';

const CATEGORY_PREFS_KEY = 'user.category.preferences';
const DEFAULT_CATEGORIES = ['Health and habit'];

export const CategoryPreferencesService = {
  /**
   * Saves the list of active categories in MMKV.
   */
  saveActiveCategories: (categories: string[]): void => {
    storage.set(CATEGORY_PREFS_KEY, JSON.stringify(categories));
  },

  /**
   * Retrieves the list of active categories from MMKV.
   * Defaults to ['Health and habit'] if none are saved.
   */
  getActiveCategories: (): string[] => {
    const raw = storage.getString(CATEGORY_PREFS_KEY);
    if (!raw) {
      return DEFAULT_CATEGORIES;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  }
};
