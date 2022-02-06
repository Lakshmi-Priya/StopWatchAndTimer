import { Component, OnInit } from '@angular/core';
import { Subject, timer } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public subject = new Subject();
  public time: any;
  public source: any = timer(1000, 1000);
  public isPaused: boolean;
  public count:number=0;
  constructor() {
    this.time = "00:00:00";
  }

  ngOnInit() {
    this.isPaused = false;
  }

  startTimer() {

    const subscribe = this.source.pipe(takeUntil(this.subject)).subscribe(val => {
      if (!this.isPaused) { this.getDisplayTimer(val) }
    }
    );
  }

  pauseTimer() {
    this.count++;
    if(this.count%2==0){
      this.isPaused=false;
      document.getElementById("pause").innerText="Pause"
    }
    else{
      this.isPaused=true;
      document.getElementById("pause").innerText="Resume"
    }
    
  }

  stopTimer() {
    this.time = "00:00:00";
    this.subject.next();
  }

  getDisplayTimer(time: any) {
    var hours = '' + Math.floor(time / 3600);
    var minutes = '' + Math.floor(time % 3600 / 60);
    var seconds = '' + Math.floor(time % 3600 % 60);

    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }
    this.time = hours + ':' + minutes + ':' + seconds;
  }
}


