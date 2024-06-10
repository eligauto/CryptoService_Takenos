import { Injectable } from '@nestjs/common';
import { ICryptoService } from './interfaces/crypto-service.interface';
import { CoinMarketCapService } from './crypto-data-providers/coinmarketcap.service';
import { CriptoYaService } from './crypto-data-providers/criptoya.service';

@Injectable()
export class CryptoService implements ICryptoService {
  constructor(
    private coinMarketCapService: CoinMarketCapService,
    private criptoYaService: CriptoYaService,
  ) {}

  async getTopCryptos(): Promise<any> {
    const coinMarketCapResponse = await this.coinMarketCapService.getCryptos();
    const usdtPriceInARS = await this.criptoYaService.getUsdtPriceInARS();

    const top5Cryptos = coinMarketCapResponse.data.data.slice(0, 5).map((crypto) => ({
      name: crypto.name,
      symbol: crypto.symbol,
      price_usd: crypto.quote.USD.price,
      price_ars: crypto.quote.USD.price * usdtPriceInARS,
      percent_change_24h: crypto.quote.USD.percent_change_24h,
    }));

    return top5Cryptos;
  }

  async getCryptoBySymbol(symbol: string): Promise<any> {
    const coinMarketCapResponse = await this.coinMarketCapService.getCryptos();
    const usdtPriceInARS = await this.criptoYaService.getUsdtPriceInARS();

    const crypto = coinMarketCapResponse.data.data.find((crypto) => crypto.symbol === symbol);

    if (crypto) {
      return {
        name: crypto.name,
        symbol: crypto.symbol,
        price_usd: crypto.quote.USD.price,
        price_ars: crypto.quote.USD.price * usdtPriceInARS,
        percent_change_24h: crypto.quote.USD.percent_change_24h,
      };
    }

    return null;
  }
}
