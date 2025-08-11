import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';       
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
import { Logincomponent } from './logincomponent/logincomponent';
import { Cartcomponent } from './cartcomponent/cartcomponent';
import { Registercomponent } from './registercomponent/registercomponent';
import { AddressComponent } from './addresscomponent/addresscomponent';
import { AddressFormComponent } from './address-form-component/address-form-component';
import { CheckoutComponent } from './check-out-component/check-out-component';
import { OrderConfirmationComponent } from './order-confirmation-component/order-confirmation-component';
import { OrdersListComponent } from './order-list-component/order-list-component';
import { OrderDetailComponent } from './order-detail-component/order-detail-component';
import { PersonalInfoComponent } from './personal-info-component/personal-info-component';
import { PasswordChangeComponent } from './password-change-component/password-change-component';
export const routes: Routes = [
    {path:'category/:id', component: ProductListComponent},
    {path:'category/', component: ProductListComponent},
    {path:'products', component: ProductListComponent},
    {path:'products/:id', component: Productdetailscomponent},
    {path:'login', component: Logincomponent },
    {path:'register', component: Registercomponent },
    {path:'addresses', component: AddressComponent },
    {path:"add-address", component:AddressFormComponent},
    {path:"edit-address/:id", component:AddressFormComponent},
     {path: 'cart', component: Cartcomponent },
     { path: 'checkout', component: CheckoutComponent },
{ path: 'order-confirmation', component: OrderConfirmationComponent },
{path :'personal-info', component: PersonalInfoComponent}, // Assuming you have a PersonalInfoComponent
{path: 'orders' ,component: OrdersListComponent},
{path: 'order-detail', component: OrderDetailComponent}, // Assuming you want to view order details in the same component
{path: 'password-change', component: PasswordChangeComponent}, // Assuming you want to handle password change in the PersonalInfoComponent
    {path:'', redirectTo:'/products', pathMatch: 'full'},
    
// {path:'**', redirectTo:'/products', pathMatch: 'full'}

];
