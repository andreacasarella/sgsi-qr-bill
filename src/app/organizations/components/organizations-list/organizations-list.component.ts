import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {OrganizationsService} from "../../../services";

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsListComponent {

  public organizationsService: OrganizationsService = inject(OrganizationsService);


}
