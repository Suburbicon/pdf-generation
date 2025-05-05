type AdapterWarning = {
  message: string;
  tags?: Record<string, string>;
};

/**
 * @description collect warnings while converting some data structure
 * and then call Sentry or whatever
 */
class AdapterContext {
  private warnings: Array<AdapterWarning> = [];

  getWarnings() {
    return this.warnings;
  }

  addWarning(warning: AdapterWarning) {
    this.warnings.push(warning);
  }
}

export type { AdapterWarning };
export { AdapterContext };
