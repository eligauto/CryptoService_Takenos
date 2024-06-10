export interface ICryptoService {
  getTopCryptos(): Promise<any>;
  getCryptoBySymbol(symbol: string): Promise<any>;
}

export interface CriptoYaResponse {
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  time: number;
}
