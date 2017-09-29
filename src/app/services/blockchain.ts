import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IContract } from '../_contracts/abstract/icontract';

// https://github.com/ethereum/web3.js/
declare var Web3, web3: any;

@Injectable()
export class BlockchainService {

  constructor() { }

  isConnected(): boolean {
    return web3.isConnected();
  }

  getAddress(): string {
    return web3.eth.defaultAccount;
  }

  getBalance(address: string): Observable<number> {
    return Observable.create(observer => {
      web3.eth.getBalance(address, (error, result) => {
        observer.next(web3.fromWei(result.toNumber(), 'ether'));
        observer.complete();
      });
    });
  }

  executeMethod(contract: IContract, method: string, params: any): Observable<any> {
    return Observable.create(observer => {
      const connector = web3.eth.contract(contract.IBArray).at(contract.Address);
      if (params) {
        connector[method](params, (error, result) => {
          observer.next(result);
          observer.complete();
        });
      } else {
        connector[method]((error, result) => {
          observer.next(result);
          observer.complete();
        });
      }
    });
  }

  watch(contract: IContract, event: string): Observable<any> {
    return Observable.create(observer => {
      const connector = web3.eth.contract(contract.IBArray).at(contract.Address);
      connector[event]().watch((error, result) => {
        if (error) { observer.error(); } else { observer.next(result.args); }
      });
    });
  }

  loginEventEmmitter(): Observable<void> {
    return Observable.create(observer => {
      web3.eth.getAccounts( (error, result) => {
        if (error !== null || result.length === 0)
          observer.error();
        else 
        {
          observer.next();
          observer.complete();
        }
      });
    });
  }

}
