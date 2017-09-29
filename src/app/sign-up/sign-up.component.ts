import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../_shared/services/security.service';
import { Router } from '@angular/router';
import { Entity } from '../_shared/entities/entity';
import { BlockchainService } from '../_shared/services/blockchain';
import { LinkedChainContract } from '../_shared/smartcontracts/linkedchain.contract';
import { SessionService } from '../_shared/services/session';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  address: string = null;
  entity: Entity = new Entity();
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private securityService: SecurityService,
    private blochainService: BlockchainService,
    private linkedChainContract: LinkedChainContract,
    private router: Router
    )
    { }

  ngOnInit() {
      this.checkOnProvider();
  }

  checkOnProvider(): void {
     if (this.securityService.isAccountActive()) 
     {
        this.address = this.securityService.getAddress();
        this.sessionService.address = this.address;
        // check on blockchain fot this address
        this.linkedChainContract.isEntityRegistered(this.address).subscribe((result:boolean) => { 
          if (result)
          {
            this.router.navigateByUrl('/dashboard');
          }
        });
    }
  }

  registerAccount(): void {
    this.isLoading = true;
    console.log(this.entity.name);
    this.linkedChainContract.updateEntity(this.entity.name).subscribe(
      () => { 
        this.router.navigateByUrl('/dashboard');
      },
      ()=> {},
      () => this.isLoading = false
    );
  }

}
