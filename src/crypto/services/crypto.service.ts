import { Injectable, InternalServerErrorException, BadRequestException, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { ICryptoService } from '../interfaces/crypto-service.interface';
import { CoinMarketCapService } from '../crypto-data-providers/coinmarketcap.service';
import { CriptoYaService } from '../crypto-data-providers/criptoya.service';


@Injectable()
export class CryptoService implements ICryptoService {
  constructor(
    private coinMarketCapService: CoinMarketCapService,
    private criptoYaService: CriptoYaService,
  ) {}

  async getTopCryptos(): Promise<any> {
    try {
      const coinMarketCapResponse = await this.coinMarketCapService.getCryptos();
      const usdtPriceInARS = await this.criptoYaService.getUsdtPriceInARS();

      const top5Cryptos = coinMarketCapResponse.data.data
        .slice(0, 5)
        .map((crypto) => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price_usd: crypto.quote.USD.price,
          price_ars: crypto.quote.USD.price * usdtPriceInARS,
          percent_change_24h: crypto.quote.USD.percent_change_24h,
        }));

      return top5Cryptos;
    } catch (error) {
      this.handleServiceError(error, 'Error getting top cryptos');
    }
  }

  async getCryptoBySymbol(symbol: string): Promise<any> {
    try {
      const coinMarketCapResponse = await this.coinMarketCapService.getCryptoBySymbol(symbol);
      const usdtPriceInARS = await this.criptoYaService.getUsdtPriceInARS();
  
      const cryptoData = coinMarketCapResponse[symbol];
  
      if (cryptoData && cryptoData.length > 0) {
        const crypto = cryptoData[0];
        return {
          name: crypto.name,
          symbol: crypto.symbol,
          price_usd: crypto.quote.USD.price,
          price_ars: crypto.quote.USD.price * usdtPriceInARS,
          percent_change_24h: crypto.quote.USD.percent_change_24h,
        };
      } else {
        throw new HttpException(
          `Cryptocurrency with symbol ${symbol} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      this.handleServiceError(error, 'Error getting crypto by symbol');
    }
  }

  private handleServiceError(error: any, defaultMessage: string): void {
    if (error instanceof BadRequestException || 
        error instanceof UnauthorizedException || 
        error instanceof ForbiddenException || 
        error instanceof HttpException || 
        error instanceof InternalServerErrorException) {
      throw error;
    }
    throw new InternalServerErrorException(defaultMessage);
  }
}
