import { IContract } from './abstract/icontract';
import { BlockchainService } from '../services/blockchain';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class LinkedChainContract implements IContract {
    
    IBArray = [{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"updateEntity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"certificationsGiven","outputs":[{"name":"description","type":"string"},{"name":"from","type":"address"},{"name":"to","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"certificationsOwned","outputs":[{"name":"description","type":"string"},{"name":"from","type":"address"},{"name":"to","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_entityAddress","type":"address"},{"name":"_isCompany","type":"bool"}],"name":"setEntityType","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isEntityRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_destinatary","type":"address"},{"name":"_certification","type":"string"}],"name":"addCertification","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getEntity","outputs":[{"name":"name","type":"string"},{"name":"isCompany","type":"bool"},{"name":"certificationsOwnedCounter","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_isCompany","type":"bool"}],"name":"EntityUpdated","type":"event"}];
    Address = "0xe11d5b298397133825529fb408d6723390cb8add";
    
    /**
     * LinkedChainContract constructor
     * @param {BlockchainService} blockchainService
     */
    constructor (private blockchainService: BlockchainService) {
    }
    
    /**
     * updateEntity function
     * @param {string} _name
     */
    updateEntity (_name: string) {
        return this.blockchainService.executeMethod(this, 'updateEntity', _name);
    }
    
    /**
     * certificationsGiven function
     * @param {string} 
     * @param {number} 
     * @returns {Observable<{ description : string, from : string, to : string }>}
     */
    certificationsGiven (address_0: string, uint256_1: number) : Observable<{ description : string, from : string, to : string }> {
        return this.blockchainService.executeMethod(this, 'certificationsGiven', { address_0, uint256_1 });
    }
    
    /**
     * certificationsOwned function
     * @param {string} 
     * @param {number} 
     * @returns {Observable<{ description : string, from : string, to : string }>}
     */
    certificationsOwned (address_0: string, uint256_1: number) : Observable<{ description : string, from : string, to : string }> {
        return this.blockchainService.executeMethod(this, 'certificationsOwned', { address_0, uint256_1 });
    }
    
    /**
     * setEntityType function
     * @param {string} _entityAddress
     * @param {boolean} _isCompany
     */
    setEntityType (_entityAddress: string, _isCompany: boolean) {
        return this.blockchainService.executeMethod(this, 'setEntityType', { _entityAddress, _isCompany });
    }
    
    /**
     * isEntityRegistered function
     * @param {string} 
     * @returns {Observable< boolean >}
     */
    isEntityRegistered (address_0: string) : Observable< boolean > {
        return this.blockchainService.executeMethod(this, 'isEntityRegistered', address_0);
    }
    
    /**
     * addCertification function
     * @param {string} _destinatary
     * @param {string} _certification
     */
    addCertification (_destinatary: string, _certification: string) {
        return this.blockchainService.executeMethod2(this, 'addCertification', _destinatary, _certification);
    }
    
    /**
     * getEntity function
     * @returns {Observable<{ name : string, isCompany : boolean, certificationsOwnedCounter : number }>}
     */
    getEntity () : Observable<{ name : string, isCompany : boolean, certificationsOwnedCounter : number }> {
        return this.blockchainService.executeMethod(this, 'getEntity', null);
    }
    
    /**
     * onEntityUpdated event
     * @param {string} _address
     * @param {string} _name
     * @param {boolean} _isCompany
     */
    onEntityUpdated (_address: string, _name: string, _isCompany: boolean) {
        return this.blockchainService.watch(this, 'EntityUpdated');
    }
    
}