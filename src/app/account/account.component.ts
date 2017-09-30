import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Entity } from '../_shared/entities/entity';
import { SessionService } from '../_shared/services/session';
import { LinkedChainContract } from '../_shared/smartcontracts/linkedchain.contract';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  address: string = null;
  entity: Entity = null;
  entityName: string = null;
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private linkedChainContract: LinkedChainContract,
    private ref: ChangeDetectorRef
  ) {  }

  ngOnInit() {
    this.address = this.sessionService.address;
    this.entity = this.sessionService.entity;
    this.sessionService.sessionUpdated.subscribe((entity: Entity) => { 
      this.entity = entity;
      this.ref.detectChanges();
     });
  }

  upateAccount(): void {
    this.isLoading = true;
    this.linkedChainContract.updateEntity(this.entityName).subscribe(
      (data) => {
        if (data !== null || data !== undefined) {
          alert('Your account was updated');
          this.entity.name = this.entityName;
          this.sessionService.emitChanges(this.entity);
        }
      },
      ()=> {},
      () =>  { 
        this.isLoading = false;
        this.ref.detectChanges();
       }
    );
  }

}
