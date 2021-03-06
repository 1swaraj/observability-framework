import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDoCred } from 'src/app/interfaces/do_credentials';
import { IDroplet } from 'src/app/interfaces/droplet_details';
import { DoService } from 'src/app/services/do-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'do-table',
  templateUrl: './droplet-component.html',
  styleUrls: ['./droplet-component.scss'],
})
export class DOComponent implements OnInit {
  
  @Input() selected_ip = "";
  errorMessage = '';
  private _listFilter = '';
  filteredDroplet: IDroplet[] = [];
  droplet: IDroplet[] = [];
  docost: string = "0";
  dropletsub!: Subscription;
  docostsub!: Subscription;
  public droplet_details: IDroplet[] = [];

  constructor(private doservice: DoService,private router: Router) { }
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDroplet = this.performFilter(value);
  }

  performFilter(filterBy: string): IDroplet[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.droplet.filter((droplet: IDroplet) =>
      droplet.name.toLocaleLowerCase().startsWith(filterBy));
  }

  ngOnInit() {
    if (localStorage.getItem("doAPI") == null || localStorage.getItem("doAPI") == "") {
      Swal.fire({
        title: "Please enter the digital ocean credentials on the homepage",
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
      let creds: IDoCred={api:localStorage.getItem("doAPI")}
      this.dropletsub = this.doservice.getInstances(creds).subscribe({
        next: droplet => {
          this.droplet = droplet;
          this.filteredDroplet = this.droplet;
        },
        error: err  => this.errorMessage = err
      });
      this.docostsub = this.doservice.getCost(creds).subscribe({
        next: docost => {
          this.docost = docost.toString();
        },
        error: err  => this.errorMessage = err
      })
    }
  }

  ngOnDestroy(): void {
    if (this.dropletsub) {
      this.dropletsub.unsubscribe();
    }
  }

}
