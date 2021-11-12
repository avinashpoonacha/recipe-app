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






