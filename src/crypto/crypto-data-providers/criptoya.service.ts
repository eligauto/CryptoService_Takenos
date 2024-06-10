import { Inject, Injectable } from '@nestjs/common';
import { IHttpClient } from '../interfaces/http-client.interface';
import { CriptoYaResponse } from '../interfaces/crypto-service.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class CriptoYaService {
  private criptoYaUrl = process.env.CRIPTOYA_API_URL;

  constructor(@Inject('IHttpClient') private httpClient: IHttpClient) {}

  async getUsdtPriceInARS(): Promise<number> {
    const response: AxiosResponse<CriptoYaResponse> = await this.httpClient.get(this.criptoYaUrl);
    const data = response.data;
    return data.totalBid;
  }
}