import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private linkedChainContract: LinkedChainContract,
    private ref: ChangeDetectorRef
  ) {  }

  ngOnInit() {
    this.address = this.sessionService.address;
    this.entity = this.sessionService.entity;
  }

  upateAccount(): void {
    this.isLoading = true;
    this.linkedChainContract.updateEntity(this.entity.name).subscribe(
      () => { 
        this.sessionService.entity.name = this.entity.name;
        alert('account updated');
      },
      ()=> {},
      () =>  { 
        this.isLoading = false;
        this.ref.detectChanges();
       }
    );
  }

}
