import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../_shared/services/session';
import { Entity } from '../_shared/entities/entity';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

   entity: Entity = null;

  constructor(
    private sessionService: SessionService,
    private ref: ChangeDetectorRef
  ) {
    this.sessionService.load();
  }

  ngOnInit(): void {
    this.entity = this.sessionService.entity;
    this.sessionService.sessionUpdated.subscribe((entity: Entity) => { 
      this.entity = entity; 
      this.ref.detectChanges();
    } );
  }
}
