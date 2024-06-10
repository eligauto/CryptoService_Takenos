import { Module } from '@nestjs/common';
import { CryptoService } from './services/crypto.service'; 
import { CryptoController } from './controllers/crypto.controller';
import { HttpModule } from '@nestjs/axios';
import { CoinMarketCapService } from './crypto-data-providers/coinmarketcap.service';
import { CriptoYaService } from './crypto-data-providers/criptoya.service';
import { HttpClientService } from './services/http-client.service'; 

@Module({
  imports: [HttpModule],
  providers: [
    CryptoService,
    CoinMarketCapService,
    CriptoYaService,
    { provide: 'IHttpClient', useClass: HttpClientService },
  ],
  controllers: [CryptoController],
})
export class CryptoModule {}
