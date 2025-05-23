export type Theme = "light" | "dark" | "system";

export type Settings = {
  theme: Theme;
  /**
   * Automatically sync schedule
   */
  autoSync: boolean;
  /**
   * Sync period in minutes
   */
  syncPeriod: number;
  personal: boolean;
};
