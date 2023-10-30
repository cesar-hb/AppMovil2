import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  
  public correo: string="";
  public password: string="";

  constructor(private bd: DataBaseService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      const extras = this.router.getCurrentNavigation()?.extras;
      if (extras && extras.state) {
        this.correo = extras.state['correo'];
      } else {
        this.router.navigate(['/ingreso']);
      }
    });

   }

  ngOnInit() {
  }

  volverIngreso(){
    this.router.navigate(['ingreso']);
  }

  async mostrarRespuesta(){
    const password = await this.bd.leerPassword(this.correo);
    this.password = password as string;
  }

}
