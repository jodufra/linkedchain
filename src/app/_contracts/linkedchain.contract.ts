import { IContract } from './abstract/icontract';
import { BlockchainService } from '../services/blockchain';
import { Observable } from 'rxjs/Observable';

export class LinkedChainContract implements IContract {
  IBArray = [{ "constant": false, "inputs": [{ "name": "_address", "type": "address" }, { "name": "_name", "type": "string" }], "name": "createEntity", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "address" }], "name": "getEntity", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "bool" }, { "name": "", "type": "bool" }], "payable": false, "type": "function" }];
  Address = "INSERT CONTRACT ADDRESS HERE";

  constructor(private blockchainService: BlockchainService) {

  }

	/**
	 * createEntity function
	 * @param {number} _address
	 * @param {string} _name
	 */
  createEntity(_address: number, _name: string) {
    return this.blockchainService.executeMethod(this, 'createEntity', { _address, _name });
  }

	/**
	 * getEntity function
	 * @param {number} _address
	 * @returns {Observable<{:string,:boolean,:boolean}>}
	 */
  getEntity(_address: number): Observable<{ a: string, b: boolean, c: boolean }> {
    return this.blockchainService.executeMethod(this, 'getEntity', _address);
  }

}
