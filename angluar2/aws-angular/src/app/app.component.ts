import { Component,HostListener } from '@angular/core';
declare var lexaudio:any;
@HostListener('window:onLexResult', ['$event'])
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  finalIntent: string = "";
  scripts_loaded: boolean = false;
  showBot:boolean = false;

  constructor() {

  }

  ngOnInit() {
    if (this.scripts_loaded == true) {
      return;
    } else {
      this.scripts_loaded = true;
      this.loadScript('assets/aws/control.js');
      this.loadScript('assets/aws/recorder.js');
      this.loadScript('assets/aws/renderer.js');
      this.loadScript('assets/aws/conversation.js');
      setTimeout(function(){ lexaudio.example(); },500);
    }
  }

  public loadScript(url) {
    let child = document.createElement('script');
    child.type = 'text/javascript';
    child.src = url;
    document.getElementsByTagName('head')[0].appendChild(child);
  }
  
  public showLexBot(e){
    this.showBot = true;
    window["runLex"] = true;
    document.getElementById("audio-control").click();
  }

  public handleLexResult(e){
    this.finalIntent = e.partType;
  }
}
