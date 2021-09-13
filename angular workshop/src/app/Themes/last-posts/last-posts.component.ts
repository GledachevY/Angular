import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-last-posts',
  templateUrl: './last-posts.component.html',
  styleUrls: ['./last-posts.component.css']
})
export class LastPostsComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
