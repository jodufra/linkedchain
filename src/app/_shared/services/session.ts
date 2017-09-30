import { Injectable, ApplicationRef, EventEmitter } from '@angular/core';
import { Entity } from '../entities/entity';
import { LinkedChainContract } from '../smartcontracts/linkedchain.contract';
import { BlockchainService } from './blockchain';

@Injectable()
export class SessionService {

  address: string = null;
  entity: Entity = null;
  sessionUpdated: EventEmitter<Entity> = new EventEmitter<Entity>();

  constructor(
      private blockchainService: BlockchainService,
      private linkedChainContract: LinkedChainContract
    ) { }

  clear(): void {
      this.address = null;
      this.entity = null;
      this.emitChanges(null);
  }

  load(): void {
      if (this.address === null || this.address === undefined) {
        this.address = this.blockchainService.getAddress();
      }
      if (this.entity == null) {
          this.linkedChainContract.getEntity().subscribe((result: any) => {
              if (result && result.length > 0) {
                this.entity = new Entity();
                this.entity.name = result[0];
                this.entity.isCompany = result[1];
                this.entity.certificationsCounter = result[2].s;
              } else {
                  this.entity = null;
              }
              this.emitChanges(this.entity);
           });
      }
  }

  emitChanges(entity: Entity) : void {
      this.sessionUpdated.emit(entity);
  }

}
