import { Component, OnInit } from '@angular/core';
import { Entity } from '../_shared/entities/entity';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  entity: Entity = null;

  constructor() { }

  ngOnInit() {
  }

}
