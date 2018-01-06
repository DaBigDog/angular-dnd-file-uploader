import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
          <div class="container-fluid">
            <div class="row">
              <h3>{{name}}</h3>
            </div>
            <div class="row top-pad">
              <file-list></file-list>
            </div>
          </div>
  `,
})
export class AppComponent  
{ 
  private name: string = 'Angular DND File Uploader'; 



}
