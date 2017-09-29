import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../_shared/services/security.service';
import { BlockchainService } from '../services/blockchain';
import { LinkedChainContract } from '../_contracts/linkedchain.contract';
import { Router } from '@angular/router';
import { Entity } from '../_shared/entities/entity';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  address: string = null;
  entity: Entity = null;
  isLoading: boolean = false;

  constructor(
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
        // check on blockchain fot this address
        this.linkedChainContract.registedEntities(this.address).subscribe((result:boolean) => { 
          if (result)
          {
            this.router.navigateByUrl('/dashboard');
          }
        });
    }
  }

  registerAccount(): void {
    this.isLoading = true;
    this.linkedChainContract.updateEntity(this.entity.name).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      ()=> {},
      () => this.isLoading = false
    );
  }

}
