import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IContract } from '../smartcontracts/abstract/icontract';

// https://github.com/ethereum/web3.js/
declare var Web3, web3: any;

@Injectable()
export class BlockchainService {

  initialize(): void {
    try {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://moon.pixels.camp:8545"));
      }
    } catch(ex) {

    }
  }

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

  executeMethod2(contract: IContract, method: string, param1: any, param2: any): Observable<any> {
    return Observable.create(observer => {
      const connector = web3.eth.contract(contract.IBArray).at(contract.Address);
      connector[method](param1, param2, (error, result) => {
        observer.next(result);
        observer.complete();
      });
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
}
