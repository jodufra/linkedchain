import { Injectable } from '@angular/core';

// https://github.com/ethereum/web3.js/
declare var Web3, web3: any;

@Injectable()
export class SecurityService {

  constructor() { }

  isConnected(): boolean {
    try {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else if (typeof Web3 !== 'undefined') {
        web3 = new Web3(new Web3.providers.HttpProvider('http://moon.pixels.camp:8545'));
      }
      return web3.isConnected();
    } catch (error) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.isConnected() && this.isAccountActive();
  }

  isAccountActive(): boolean {
    let ad = this.getAddress();
    return ad && ad !== null && ad !== undefined;
  }

  getAddress(): string {
    return web3.eth.defaultAccount;
  }
}
