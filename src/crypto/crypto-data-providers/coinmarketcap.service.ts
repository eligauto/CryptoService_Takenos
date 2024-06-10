import { Injectable, Inject } from '@nestjs/common';
import { IHttpClient } from '../interfaces/http-client.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class CoinMarketCapService {
  private coinMarketCapUrl = process.env.COINMARKETCAP_API_URL;

  constructor(@Inject('IHttpClient') private httpClient: IHttpClient) {}

  async getCryptos(symbol?: string): Promise<AxiosResponse<any>> {
    const options = {
      headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY },
    };
    return await this.httpClient.get(this.coinMarketCapUrl, options);
  }
}
