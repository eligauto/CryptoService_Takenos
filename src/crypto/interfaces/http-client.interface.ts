import { AxiosResponse } from "axios";

export interface IHttpClient {
  get(url: string, options?: any): Promise<AxiosResponse<any>>;
}