export interface CreateDeviceRequest {
  device_model_id: number;
  storage_measure: 'GB' | 'TB';
  storage: number;
  quantity: number;
}
