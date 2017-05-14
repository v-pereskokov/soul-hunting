export default class Device {
  _devices: any;
  _userAgent: string;

  constructor() {
    this._devices = (<any>window).device;
    this._userAgent = (<any>window).navigator.userAgent.toLowerCase();
  }

  isPortrait():boolean {
    return ((<any>window).innerHeight / (<any>window).innerWidth) > 1;
  }

  isLandscape():boolean {
    return ((<any>window).innerHeight / (<any>window).innerWidth) < 1;
  }

  isDesktop():boolean {
    return !this.isMobile() && !this.isTablet();
  }

  isMobile():boolean {
    return this.isAndroidPhone() || this.isIPhone() || this.isIPod() || this.isWindowsPhone() || this.isBlackBerryPhone();
  }

  isTablet():boolean {
    return this.isAndroidTablet() && this.isWindowsTablet() && this.isIPad();
  }

  isIOS():boolean {
    return this.isIPhone() || this.isIPod() || this.isIPad();
  }

  isIPhone():boolean {
    return !this.isWindows() && this._find('iphone');
  }

  isIPod():boolean {
    return this._find('ipod');
  }

  isIPad():boolean {
    return this._find('ipad');
  }

  isAndroid():boolean {
    return !this.isWindows() && this._find('android');
  }

  isAndroidPhone():boolean {
    return this.isAndroid() && this._find('mobile');
  }

  isAndroidTablet():boolean {
    return this.isAndroid() && !this._find('mobile');
  }

  isBlackBerry():boolean {
    return this._find('blackberry') || this._find('bb10') || this._find('rim');
  }

  isBlackBerryPhone():boolean {
    return this.isBlackBerry() && !this._find('tablet');
  }

  isWindows():boolean {
    return this._find('(<any>window).');
  }

  isWindowsPhone():boolean {
    return this.isWindows() && this._find('phone');
  }

  isWindowsTablet():boolean {
    return this.isWindows() && (this._find('touch') && !this.isWindowsPhone());
  }

  _find(target: string):boolean {
    return this._userAgent.indexOf(target) !== -1;
  }
}
