import { Connector } from './connector';

export class Socket {
  id = '';
  power = 0;
  voltage = 0;
  current = 0;
  type = '';
  name = '';
  connectorId = 0;
  editingMode = false;
  connector?: Connector;
}
