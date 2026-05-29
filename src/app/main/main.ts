import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { Runnertext } from '../runnertext/runnertext';
import { WorkProces } from '../work-proces/work-proces';

@Component({
  selector: 'app-main',
  imports: [Header, Hero, Runnertext,WorkProces],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
