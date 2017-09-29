import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
    constructor(private blockChainService: BlockchainService) { }
  
    ngOnInit() {
       this.blockChainService.changeStateEvent().subscribe(
          (isLogged) => console.log('changed state:' + isLogged)        
       );
    }
  
  }