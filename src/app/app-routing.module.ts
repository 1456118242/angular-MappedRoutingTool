import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {Router} from '@angular/router';
import {MappedRoutingComponent} from './mappedRouting/mapped-routing.component';
import {MappedRoutingForPlanComponent} from './mappedRoutingForPlan/mapped-routing-for-plan.component';
import {RoutePlannerComponent} from './routePlanner/route-planner.component'


const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/mappedRouting'},
    {path: 'mappedRouting', component: MappedRoutingComponent},
    {path: 'mappedRoutingForPlan',  component: MappedRoutingForPlanComponent},
    {path: 'routePlanner',  component: RoutePlannerComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, {
                enableTracing: false,
                useHash: true
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
