export default class Device {
  private _devices: any;
  private _userAgent: string;

  constructor() {
    this._devices = (window as any).device;
    this._userAgent = (window as any).navigator.userAgent.toLowerCase();
  }

  public isPortrait(): boolean {
    return ((window as any).innerHeight / (window as any).innerWidth) > 1;
  }

  public isLandscape(): boolean {
    return ((window as any).innerHeight / (window as any).innerWidth) < 1;
  }

  public isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet();
  }

  public isMobile(): boolean {
    return this.isAndroidPhone() || this.isIPhone() ||
      this.isIPod() || this.isWindowsPhone() ||
      this.isBlackBerryPhone();
  }

  public isTablet(): boolean {
    return this.isAndroidTablet() && this.isWindowsTablet() && this.isIPad();
  }

  public isIOS(): boolean {
    return this.isIPhone() || this.isIPod() || this.isIPad();
  }

  public isIPhone(): boolean {
    return !this.isWindows() && this._find('iphone');
  }

  public isIPod(): boolean {
    return this._find('ipod');
  }

  public isIPad(): boolean {
    return this._find('ipad');
  }

  public isAndroid(): boolean {
    return !this.isWindows() && this._find('android');
  }

  public isAndroidPhone(): boolean {
    return this.isAndroid() && this._find('mobile');
  }

  public isAndroidTablet(): boolean {
    return this.isAndroid() && !this._find('mobile');
  }

  public isBlackBerry(): boolean {
    return this._find('blackberry') || this._find('bb10') || this._find('rim');
  }

  public isBlackBerryPhone(): boolean {
    return this.isBlackBerry() && !this._find('tablet');
  }

  public isWindows(): boolean {
    return this._find('(<any>window).');
  }

  public isWindowsPhone(): boolean {
    return this.isWindows() && this._find('phone');
  }

  public isWindowsTablet(): boolean {
    return this.isWindows() && (this._find('touch') && !this.isWindowsPhone());
  }

  public _find(target: string): boolean {
    return this._userAgent.indexOf(target) !== -1;
  }
}
