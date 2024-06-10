import { Controller, Get, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('top')
  getTopCryptos() {
    return this.cryptoService.getTopCryptos();
  }

  @Get(':symbol')
  getCryptoBySymbol(@Param('symbol') symbol: string) {
    return this.cryptoService.getCryptoBySymbol(symbol.toUpperCase());
  }
}

