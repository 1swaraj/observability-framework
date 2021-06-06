import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAwsCred } from 'src/app/interfaces/aws_credentails';
import { IDoCred } from 'src/app/interfaces/do_credentials';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
})
export class DashboardComponent implements OnInit {

  public aws_creds: IAwsCred
  public digital_ocean_creds: IDoCred
  public isAwsSet: boolean = false;
  public isDOSet: boolean = false;

  awsForm = new FormGroup({
    accessKey: new FormControl(localStorage.getItem("awsAccessKey")),
    secretKey: new FormControl(localStorage.getItem("awsSecretKey")),
  });

  doForm = new FormGroup({
    doapi: new FormControl(localStorage.getItem("doAPI"))
  });

  upcloudForm = new FormGroup({
    upclouduser: new FormControl(localStorage.getItem("upcloudUser")),
    upcloudapi: new FormControl(localStorage.getItem("upcloudAPI"))
  });

  ngOnInit() {
    if (localStorage.getItem("awsAccessKey") != null && localStorage.getItem("awsSecretKey") != null) {
      this.aws_creds = { accesskey: localStorage.getItem("awsAccessKey"), secretkey: localStorage.getItem("awsSecretKey") }
      this.isAwsSet = true
    }
    if (localStorage.getItem("doAPI")!=null) {
      this.digital_ocean_creds = { api: localStorage.getItem("doAPI") }
      this.isDOSet = true
    }
  }

  onSubmitAWS() {
    localStorage.setItem("awsAccessKey", this.awsForm.value.accessKey);
    localStorage.setItem("awsSecretKey", this.awsForm.value.secretKey);
    Swal.fire({
      title: "AWS Credentials Set.",
      text: "You may now use the AWS tab.Make sure that your accessKey and secretKey have necessary permissions"
    })
  }

  onSubmitDO() {
    localStorage.setItem("doAPI", this.doForm.value.doapi);
    Swal.fire({
      title: "Digital Ocean Credentials Set.",
      text: "You may now use the Digital Ocean tab.Make sure that your apiKey has the necessary permissions"
    })
  }

  onSubmitUpcloud() {
    localStorage.setItem("upcloudAPI", this.upcloudForm.value.upcloudapi);
    localStorage.setItem("upcloudUser", this.upcloudForm.value.upclouduser);
    Swal.fire({
      title: "Upcloud Credentials Set.",
      text: "You may now use the Upcloud tab.Make sure that your apiKey has the necessary permissions"
    })
  }

}
