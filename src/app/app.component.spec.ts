import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApplicationModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ForoComponent } from './components/foro/foro.component';
import { MiclaseComponent } from './components/miclase/miclase.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';
import { QrComponent } from './components/qr/qr.component';
import { Usuario } from './model/usuario';


describe('Probar arranque de la app',() => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ForoComponent,
        MiclaseComponent,
        MisdatosComponent,
        QrComponent,  
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  //it('Se debería crear la aplicación.', () =>{
  //  const fixture = TestBed.createComponent(AppComponent);
  //  const app = fixture.componentInstance;
  //  expect(app).toBeTruthy();
  //});
  it('Se debería crear la la componente foro', () =>{
    const fixture = TestBed.createComponent(ForoComponent);
    const foroComponent = fixture.debugElement.componentInstance;
    expect(foroComponent).toBeTruthy();
  });
  it('Se debería crear la la componente miclase', () =>{
    const fixture = TestBed.createComponent(MiclaseComponent);
    const miclaseComponent = fixture.debugElement.componentInstance;
    expect(miclaseComponent).toBeTruthy();
  });
  it('Se debería crear la la componente misdatos', () =>{
    const fixture = TestBed.createComponent(MisdatosComponent);
    const misdatosComponent = fixture.debugElement.componentInstance;
    expect(misdatosComponent).toBeTruthy();
  });
  it('Se debería crear la la componente qr', () =>{
    const fixture = TestBed.createComponent(QrComponent);
    const qrComponent = fixture.debugElement.componentInstance;
    expect(qrComponent).toBeTruthy();
  });
});

describe('Probar clase usuario', () => {
  const usuario= Usuario.getUsuario('atorres@duocuc.cl', 'abc123', 'Ana','Torres Leiva', '¿Cuál es tu animal favorito?', 'gato');
  describe('Probar password', () => {
    
    it ('Probar que la contraseña no sea vacía', () => {

      usuario.password = '';
      expect(usuario.validarPassword).toContain('debe tener un valor');
    });
    
  });
  it ('Probar que correo no esté vacío', () => {
    usuario.correo = '';
    expect(usuario.validarCorreo).toContain('debe tener un valor');
  });

  it ('Probar que correo sea @duoc.cl', () => {
    usuario.correo = 'atorres';
    expect(usuario.validarCorreo).toContain('debe tener un valor');
  });
});