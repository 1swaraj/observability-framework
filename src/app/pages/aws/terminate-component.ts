import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { IAwsCred } from 'src/app/interfaces/aws_credentails';
import Swal from 'sweetalert2';

@Component({
    selector: 'terminate-ec2',
    templateUrl: './terminate-component.html'
})
export class TerminateEC2Component {
    @Input() selected_ip = "";
    @Output() terminateEC2: EventEmitter < IAwsCred > = new EventEmitter < IAwsCred > ();
    terminateInstance(): void {
        (async () => {
            if (!localStorage.getItem('awsAccessKey') || !localStorage.getItem('awsSecretKey')) {
                Swal.fire({
                    title: "Enter the Credentials on the Homepage",
                    text: "You have not entered your credentials."
                })
            } else {
                let allDetails :IAwsCred = {accesskey:localStorage.getItem('awsAccessKey'),secretkey: localStorage.getItem('awsSecretKey'),id: this.selected_ip}
                this.terminateEC2.emit(allDetails);
            }
        })()
    }
}