import * as fetch from 'isomorphic-fetch';

class Transport {
  private static __instance: any;
  private _headers: any;
  private _baseUrl: string;

  constructor() {
    if (Transport.__instance) {
      return Transport.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    Transport.__instance = this;

    this.setUpHeaders();
  }

  get BaseUrl(): string {
    return this._baseUrl;
  }

  set BaseUrl(url: string) {
    this._baseUrl = url;
  }

  public get(uri: string): any {
    return this._sender(uri, 'GET');
  }

  public post(uri: string, data: any = {}): any {
    return this._sender(uri, 'POST', data);
  }

  private _sender(uri: string, type?: string, data?: any): any {
    const options = {
      method: type,
      body: data
    };

    return fetch(this._baseUrl + uri, this.setRequest(options));
  }

  private setRequest(options?: any): any {
    return {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: options.body,
      credentials: 'include',
      cache: 'default'
    };
  }

  private getFetchRequest(options?: any): any {
    return this.setRequest(options);
  }

  private setUpHeaders() {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }
}

const transport = new Transport();
transport.BaseUrl = '/api';

export default transport;
