export interface CreateDeviceRequest {
  device_model_id: number;
  storage_measure: 'GB' | 'TB';
  storage: number;
  quantity: number;
}

export interface DeleteDeviceRequest {
  id: number;
}

export interface GetDevicesCountRequest {
  data: {
    devicesCount: number;
  };
}
