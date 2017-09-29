import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../services/session';
import { Entity } from '../entities/entity';

@Component({
  selector: 'app-breadcrumb',
  template: `<div class="sub-crumb">
  <div class="container">
      <p *ngIf="entity">Hello {{entity.name}}</p>
  </div>
</div>`,
styles: [`
.breadcrumb {
  padding: 10px 0;
  margin-bottom: 0;
}

.breadcrumb .logo {
  max-width: 150px;
}

.breadcrumb ul {
  margin: 10px 0;
}

.breadcrumb ul>li>a {
  color: white;
  transition: 0.5s;
}

.breadcrumb ul>li>a:hover {
  transition: 0.3s;
  color: #05A2C5;
}

.breadcrumb ul>li.is-active {
  color: white;
  font-weight: 700;
}

.breadcrumb ul>li+li::before {
  color: white;
  margin-right: 10px;
}

.sub-crumb{background-color:  rgba(5, 165, 197, 0.05); padding:10px 0; width:100%; }
`]
})
export class BreadcrumbComponent implements OnInit {

entity: Entity = null;

constructor(
private sessionService: SessionService
) {

}

ngOnInit(): void {
this.entity = this.sessionService.entity;
}

}
