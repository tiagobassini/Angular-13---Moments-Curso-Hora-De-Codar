import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';


@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent {

  moment!: Moment;
  btnText: string = "Editar"

  constructor(
    private momentService: MomentService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    const id = Number(this.activedRoute.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(result => this.moment = result.data);

  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData: FormData = new FormData();

    formData.append("title", momentData.title);
    formData.append("description", momentData.description);

    if (momentData.image) {
      formData.append("image", momentData.image);
    }
    await this.momentService.updateService(id!, formData).subscribe();

    this.messagesService.add(`Momentos ${id} atualizado com sucesso!`);
    this.router.navigate(["/"])
  }

}
