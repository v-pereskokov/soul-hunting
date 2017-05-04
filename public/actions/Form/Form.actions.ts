import transport from '../../service/Transport/Transoprt';

export function send(url: string, data: any): any {
  return transport.post(url, data);
}
