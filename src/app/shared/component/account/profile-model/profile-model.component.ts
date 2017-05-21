import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../../model/account/profile';

@Component({
    selector: 'app-profile-model',
    templateUrl: './profile-model.component.html',
    styleUrls: ['./profile-model.component.scss']
})
export class ProfileModelComponent {
    @Input() editable: boolean;

    @Input() model: Profile = new Profile();
    @Output() modelChange: EventEmitter<Profile> = new EventEmitter<Profile>();
}