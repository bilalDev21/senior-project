import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { EventListComponent } from './components/admin-Event/event-list/event-list.component';
import { EventFormComponent } from './components/admin-Event/event-form/event-form.component';
import { EventComponent } from './components/event/event.component';
import { RequestComponent } from './components/request/request.component';
import { RequestByUserComponent } from './components/admin-Event/request-by-user/request-by-user.component';
import { ReportFormComponent } from './components/Report/report-form/report-form.component';
import { ReportListComponent } from './components/Report/report-list/report-list.component';
import { ReportByUserComponent } from './components/Admin-Report/report-by-user/report-by-user.component';
import { HistoryReportComponent } from './components/Admin-Report/history-report/history-report.component';
import { HistoryComponent } from './components/Report/history/history.component';
import { ToolFormComponent } from './components/Admin-Tool/tool-form/tool-form.component';
import { ToolListComponent } from './components/Admin-Tool/tool-list/tool-list.component';
import { OrderByUserComponent } from './components/Admin-Tool/order-by-user/order-by-user.component';
import { ListToolComponent } from './components/Tool/list-tool/list-tool.component';
import { OrderComponent } from './components/Tool/order/order.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

export const routes: Routes = [
    {
        path:"",
        component:HomePageComponent
    },

    {
        path:"Home-Page",
        component:HomePageComponent
    },

    {
        path:"user-page/:id",
        component:UserPageComponent
    },
        
    {
        path:"create-account",
        component:RegisterComponent
    },

    {
        path:"login",
        component:LoginComponent
    },

    {
        path:"Event-List",
        component:EventListComponent
    },

    {
        path:"create-event",
        component:EventFormComponent
    },

    {
        path:"create-event/:id",
        component:EventFormComponent
    },

    {
        path:"request",
        component:RequestByUserComponent
    },

    {
        path:"events/:id",
        component:EventComponent
    },

    {
        path:"requests-user/:id",
        component:RequestComponent   
    },

    {
        path:"report/:id",
        component:ReportFormComponent   
    },

    {
        path:"report-list/:id",
        component:ReportListComponent   
    },

    {
        path:"report-list",
        component:ReportByUserComponent   
    },

    {
        path:"report-history",
        component:HistoryReportComponent   
    },

    {
        path:"history/:id",
        component:HistoryComponent   
    },

    {
        path:"create-tool",
        component:ToolFormComponent   
    },

    {
        path:"create-tool/:id",
        component:ToolFormComponent   
    },

    {
        path:"tool-list",
        component:ToolListComponent   
    },

    {
        path:"orders",
        component:OrderByUserComponent   
    },

    {
        path:"tools/:id",
        component:ListToolComponent   
    },

    {
        path:"order/:id",
        component:OrderComponent   
    },

    {
        path:"about-us",
        component:AboutPageComponent   
    },

    {
        path:"contact-us",
        component:ContactPageComponent   
    },
    
]
