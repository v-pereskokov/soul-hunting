import * as fetch from 'isomorphic-fetch';

class Transport {
  private _headers: any;
  private _baseUrl: string;

  constructor() {
    if (Transport.__instance) {
      return Transport.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    Transport.__instance = this;
  }

  get BaseUrl(): string {
    return this._baseUrl;
  }

  set BaseUrl(url: string) {
    this._baseUrl = url;
  }

  get Headers(): any {
    return this._headers;
  }

  set Headers(value: any) {
    if (!(value && (`${value}` === '[object Object]'))) {
      throw new TypeError('Headers must be a plain object');
    }

    const valid = Object.keys(value).every(key => typeof value[key] === 'string');

    if (!valid) {
      throw new TypeError('Headers must be a plain object');
    }

    this._headers = value;
  }

  public get(uri: string): any {
    return this._senderGet(uri, 'GET');
  }

  public post(uri: string, data: any = {}): any {
    return this._senderPost(uri, 'POST', data);
  }

  private _senderPost(uri: string, _method: string, data: any,
              _headers: any = { 'Content-Type': 'application/json; charset=utf-8' },
              coockies: string = 'include'): any {
    return fetch(this._baseUrl + uri, {
      method: _method,
      headers: _headers,
      mode: 'cors',
      body: data,
      credentials: coockies
    });
  }

  private _senderGet(uri: string, _method: string,
             _headers: any = { 'Content-Type': 'application/json; charset=utf-8' },
             coockies: string = 'include'): any {
    return fetch(this._baseUrl + uri, {
      method: _method,
      headers: _headers,
      mode: 'cors',
      credentials: coockies
    });
  }
}

const transport = new Transport();
transport._baseUrl = 'https://ananymous.herokuapp.com/api';

export default transport;
