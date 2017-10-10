import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { ListComponent } from './list/list.component';
import { AddEditViewComponent } from './add-edit-view/add-edit-view.component';
import { DeleteComponent } from './delete/delete.component';
import { RolesDataResolverService } from './_services/roles-data-resolver.service';
import { DeleteConfirmerService } from './_services/delete-confirmer.service';
import { NotifierComponentsModule } from 'ng-notifier';
import { NotifierServicesModule } from 'ng-notifier';
import { DataStateModule } from 'ng-data-state';
var rolesRoutes = [
    {
        path: 'roles',
        role: 'auth',
        label: 'Roles',
        link: true,
        component: RolesComponent,
        resolve: {
            '': RolesDataResolverService
        },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: ListComponent,
                group: 'roles'
            },
            {
                path: 'add',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'view/:id',
                label: 'View',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'edit/:id',
                label: 'Edit',
                component: AddEditViewComponent,
                group: 'roles'
            },
            {
                path: 'delete/:id',
                label: 'Delete',
                group: 'roles',
                component: DeleteComponent,
                outlet: 'empty',
                canActivate: [DeleteConfirmerService]
            }
        ]
    }
];
var AuthorizerModule = /** @class */ (function () {
    function AuthorizerModule() {
    }
    AuthorizerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        NotifierComponentsModule,
                        NotifierServicesModule,
                        DataStateModule,
                        RouterModule.forChild(rolesRoutes)
                    ],
                    providers: [
                        RolesDataResolverService,
                        DeleteConfirmerService
                    ],
                    declarations: [
                        RolesComponent,
                        ListComponent,
                        AddEditViewComponent,
                        DeleteComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    AuthorizerModule.ctorParameters = function () { return []; };
    return AuthorizerModule;
}());
export { AuthorizerModule };
//# sourceMappingURL=ng-authorizer.module.js.map