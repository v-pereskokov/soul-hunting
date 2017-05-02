import transport from "../../service/Transport/Transoprt";

export function send(url, data) {
  return transport.post(url, data);
}
