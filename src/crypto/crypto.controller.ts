import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('top')
  getTopCryptos() {
    return this.cryptoService.getTopCryptos();
  }

  @Get(':symbol')
  async getCryptoBySymbol(
    @Param('symbol')
    symbol: string,
  ) {
    const upperSymbol = symbol.toUpperCase();
    const crypto = await this.cryptoService.getCryptoBySymbol(upperSymbol);
    
    if (!crypto) {
      throw new BadRequestException(`Cryptocurrency with symbol ${upperSymbol} not found`);
    }
    
    return crypto;
  }
}
