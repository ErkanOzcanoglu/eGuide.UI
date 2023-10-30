export class Model {
  StationModelId='';
  Id='';
  StationName='';
  
  Latitude='';
  Longitude='';
  Address='';
  CreateDate=''
  socket: Sockets[] = [
    {
      Id: '',
      SocketName:'',
      SocketType: '',
      Current:'',
      Power:'',
      Voltage:'',
      connector: [
        {
          Id: '',
          Icon:'',
          ConnectorType:''
        },
      ],
    },
  ];
}

interface Sockets {
  Id: string;
  SocketName:string,
  SocketType:string,
  Current:string,
  Power:string,
  Voltage:string
  connector: Connectors[];
}

interface Connectors {
  Id: string;
  Icon:string,
  ConnectorType:string
}
