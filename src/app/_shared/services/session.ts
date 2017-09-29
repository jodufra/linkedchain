import { Injectable, ApplicationRef } from '@angular/core';
import { Entity } from '../entities/entity';
import { LinkedChainContract } from '../smartcontracts/linkedchain.contract';
import { BlockchainService } from './blockchain';

@Injectable()
export class SessionService {

  address: string = null;
  entity: Entity = null;

  constructor(
      private blockchainService: BlockchainService,
      private linkedChainContract: LinkedChainContract,
      private ref: ApplicationRef
    ) { }

  clear(): void {
      this.address = null;
      this.entity = null;
  }

  load(): void {
      if (this.address === null || this.address === undefined) {
        this.address = this.blockchainService.getAddress();
      }
      if (this.entity == null) {
          this.linkedChainContract.getEntity().subscribe((result: any) => {
              this.entity = new Entity();
              this.entity.name = result[0];
              this.ref.tick();
           });
      }
  }

}
