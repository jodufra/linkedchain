import { IContract } from './abstract/icontract';
import { BlockchainService } from '../services/blockchain';
import { Observable } from 'rxjs/Observable';

export class LinkedChainContract implements IContract {

  IBArray = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "certifications", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "updateEntity", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_certification", "type": "string" }], "name": "addCertification", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "registedEntities", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getEntity", "outputs": [{ "name": "name", "type": "string" }, { "name": "isCompany", "type": "bool" }, { "name": "certificationsCounter", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }];
  Address = "INSERT CONTRACT ADDRESS HERE";

	/**
	 * Teste constructor
	 * @param {BlockchainService} blockchainService
	 */
  constructor(private blockchainService: BlockchainService) {
  }

	/**
	 * certifications function
	 * @param {number}
	 * @param {number}
	 * @returns {Observable< string  >}
	 */
  certifications(address_1: number, int_2: number): Observable<string> {
    return this.blockchainService.executeMethod(this, 'certifications', { address_1, int_2 });
  }

	/**
	 * updateEntity function
	 * @param {string} _name
	 */
  updateEntity(_name: string) {
    return this.blockchainService.executeMethod(this, 'updateEntity', _name);
  }

	/**
	 * addCertification function
	 * @param {string} _certification
	 */
  addCertification(_certification: string) {
    return this.blockchainService.executeMethod(this, 'addCertification', _certification);
  }

	/**
	 * registedEntities function
	 * @param {number}
	 * @returns {Observable< boolean  >}
	 */
  registedEntities(address_1: number): Observable<boolean> {
    return this.blockchainService.executeMethod(this, 'registedEntities', address_1);
  }

	/**
	 * getEntity function
	 * @returns {Observable<{ name : string, isCompany : boolean, certificationsCounter : number }>}
	 */
  getEntity(): Observable<{ name: string, isCompany: boolean, certificationsCounter: number }> {
    return this.blockchainService.executeMethod(this, 'getEntity', null);
  }

}
