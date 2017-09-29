import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Entity } from '../_shared/entities/entity';
import { LinkedChainContract } from '../_shared/smartcontracts/linkedchain.contract';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  entity: Entity = null;
  
  constructor(
    private linkedChainContract: LinkedChainContract,
    private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.linkedChainContract.getEntity().subscribe((result: any) => { 
      if (result) {
        this.entity = new Entity();
        this.entity.name = result[0];
        this.ref.detectChanges();
      }
    } );
  }

}
