import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.page.html',
  styleUrls: ['./crearcuenta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CrearcuentaPage implements OnInit {
  usuario = new Usuario();

  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  ngOnInit() {
  }

  validarCampo(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async crearUsuario(){
    if (!this.validarCampo('correo', this.usuario.correo)) return;
    if (!this.validarCampo('nombre', this.usuario.nombre)) return;
    if (!this.validarCampo('apellidos', this.usuario.apellido)) return;
    if (!this.validarCampo('pregunta secreta', this.usuario.preguntaSecreta)) return;
    if (!this.validarCampo('respuesta secreta', this.usuario.respuestaSecreta)) return;
    if (!this.validarCampo('contraseña', this.usuario.password)) return;
    var existeUsuario = await this.bd.leerUsuario(this.usuario.correo);
    if (existeUsuario?.correo == this.usuario.correo) {
      showToast('Correo ya existe en nuestra base de datos');
    }
    else{
      await this.bd.guardarUsuario(this.usuario);
      this.authService.guardarUsuarioAutenticado(this.usuario);
      showToast('Cuenta creada, ingrese con sus credenciales');
      this.router.navigate(['ingreso']);      
    }

  }

}
