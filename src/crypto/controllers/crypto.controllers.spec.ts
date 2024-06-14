import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from '../services/crypto.service';
import { BadRequestException } from '@nestjs/common';

describe('CryptoController', () => {
  let cryptoController: CryptoController;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: CryptoService,
          useValue: {
            getTopCryptos: jest.fn().mockResolvedValue([{ symbol: 'BTC', name: 'Bitcoin' }]),
            getCryptoBySymbol: jest.fn(),
          },
        },
      ],
    }).compile();

    cryptoController = module.get<CryptoController>(CryptoController);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('getTopCryptos', () => {
    it('should return an array of top cryptocurrencies', async () => {
      expect(await cryptoController.getTopCryptos()).toEqual([{ symbol: 'BTC', name: 'Bitcoin' }]);
    });
  });

  describe('getCryptoBySymbol', () => {
    it('should return a cryptocurrency by symbol', async () => {
      const crypto = { symbol: 'BTC', name: 'Bitcoin' };
      jest.spyOn(cryptoService, 'getCryptoBySymbol').mockResolvedValueOnce(crypto);

      expect(await cryptoController.getCryptoBySymbol('BTC')).toEqual(crypto);
    });

    it('should throw a BadRequestException if the cryptocurrency is not found', async () => {
      jest.spyOn(cryptoService, 'getCryptoBySymbol').mockResolvedValueOnce(null);

      await expect(cryptoController.getCryptoBySymbol('UNKNOWN')).rejects.toThrow(BadRequestException);
    });
  });
});
