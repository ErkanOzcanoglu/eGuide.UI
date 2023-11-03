export class Model {
  StationModelId = '';
  id = '';
  stationName = '';
  Latitude = '';
  Longitude = '';
  address = '';
  CreateDate = '';
  stationModelName = '';
  socket: Sockets[] = [
    {
      id: '',
      socketName: '',
      socketType: '',
      current: '',
      power: '',
      voltage: '',
      connector: [
        {
          connectorId: '',
          icon: '',
          connectorType: '',
        },
      ],
    },
  ];
}

interface Sockets {
  id: string;
  socketName: string;
  socketType: string;
  current: string;
  power: string;
  voltage: string;
  connector: Connectors[];
}

interface Connectors {
  connectorId: string;
  icon: string;
  connectorType: string;
}
