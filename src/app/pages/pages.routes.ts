import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { TestComponent } from './test/test.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaRenovacionGuard } from '../services/guards/verifica-renovacion.guard';



const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}, canActivate: [VerificaRenovacionGuard] },
    { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'} },
    { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
    { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promises'}},
    { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables (RxJs)'}},
    { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
    { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil'}},
    { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}, canActivate: [AdminGuard] },
    { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
    { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
    { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos'}},
    { path: 'test', component: TestComponent, data: {titulo: 'Test Zone'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


// Antes de las modificaciones del lazy load
/*const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard], //para todas estas rutas
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'} },
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promises'}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables (RxJs)'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil'}},
            { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}, canActivate: [AdminGuard] },
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos'}},
            { path: 'test', component: TestComponent, data: {titulo: 'Test Zone'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
     }
];*/

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
