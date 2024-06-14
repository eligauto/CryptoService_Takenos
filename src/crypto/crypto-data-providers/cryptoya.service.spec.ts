import { Test, TestingModule } from '@nestjs/testing';
import { CriptoYaService } from './criptoya.service';
import { IHttpClient } from '../interfaces/http-client.interface';
import { AxiosResponse } from 'axios';

describe('CriptoYaService', () => {
  let service: CriptoYaService;
  let httpClient: IHttpClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriptoYaService,
        {
          provide: 'IHttpClient',
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CriptoYaService>(CriptoYaService);
    httpClient = module.get<IHttpClient>('IHttpClient');
  });

  it('should return the USDT price in ARS', async () => {
    const mockResponse: AxiosResponse = {
      data: { totalBid: 500 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    jest.spyOn(httpClient, 'get').mockResolvedValue(mockResponse);

    const result = await service.getUsdtPriceInARS();
    expect(result).toEqual(500);
    expect(httpClient.get).toHaveBeenCalledWith(process.env.CRIPTOYA_API_URL);
  });
});
