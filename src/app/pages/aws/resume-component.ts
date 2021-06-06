import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { IAwsCred } from 'src/app/interfaces/aws_credentails';
import Swal from 'sweetalert2';

@Component({
    selector: 'resume-ec2',
    templateUrl: './resume-component.html'
})
export class ResumeEC2Component {
    @Input() selected_ip = "";
    @Input() region = "";
    @Output() resumeEC2: EventEmitter < IAwsCred > = new EventEmitter < IAwsCred > ();
    resumeInstance(): void {
        (async () => {

            if (!localStorage.getItem('awsAccessKey') || !localStorage.getItem('awsSecretKey')) {
                Swal.fire({
                    title: "Enter the Credentials on the Homepage",
                    text: "You have not entered your credentials."
                })
            } else {
                let allDetails :IAwsCred = {accesskey:localStorage.getItem('awsAccessKey'),secretkey: localStorage.getItem('awsSecretKey'),id: this.selected_ip,region:this.region}
                this.resumeEC2.emit(allDetails);
            }

        })()

    }
}