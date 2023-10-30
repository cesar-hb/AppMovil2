import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router, NavigationExtras } from '@angular/router';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {


  public correo: string='';

  constructor(private bd: DataBaseService, private router: Router) { 
  }

  ngOnInit() {
  }

  async chequearCorreo(){
    const usuario = await this.bd.leerUsuario(this.correo);
    if (usuario?.correo == this.correo) {
      const navigationExtras:  NavigationExtras = {
        state: {
          correo: usuario.correo
        }
      };
      this.router.navigate(['pregunta'], navigationExtras);
    }
    else{
      showAlertDUOC("Correo no encontrado en la base de datos");
    }
  }

  volverIngreso(){
    this.router.navigate(['ingreso']);
  }
}
