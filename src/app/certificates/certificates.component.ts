import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Entity } from '../_shared/entities/entity';
import { Certification } from '../_shared/entities/certification';
import { LinkedChainContract } from '../_shared/smartcontracts/linkedchain.contract';
import { SessionService } from '../_shared/services/session';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  address: string = null;
  entity: Entity = null;
  certifications: Certification[] = [];

  constructor(
    private sessionService: SessionService,
    private linkedChainContract: LinkedChainContract
  ) { }

  ngOnInit() {
    this.address = this.sessionService.address;
    this.entity = this.sessionService.entity;
    this.loadCertifications();
    this.sessionService.sessionUpdated.subscribe((entity: Entity) => { 
      this.entity = entity; 
      this.loadCertifications();
    } );
  }

  loadCertifications(): void {
    if (this.address !== null && this.entity !== null && this.entity.certificationsCounter) 
    { 
      for (let i = 0; i < this.entity.certificationsCounter; i++) {
        this.linkedChainContract.certificationsOwned(this.address,i).subscribe(
          (result: any) => {
            this.certifications = [];
             if (result && result.length > 0) {
                let cert = new Certification();
                cert.to = result[2];
                cert.from = result[1];
                cert.description = result[0];
                this.certifications.push(cert);
             }
           }
        );
      }
    }
  }

}
