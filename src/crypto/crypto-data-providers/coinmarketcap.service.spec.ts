import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapService } from './coinmarketcap.service';
import { IHttpClient } from '../interfaces/http-client.interface';
import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';

describe('CoinMarketCapService', () => {
  let service: CoinMarketCapService;
  let httpClient: IHttpClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoinMarketCapService,
        {
          provide: 'IHttpClient',
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CoinMarketCapService>(CoinMarketCapService);
    httpClient = module.get<IHttpClient>('IHttpClient');
  });

  describe('getCryptos', () => {
    it('should return a list of cryptocurrencies', async () => {
      const response: AxiosResponse = {
        data: { data: [{ symbol: 'BTC', name: 'Bitcoin' }] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };
      jest.spyOn(httpClient, 'get').mockResolvedValueOnce(response);

      expect(await service.getCryptos()).toEqual(response);
    });

    it('should handle errors correctly', async () => {
      jest.spyOn(httpClient, 'get').mockRejectedValueOnce({
        response: {
          data: { status: { error_code: 400, error_message: 'Bad Request' } },
        },
      });

      await expect(service.getCryptos()).rejects.toThrow(BadRequestException);
    });
  });

  describe('getCryptoBySymbol', () => {
    it('should return a cryptocurrency by symbol', async () => {
      const response: AxiosResponse = {
        data: { data: { BTC: { symbol: 'BTC', name: 'Bitcoin' } } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };
      jest.spyOn(httpClient, 'get').mockResolvedValueOnce(response);

      expect(await service.getCryptoBySymbol('BTC')).toEqual(
        response.data.data,
      );
    });

    it('should handle errors correctly', async () => {
      jest.spyOn(httpClient, 'get').mockRejectedValueOnce({
        response: {
          data: {
            status: { error_code: 1001, error_message: 'API key invalid' },
          },
        },
      });

      await expect(service.getCryptoBySymbol('BTC')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('handleError', () => {
    it('should throw BadRequestException for error code 400', () => {
      const error = {
        response: {
          data: { status: { error_code: 400, error_message: 'Bad Request' } },
        },
      };
      expect(() => service['handleError'](error)).toThrow(BadRequestException);
    });

    it('should throw UnauthorizedException for error code 1001', () => {
      const error = {
        response: {
          data: {
            status: { error_code: 1001, error_message: 'API key invalid' },
          },
        },
      };
      expect(() => service['handleError'](error)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for error code 1002', () => {
      const error = {
        response: {
          data: {
            status: { error_code: 1002, error_message: 'API key missing' },
          },
        },
      };
      expect(() => service['handleError'](error)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw ForbiddenException for error code 1006', () => {
      const error = {
        response: {
          data: { status: { error_code: 1006, error_message: 'Forbidden' } },
        },
      };
      expect(() => service['handleError'](error)).toThrow(ForbiddenException);
    });

    it('should throw HttpException for error code 1008', () => {
      const error = {
        response: {
          data: {
            status: { error_code: 1008, error_message: 'Too many requests' },
          },
        },
      };
      expect(() => service['handleError'](error)).toThrow(HttpException);
    });

    it('should throw InternalServerErrorException for error code 500', () => {
      const error = {
        response: {
          data: {
            status: { error_code: 500, error_message: 'Internal server error' },
          },
        },
      };
      expect(() => service['handleError'](error)).toThrow(
        InternalServerErrorException,
      );
    });

    it("should throw HttpException You've exceeded your API Key's HTTP request rate limit.", () => {
      const error = {
        response: {
          data: {
            status: {
              error_code: 1008,
              error_message:
                "You've exceeded your API Key's HTTP request rate limit.",
            },
          },
        },
      };
      expect(() => service['handleError'](error)).toThrow(HttpException);
    });
  });
});
