import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUpcloudCred } from 'src/app/interfaces/upcloud_credentials';
import { IUpcloud } from 'src/app/interfaces/upcloud_details';
import { UpcloudService } from 'src/app/services/upcloud-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'upcloud-table',
  templateUrl: './upcloud-component.html',
  styleUrls: ['./upcloud-component.scss'],
})
export class UpcloudComponent implements OnInit {
  
  @Input() selected_ip = "";
  errorMessage = '';
  private _listFilter = '';
  filteredVM: IUpcloud[] = [];
  vms: IUpcloud[] = [];
  docost: string = "0";
  vmsub!: Subscription;
  upcostsub!: Subscription;
  public vm_details: IUpcloud[] = [];

  constructor(private upcloudservice: UpcloudService,private router:Router) { }
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredVM = this.performFilter(value);
  }

  performFilter(filterBy: string): IUpcloud[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.vms.filter((droplet: IUpcloud) =>
      droplet.title.toLocaleLowerCase().startsWith(filterBy));
  }

  ngOnInit() {
    if (localStorage.getItem("upcloudAPI") == null || localStorage.getItem("upcloudUser") == null) {
      Swal.fire({
        title: "Please enter the upcloud credentials on the homepage",
        showDenyButton: true,
        confirmButtonText: `Take me there`,
        denyButtonText: 'Reload'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/'])
        } else if (result.isDenied) {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
        }
      })
    } else {
      let creds: IUpcloudCred={user:localStorage.getItem("upcloudUser"),api:localStorage.getItem("upcloudAPI")}
      this.vmsub = this.upcloudservice.getInstances(creds).subscribe({
        next: vms => {
          this.vms = vms;
          this.filteredVM = this.vms;
        },
        error: err  => this.errorMessage = err
      });
      this.upcostsub = this.upcloudservice.getCost(creds).subscribe({
        next: docost => {
          this.docost = docost.toString();
        },
        error: err  => this.errorMessage = err
      })
    }
  }

  ngOnDestroy(): void {
    if (this.vmsub) {
      this.vmsub.unsubscribe();
    }
  }

}
