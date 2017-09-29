import { Component, OnInit } from '@angular/core';
import { Entity } from '../_shared/entities/entity';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  entity: Entity = null;

  constructor(
  ) { }

  ngOnInit() {
  }

}
