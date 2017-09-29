import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../_shared/services/security.service';
import { BlockchainService } from '../services/blockchain';
import { LinkedChainContract } from '../_contracts/linkedchain.contract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  address: string = null;

  constructor(
    private securityService: SecurityService,
    private blochainService: BlockchainService,
    private linkedChainContract: LinkedChainContract,
    private router: Router
    )
    { }

  ngOnInit() {
    if (!this.securityService.isAuthenticated()) 
    {
        //this.blochainService.loginEventEmmitter().subscribe(() => this.checkOnProvider());
    } 
    else 
    {
      this.checkOnProvider();
    }
  }

  checkOnProvider(): void {
     this.address = this.securityService.getAddress();

     // check on blockchain fot this address
     this.linkedChainContract.registedEntities(this.address).subscribe((result:boolean) => { 
      if (result)
      {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  registerAccount(): void {
    this.linkedChainContract.updateEntity("Marco").subscribe(() => this.router.navigateByUrl('/dashboard'));
  }

}
