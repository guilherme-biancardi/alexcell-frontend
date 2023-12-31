interface Device {
  id: number;
  storage: number;
  storageMeasure: 'GB' | 'TB';
  quantity: number;
}

interface DeviceModel {
  id: number;
  model: string;
  brand: string;
  createdAt: string;
}

interface DeviceModelWithDevices extends DeviceModel {
  devices: Device[];
}

export interface GetDeviceModelsRequest {
  search: string;
}

export interface GetDevicesDeviceModelsResponse {
  data: DeviceModelWithDevices[];
}

export interface GetModelsDeviceModelsResponse {
  data: DeviceModel[];
}

export interface CreateDeviceModelRequest {
  model: string;
  brand: string;
}
