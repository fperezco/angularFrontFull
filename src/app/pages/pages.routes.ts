import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { TestComponent } from './test/test.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component},
            { path: 'account-settings', component: AccountSettingsComponent},
            { path: 'test', component: TestComponent},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
     }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
