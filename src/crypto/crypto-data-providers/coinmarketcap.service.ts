import { Injectable, Inject, InternalServerErrorException, BadRequestException, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { IHttpClient } from '../interfaces/http-client.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class CoinMarketCapService {
  private getTopCryptosUrl = process.env.COINMARKETCAP_API_URL + '/listings/latest';
  private getCryptoBySymbolUrl = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"

  constructor(@Inject('IHttpClient') private httpClient: IHttpClient) {}

  async getCryptos(): Promise<AxiosResponse<any>> {
    const options = {
      headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY },
      };
      try {
      
      const response = await this.httpClient.get(this.getTopCryptosUrl, options);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCryptoBySymbol(symbol: string): Promise<any> {
    const options = {
      headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY },
    };
    try {
      const response = await this.httpClient.get(`${this.getCryptoBySymbolUrl}?symbol=${symbol}`, options);
      return response.data.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    if (error.response && error.response.data && error.response.data.status) {
      const { error_code, error_message } = error.response.data.status;
      switch (error_code) {
        case 400:
          throw new BadRequestException(error_message);
        case 1001:
          throw new UnauthorizedException('API key invalid');
        case 1002:
          throw new UnauthorizedException('API key missing.');
        case 1006:
          throw new ForbiddenException('Your API Key subscription plan doesn\'t support this endpoint.');
        case 1008:
          throw new HttpException('You\'ve exceeded your API Key\'s HTTP request rate limit.', HttpStatus.TOO_MANY_REQUESTS);
        case 500:
          throw new InternalServerErrorException('An internal server error occurred');
        default:
          throw new InternalServerErrorException('An unknown error occurred');
      }
    } else {
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }
}
