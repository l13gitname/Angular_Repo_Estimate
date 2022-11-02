import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {CookieService} from 'ngx-cookie-service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';


import { CustomerInfoComponent } from './Repo-Estimate/customer-info/customer-info.component';
import { HttpServicesService } from 'src/Services/http-services.service';
import { GlobalVariableService } from 'src/Services/global-variable.service';
import {NgxPrintModule} from 'ngx-print';
import {NgxImageCompressService} from "ngx-image-compress";
import { LoadingComponent } from './ServicesPage/loading/loading.component';
import { FullpicComponent } from './ServicesPage/fullpic/fullpic.component';
import { SearchHistoryComponent } from './Repo-Estimate/search-history/search-history.component';
import { CancelPageComponent } from './ServicesPage/cancel-page/cancel-page.component';
import { RegistrationBookInputComponent } from './Book/registration-book-input/registration-book-input.component';
import { RegistrationBookComponent } from './Book/registration-book/registration-book.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdhDJdlCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM', pathMatch: 'full' },
  //{ path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdhDJdoCPfmHMgmHLgvGKguGOduDKdhDSdqDSdqDSdqCPflGYgsGOgvDWgpDSfoGUhoDKetFSdkEOguHKgkEXgnEKgkEMgkFJgwHQcnEKgkGMflHShhGOduEMgpGOgkGUgmHL', pathMatch: 'full' },{ path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdhDMdmCPfmHMgmHLgvGKguGOduDKdhDSdqDSdqDSdqCPflGYgsGOgvDWgpDSfoGUhoDKetFSdkEOguHKgkEXgnEKgkEMgkFJgwHQcnEKgkGMflHShhGOduEMgpGOgkGUgmHL', pathMatch: 'full' },
  { path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdhDJdkCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM', pathMatch: 'full' },
  //{ path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdoDMdnCPfmHMgmHLgvGKguGOduDKdhDPdmDNdhDJdjCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHM', pathMatch: 'full' },
  //{ path: '', redirectTo: '/Mpls-CustomerInfo?Key=EMgwGXhlHLgiGMhlEXgwDWdiDKdhDLdhDLdjDJdhDJdhDJdhDJdoCPfmHMgmHLgvGKguGOduDKdhDPdmDNdiDJdhCPflGYgsGOgvDWeiHOgvENgmHPehEWhhGVhmHMcnEKgkGMflHShhGOduEMgpGOgkGUgmHL', pathMatch: 'full' },
  //{ path: '', redirectTo: '/Mpls-Repo-History?Key=FOhkGOhjGXgiGWgmDWdiDJdnDOdlDJdhDMcnFNgwGUgmGXduEKhmGXelGOhnEJeuHJgtHOhk', pathMatch: 'full' },
  //{ path: '', redirectTo: '/Mpls-Book', pathMatch: 'full' },
  { path : 'Mpls-CustomerInfo', component : CustomerInfoComponent},
  { path : 'Mpls-Repo-History', component : SearchHistoryComponent},
  { path : 'Mpls-CustomerInfo/:Key', component : CustomerInfoComponent},
  { path : 'Mpls-Repo-History/:Key', component : SearchHistoryComponent},
  { path : 'Mpls-Book-Input', component : RegistrationBookInputComponent},
  { path : 'Mpls-Book', component : RegistrationBookComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerInfoComponent,
    LoadingComponent,
    FullpicComponent,
    CancelPageComponent,
    SearchHistoryComponent,
    RegistrationBookInputComponent,
    RegistrationBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatExpansionModule,
    NgxPrintModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [CookieService, HttpServicesService, GlobalVariableService, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
