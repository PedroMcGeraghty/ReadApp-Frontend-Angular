import { Routes } from '@angular/router';;
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { HomeComponent } from './home/home.component';
import { BusquedaLibrosComponent } from './busqueda-libros/busqueda-libros.component';
import { PerfilInfoComponent } from './shared/perfil-info/perfil-info.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';

import { ProfileRecommendationsComponent } from './profile-recommendations/profile-recommendations.component';
import { ProfileBooksReadedComponent } from './profile-books-readed/profile-books-readed.component';
import { LoginComponent } from './login/login.component';
import { ViewRecommendationComponent } from './view-recommendation/view-recommendation.component';
import { LibrosAgregarComponent } from './libros-agregar/libros-agregar.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'home/myRecommendations/:privates',
        component: HomeComponent,
    },
    {
        path: 'view-recommendation/edit/:id', // Ruta para editar
        component: ViewRecommendationComponent,
    },
    {
        path: 'view-recommendation/detalle/:id', // Ruta para ver detalles
        component: ViewRecommendationComponent,
    },
    {
        path: 'view-recommendation/crear', // Ruta para crear
        component: ViewRecommendationComponent,
    },
    {
        path: 'search-books',
        component: BusquedaLibrosComponent
    },
    {
        path: 'my-profile',
        component: MiPerfilComponent,
        children: [
            { path: 'information', component: PerfilInfoComponent },
            { path: 'friends', component: ProfileFriendsComponent },
            { path: 'new-friends', component: ProfileFriendsComponent },
            { path: 'books/:tipo', component: ProfileBooksReadedComponent },
            { path: 'add-books/:tipo', component: LibrosAgregarComponent },
            { path: 'recommendations-to-value', component: ProfileRecommendationsComponent },
            { path: '', redirectTo: 'information', pathMatch: 'full' },

        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }//ESTE VA ULTIMO
];