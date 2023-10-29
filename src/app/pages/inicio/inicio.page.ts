import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
})
export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemParrafo!: ElementRef;
  componente_actual = 'qr';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private animationController: AnimationController,
    private api: ApiClientService) { }
    

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(esPrimerInicioSesion => {
      this.componente_actual = 'qr';
      this.bd.datosQR.next('');
    });
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  public ngAfterViewInit(): void {
    if (this.itemParrafo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemParrafo.nativeElement)
        .iterations(Infinity)
        .duration(1500)
        .direction('alternate')
        .fromTo('background', 'black', 'var(--background)');
      animation.play();
    }
  }
}
