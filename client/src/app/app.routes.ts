import { Routes } from '@angular/router';
import { authGuard } from './_guards';
import {
  HomeComponent,
  ListsComponent,
  MemberDetailComponent,
  MemberListComponent,
  MessagesComponent,
  NotFoundComponent,
  ServerErrorComponent,
} from '@pages';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'members/id:',
        component: MemberDetailComponent,
      },
      {
        path: 'lists',
        component: ListsComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
