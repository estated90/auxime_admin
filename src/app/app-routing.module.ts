import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../providers/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login",loadChildren: () => import("./login/login.module").then((m) => m.LoginPageModule),},
  { path: "forgotpassword", loadChildren: () =>import("./forgotpassword/forgotpassword.module").then((m) => m.ForgotpasswordPageModule),},
  /* {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then((m) => m.AboutPageModule),
       canActivate: [AuthGuard]
   },*/
  { path: 'edit-profile',loadChildren: () => import("./edit-profile/edit-profile.module").then((m) => m.EditProfilePageModule),},
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'useradd', loadChildren: './useradd/useradd.module#UseraddPageModule' },
  { path: 'useredit/:id', loadChildren: './useredit/useredit.module#UsereditPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'categoryedit/:id', loadChildren: './categoryedit/categoryedit.module#CategoryeditPageModule' },
  { path: 'categoryadd', loadChildren: './categoryadd/categoryadd.module#CategoryaddPageModule' },
  { path: 'tasks', loadChildren: './tasks/tasks/tasks.module#TasksPageModule' },
  { path: 'task/:id', loadChildren: './tasks/task/task.module#TaskPageModule' },
  { path: 'create-task', loadChildren: './tasks/create-task/create-task.module#CreateTaskPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'edit-task', loadChildren: './tasks/edit-task/edit-task.module#EditTaskPageModule' },
  { path: 'edit-event', loadChildren: './events/edit-event/edit-event.module#EditEventPageModule' },
  { path: 'create-event', loadChildren: './events/create-event/create-event.module#CreateEventPageModule' },
  { path: 'events', loadChildren: './events/events/events.module#EventsPageModule' },
  { path: 'event/:id', loadChildren: './events/event/event.module#EventPageModule' },
  { path: 'edit-scope', loadChildren: './scope/edit-scope/edit-scope.module#EditScopePageModule' },
  { path: 'scope/:id', loadChildren: './scope/scope/scope.module#ScopePageModule' },
  { path: 'scopes', loadChildren: './scope/scopes/scopes.module#ScopesPageModule' },
  { path: 'create-scope', loadChildren: './scope/create-scope/create-scope.module#CreateScopePageModule' },
  { path: 'contrats-cape', loadChildren: './contract/cape/contrats-cape/contrats-cape.module#ContratsCapePageModule' },
  { path: 'contrat-cape/:id', loadChildren: './contract/cape/contrat-cape/contrat-cape.module#ContratCapePageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'create-cape', loadChildren: './contract/cape/create-cape/create-cape.module#CreateCapePageModule' },
  { path: 'create-eventplanning', loadChildren: './calendar/create-eventplanning/create-eventplanning.module#CreateEventplanningPageModule' },
  { path: 'edit-eventplanning/:id', loadChildren: './calendar/edit-eventplanning/edit-eventplanning.module#EditEventplanningPageModule' },
  { path: 'user-contrats', loadChildren: './contract/user-contrats/user-contrats.module#UserContratsPageModule' },
  { path: 'create-hote', loadChildren: './hote/create-hote/create-hote.module#CreateHotePageModule' },
  { path: 'hote/:id', loadChildren: './hote/hote/hote.module#HotePageModule' },
  { path: 'hotes', loadChildren: './hote/hotes/hotes.module#HotesPageModule' },
  { path: 'formations', loadChildren: './formations/formations/formations.module#FormationsPageModule' },
  { path: 'create-formation', loadChildren: './formations/create-formation/create-formation.module#CreateFormationPageModule' },
  { path: 'formation/:id', loadChildren: './formations/formation/formation.module#FormationPageModule' },
  { path: 'create-partenaire', loadChildren: './partenaires/create-partenaire/create-partenaire.module#CreatePartenairePageModule' },
  { path: 'partenaire/:id', loadChildren: './partenaires/partenaire/partenaire.module#PartenairePageModule' },
  { path: 'partenaires', loadChildren: './partenaires/partenaires/partenaires.module#PartenairesPageModule' },
  { path: 'modal-create-slide', loadChildren: './home/modal-create-slide/modal-create-slide.module#ModalCreateSlidePageModule' },
  { path: 'modal-edit-slide', loadChildren: './home/modal-edit-slide/modal-edit-slide.module#ModalEditSlidePageModule' },
  { path: 'partenaire', loadChildren: './partenaires/partenaire/partenaire.module#PartenairePageModule' },
  { path: 'partenaires', loadChildren: './partenaires/partenaires/partenaires.module#PartenairesPageModule' },
  { path: 'client/:id', loadChildren: './client/client/client.module#ClientPageModule' },
  { path: 'clients', loadChildren: './client/clients/clients.module#ClientsPageModule' },

  { path: 'create-client', loadChildren: './client/create-client/create-client.module#CreateClientPageModule' },
  { path: 'modal-search-porte', loadChildren: './contract/modal-search-porte/modal-search-porte.module#ModalSearchPortePageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
