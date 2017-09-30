import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../_shared/services/session';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ['./layout.component.css']
})
export class LayoutComponent {
 
  constructor(
    private sessionService: SessionService
  ) {
    this.sessionService.load();
  }

}
