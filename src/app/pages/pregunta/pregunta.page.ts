import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public respuesta: string='';
  public correo: string='';
  public pregunta: string='';


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
// Generar a futuro un guard para eliminar vulnerabilidad de seguridad.
  async chequearRespuesta(){
    const usuario = await this.bd.leerUsuario(this.correo);
    if (usuario?.respuestaSecreta == this.respuesta) {
      const navigationExtras:  NavigationExtras = {
        state: {
          correo: usuario.correo
        }
      };
      this.router.navigate(['correcto'], navigationExtras);
    }
    else{
      this.router.navigate(['incorrecto']);
    }
  }

  async mostrarPregunta(){
    const pregunta = await this.bd.leerPregunta(this.correo);
    this.pregunta = pregunta as string;
  }

}
