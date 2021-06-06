import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAwsCred } from 'src/app/interfaces/aws_credentails';
import Swal from 'sweetalert2';
import { IAwsec2 } from '../../interfaces/aws_ec2_details';
import { AwsService } from '../../services/aws-service';


@Component({
  selector: 'ec2-table',
  templateUrl: './ec2-component.html',
  styleUrls: ['./ec2-component.scss']
})
export class EC2Component implements OnInit {
  
  @Input() selected_ip = "";
  errorMessage = '';
  private _listFilter = '';
  filteredEC2: IAwsec2[] = [];
  ec2: IAwsec2[] = [];
  awscost: string = "0";
  ec2sub!: Subscription;
  costsub!: Subscription;
  public ec2_details: IAwsec2[] = [];

  constructor(private awsservice: AwsService) { }
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEC2 = this.performFilter(value);
  }

  performFilter(filterBy: string): IAwsec2[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ec2.filter((ec2: IAwsec2) =>
      ec2.identifier.toLocaleLowerCase().startsWith(filterBy));
  }

  ngOnInit() {
    if (localStorage.getItem("awsAccessKey") == null || localStorage.getItem("awsSecretKey") == null) {
      Swal.fire("Please enter the aws credentials on the homepage")
    } else {
      let creds: IAwsCred={accesskey:localStorage.getItem("awsAccessKey"),secretkey:localStorage.getItem("awsSecretKey")}
      this.ec2sub = this.awsservice.getInstances(creds).subscribe({
        next: ec2 => {
          this.ec2 = ec2;
          this.filteredEC2 = this.ec2;
        },
        error: err  => this.errorMessage = err
      });
      this.costsub = this.awsservice.getCost(creds).subscribe({
        next: awscost => {
          this.awscost = awscost.toString();
        },
        error: err  => this.errorMessage = err
      })
    }
  }

  ngOnDestroy(): void {
    this.ec2sub.unsubscribe();
  }

  onStopEC2(details: IAwsCred): void {
    this.ec2sub = this.awsservice.stopInstance(details).subscribe(data => {
      Swal.fire(data);
    })
  }

  onTerminateEC2(details: IAwsCred): void {
    this.ec2sub = this.awsservice.terminateInstance(details).subscribe(data => {
      Swal.fire(data);
    })
  }

  onResumeEC2(details: IAwsCred): void {
    this.ec2sub = this.awsservice.resumeInstance(details).subscribe(data => {
      Swal.fire(data);
    })
  }
}
