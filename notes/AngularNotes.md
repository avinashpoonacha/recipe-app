1. 
2. npm install -g @angular/cl
3. ng new my-first-app --no-strict will create this app
4. ngModule will bind whatever you type into input at {{}}
5. need to import FormsModule for 1. 
6. if yo want to default strict:false , add it to tsconfig.ts 
7. TypeScript is just add on for js and gets compiled to js 
8. to add bootstrap , first save it 
9. npm install --save bootstrap@3
10. then add it angular.json 
11. starts at main.ts ->
bootstrap appmodule (app.module.ts) 
which bootstraps the app components
    (app.component.ts)
which declares the selector we see in index.html 

modules -> 
Ngmodule -> 
declarations , imports , providers , bootstrap 


generate in CLI :
ng generate component servers
ng g c servers

templates have to be present in component Declaration 
style and selector are optional 

we can use a selector as a 
<> element  or attribute [] or class (.app)
select by id not supported 

---------------------------
Data binding 
{{}}
string binding when you want to output soemthing trivial 

[property]="data"
 when you want to change attribute of elemnts etc 

** dont mix property and string bindings 

or 
react to user events 
(event) ="expression"

(click)="method()"

or 
two way binding 
[(ngModel)]="data"

FormsModule is required for 2 way binding 

Directive 
instructions to DOM 

Component is a directive 
structural directive - changes the struture of dom *ngIf 

ng-template is used to mark places in DOM 

unlike struc directives , attribute directives dont add or remove elements 
they only change elemenet they are placed on
eg : ngStyle 

ngclass is at class level 


splitting components and component communication 
1. @Input('alias') will provide input from a differetn component
into the current component . you will specify it as 
property binding eg :  [srvElement]="serverElement
2. @Output is used to emit an event from one component 
to another component , in order to do it , we need to create EventEmitter objects in the source component 
and then provide the type of object to be passed in this event 
 then in the target component , use property binding to capture the $event 
eg : (serverCreated)="onServerAdded($event)"
   (blueprintCreated)="onblueprintAdded($event)"
next , add these methods in the target ts file and capture the data . 
view encapusualtion - emulated is default ,
None is to add global 
** 
instead of 2 way databinding , you can pass the local reference 
which bscially means it will pass the entire element as is 
to ts , ( always used on template side eg : #thevalue)
can also be used on template directly  
to get entire template and dom : ELementREf
   this.serverContentInput.nativeElement.value
** dont change the value ( dont access DOM , use directives instead )

ng-content is a directive ,  its a hook to mark a place to add content 
can be used for reusuable components 


Component lifecycle hooks:
1. ngOnChanges - called after bound input changes (@Input)
2. ngOnInit - when component is initialized , runs after constructor
3. ngDoCheck - runs after every change detection , like change in template . 
4. ngAfterContentInit - called after ng-content has been projected to view 
5. ngAfterContentChecked - called every time project content has been checked 
6. ngAfterViewInit - called after component and its child have initialized
7. ngOnDestroy - called once component is goign to be destroyed. 

@ViewChild can be used to inject #property as well but it will not be 
avialble on oninit but only  after view init

@ContentChild is similar but works on (ng-content ) content not on view but projected view 


------- 
Directives :

attribute directives 
they sit on elements like attr , 
can have multiple 
ngClass , ngStyle
custom directive :
*.directive.ts
@Directive({
selector:'[appHighlight]',
})
add as declrations  
inject an element in constructor and onInit 
eg : constructor(private _elementRef_: ElementRef)
{
}

eg :
ngOnInit(){
this.elementRef.nativeElement.style.backgroundColor='green';

but accessing this way(direct element) is more of a hack , use like below instead :
constructor ( private elRef:ElementRef, private rendered:Renderer)
ngOnInit(){
this.renderer.(all helper method to work with DOM )
eg: this.renderer.setStyle(this.elementRef.nativeElement,
'background-color','blue');
**
ng g d newdirective
structural directives
they change the struc of the dom ngfor 

the * is actually transformed from below automatically by angular 
<ng-template [ngIf]="some">
cant have more than one struc directive on element 

To create my structural directive :
create directive as per usual 
@Input set **appUnless**(condition: boolean) {
if(!condition) {
this.vcRef.createEmbeddedView(this.templateRef);
} else {
this.vcRef.clear();
}
}
constructor(private templateRef: TemplateRef<any>,private vcRef: ViewControllerRef){
}
<div *appUnless></div>


------------------------------------

Services : centralize code ( similar to AOP in spring)
cross cutting concerns - logging , storing user date 
communniate b/w components 

for Eg: 
1. create a log service 
   logging.service.ts 
export class LoggingService 
there is no @Service ( just use the class by itself )
2. method : logstatusstatus (status:String){
3. console.log();
4. }

usage : 
DONT do this to use service : import {Logginservice} in component 
this is a manual instance which is not needed . 

we need to dependency inject the service instead. 

so add a constructor  to component 
add a private logginsService:(Type) - > type is the service to inject 
make sure you import the class 
then we need to "provide the service to component "
so add providers under the @Component and added the Service Class name 
then do 
this.logginsService.methodname(pass the status ) -- mostly done on onInit() 

hierarchy -> 
appModule -> app wide 
app component -> same instance of service will be available for app components but not app component
any other component -> available for this component only . wil override all others 

-- if we want to use the app component service , 
remove from providers but leave it on constructor and import 

we can also inject service into service 
but we need some metadata (@Injectable()) to receiving service 

also can add eventEmitter in service and use it on injected component
eg : 
this.service.variable.subscribe(
(status) => alert(status);
)

for angular 6 + we can add @Injectable({providedIn: 'root'}) 
then you dont need to set provviders but provided advantage of Lazy loading 

------------------------ 

routing to serve pages based on different URLs 

set in app moudules, 
import Routes ,@angular/router
 add a const appRoutes: Routes = [
{ path:'users', component : UsersComponent }
];
 once this path is reached ,hit this component

how will angular about the path ? 
we need to register it in appmodules 
import RouterModule
RouterModule.forRoot(appRoutes) // now it knows the routes 

where does it render? 
in html , in div ,add the router-outlet 
<router-outlet></router-outlet> marks where router needs to render 

to navigate :
naive approach would be toadd anchor and href with the above path but this will
refresh the path every single time
instead use routerLink ="['/users']" ( will tell angular to handle the internal routing )
/ means absolute path ,wthout / it is relative , even use./ or ../ 

how to set the active tab?
add routerLinkActive="active" on li 
and add [routerLinkActiveOptions]="{exact:true}"
this will ensure only add the css class if it is the actualpath 


what if uou want redirect from a button 

<button (click)="onLoadServers()"/>

in ts: we need to inject the router 

constructor(provite router:Router){}
onLoadServers() {
this.router.navigate(['servers']); 
}
// navigate does not knw hte loaded route , routerlink knows

if we want realtive add :
inject ActivateRoute in constructor
now it will use relative paths 
this.router.navigate(['servers'],{relativeTo: this.route});

Passing parameters to Routes :
{ path:'users/:id/:name', component : UserComponent }

thenin the component ts 
inject activateRoute
and on init 
add this.user={
id: this.route.snapshot.params['id'] , / this wil be injected route
name: this.route.snapshot.params['name']
};

then in html : 

{{ user.id }} {{ user.name }}
 will be used 


if u want to construct a route with added aprams 

<a [routerLink]="['/users','1','anna']"/>

but the above will not render the component as it is on Init ()
so maybe use
on init
add Observables 

ngOnInit() { this.user={
id: this.route.snapshot.params['id'] , / this wil be injected route
name: this.route.snapshot.params['name']
};
/ params is a observable and import Params 
this.route.params
.subscribe(
(params:Params ) =>  {
this.user.id=params['id']];
this.user.name=params['name']];
}
);
}

// angular cleans up subscriptions above when it is destroyed , but subscriptions may remains so
import Subscription ( observables ) add subscription to above 

ngOnInit() { this.user={
id: this.route.snapshot.params['id'] , / this wil be injected route
name: this.route.snapshot.params['name']
};
/ params is a observable and import Params
this.paramSubscription = this.route.params
.subscribe(
(params:Params ) =>  {
this.user.id=params['id']];
this.user.name=params['name']];
}
);
}  

ngOnDestroy() {
this.paramSubscription.unsubscribe();
}
// dnt have to do this but important if we have custom subscriptions

adding query params : 

import Routes ,@angular/router
add a const appRoutes: Routes = [
{ path:'servers/:id/edit', component : AddedServerComponent }
];

to get host/servers/1/edit?allowEdit=1 
<a 
[routerLink]="['servers',5,'edit']"
 [queryParams]="{allowEdit:'1'}" 

> 
can do this dyanmically liek 
[routerLink]="['/servers",user.id,user,name]"

to get host/servers/1/edit?allowEdit=1#loading
<a
[routerLink]="['servers',5,'edit']"
[queryParams]="{allowEdit:'1'}"
[fragments]="loading"
>
>

how to do above on ts file 

onLoadServer(id:number){

this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'},fragments:"loading")
}

retrieving data from query params: 
inject ActivatedRoute as before 
// not reactive to changes 
console.log(this.route.snapshot.queryParams)
console.log(this.route.snapshot.fragment)
 better way is to add observable 
this.route.queryParams.subscribe();
his.route.fragment.subscribe();


// router inside router 


----------------------------------------

recipe-app 

1. ng new recipe-app --no-strict 
2. removed all data from app -component and html 
3. add bootstrap using npm install --save bootstrap@3
4. under angular.json add bootstrap style under styles ( build)
5. open terminal and type ng serve to start and check 
6. add header component and register in app module ts 
7. ng g c recipes --skipTests=true
ng g c recipes/recipe-list --skipTests=true
8. ng g c recipes/recipe-detail --skipTests=true
9. ng g c recipes/recipe-list/recipe-detail --skipTests=true
10. ng g c shopping-list  --skipTests=true
11.  ng g c shopping-list/shopping-edit  --skipTests=true






