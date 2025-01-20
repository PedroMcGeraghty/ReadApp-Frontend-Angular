import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BgColorDirective } from '../directives/bg-color.directive';
import { HoverBoxshadowDirective } from '../directives/hover-boxshadow.directive';
import { UserBasic } from '../../../domain/tmpUser';
import { ServiceUser } from '../../../service/service-user.service';

@Component({
  selector: 'app-shorcut-my-profile',
  standalone: true,
  imports: [NgFor, RouterLink, BgColorDirective, HoverBoxshadowDirective, NgIf],
  templateUrl: './shorcut-my-profile.component.html',
  styleUrl: './shorcut-my-profile.component.css'
})
export class ShorcutMyProfileComponent implements OnInit{

  constructor(public UserService: ServiceUser, private rt:Router){}

  @Input() show!:boolean
  @Input() user!:UserBasic;

  displayShorcut!:boolean

  ngOnInit(): void {
    this.displayShorcut = false //False -> test. True -> debug
  }

  changeDisplay(){
    this.displayShorcut = !this.displayShorcut
  }

  goTo(option: string) {
    this.rt.navigate([option])
  }
  colorDefault = 'white'
  options = [
    new Option('My profile', 'profile.svg', this.colorDefault, this.colorDefault, 'my-profile'),
    new Option('My recommendations', 'recomendation.svg', this.colorDefault, this.colorDefault, 'home/myRecommendations/false'),
    new Option('Search books', 'book.svg', this.colorDefault, this.colorDefault, 'search-books'),
    new Option('Log out', 'log-out.svg', this.colorDefault, this.colorDefault, 'log-out')
    
  ]
}

export class Option{
  constructor(
    public label:string,
    public iconPath:string,
    public textColor:string,
    public iconColor:string,
    public path : string
  ){}
}