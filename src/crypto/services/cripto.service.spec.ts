import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { CoinMarketCapService } from '../crypto-data-providers/coinmarketcap.service';
import { CriptoYaService } from '../crypto-data-providers/criptoya.service';
import {
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';

describe('CryptoService', () => {
  let service: CryptoService;
  let coinMarketCapService: CoinMarketCapService;
  let criptoYaService: CriptoYaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: CoinMarketCapService,
          useValue: {
            getCryptos: jest.fn(),
            getCryptoBySymbol: jest.fn(),
          },
        },
        {
          provide: CriptoYaService,
          useValue: {
            getUsdtPriceInARS: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
    coinMarketCapService =
      module.get<CoinMarketCapService>(CoinMarketCapService);
    criptoYaService = module.get<CriptoYaService>(CriptoYaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTopCryptos', () => {
    it('should return top 5 cryptos with prices in USD and ARS', async () => {
      const coinMarketCapResponse: AxiosResponse = {
        data: {
          data: [
            {
              name: 'Bitcoin',
              symbol: 'BTC',
              quote: { USD: { price: 30000, percent_change_24h: 1 } },
            },
            {
              name: 'Ethereum',
              symbol: 'ETH',
              quote: { USD: { price: 2000, percent_change_24h: 2 } },
            },
            // Add 3 more cryptos here
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };
      const usdtPriceInARS = 100;

      jest
        .spyOn(coinMarketCapService, 'getCryptos')
        .mockResolvedValue(coinMarketCapResponse);
      jest
        .spyOn(criptoYaService, 'getUsdtPriceInARS')
        .mockResolvedValue(usdtPriceInARS);

      const result = await service.getTopCryptos();

      expect(result).toEqual([
        {
          name: 'Bitcoin',
          symbol: 'BTC',
          price_usd: 30000,
          price_ars: 3000000,
          percent_change_24h: 1,
        },
        {
          name: 'Ethereum',
          symbol: 'ETH',
          price_usd: 2000,
          price_ars: 200000,
          percent_change_24h: 2,
        },
      ]);
    });

    it('should handle errors gracefully', async () => {
      jest
        .spyOn(coinMarketCapService, 'getCryptos')
        .mockRejectedValue(new Error('API Error'));

      await expect(service.getTopCryptos()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getCryptoBySymbol', () => {
    it('should return crypto by symbol with prices in USD and ARS', async () => {
      const coinMarketCapResponse = {
        BTC: [
          {
            name: 'Bitcoin',
            symbol: 'BTC',
            quote: { USD: { price: 30000, percent_change_24h: 1 } },
          },
        ],
      };
      const usdtPriceInARS = 100;

      jest
        .spyOn(coinMarketCapService, 'getCryptoBySymbol')
        .mockResolvedValue(coinMarketCapResponse);
      jest
        .spyOn(criptoYaService, 'getUsdtPriceInARS')
        .mockResolvedValue(usdtPriceInARS);

      const result = await service.getCryptoBySymbol('BTC');

      expect(result).toEqual({
        name: 'Bitcoin',
        symbol: 'BTC',
        price_usd: 30000,
        price_ars: 3000000,
        percent_change_24h: 1,
      });
    });

    it('should handle not found error gracefully', async () => {
      const coinMarketCapResponse: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest
        .spyOn(coinMarketCapService, 'getCryptoBySymbol')
        .mockResolvedValue(coinMarketCapResponse);

      await expect(service.getCryptoBySymbol('UNKNOWN')).rejects.toThrow(
        new HttpException(
          'Cryptocurrency with symbol UNKNOWN not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should handle errors gracefully', async () => {
      jest
        .spyOn(coinMarketCapService, 'getCryptoBySymbol')
        .mockRejectedValue(new Error('API Error'));

      await expect(service.getCryptoBySymbol('BTC')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
