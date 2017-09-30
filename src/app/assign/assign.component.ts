import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../_shared/services/session';
import { LinkedChainContract } from '../_shared/smartcontracts/linkedchain.contract';
import { Entity } from '../_shared/entities/entity';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  entity: Entity = null;
  personAddress: string = null;
  certificationName: string = null;
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private linkedChainContract: LinkedChainContract,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.entity = this.sessionService.entity;
    this.sessionService.sessionUpdated.subscribe((entity: Entity) => { 
      this.entity = entity;
      this.ref.detectChanges();
     });
  }

  registerCertification(): void {
    this.isLoading = true;
    this.linkedChainContract.addCertification(this.personAddress,this.certificationName).subscribe(
      () => { 
        alert('Certification given');
      },
      ()=> {},
      () => { 
        this.isLoading = false; 
        this.personAddress = null;
        this.certificationName = null;
        this.ref.detectChanges();
      }
    );
  }
}
