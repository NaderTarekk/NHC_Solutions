import { Component, ElementRef, HostListener, inject, OnInit, Query } from '@angular/core';
import { MainService } from '../../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../dialogs/create-post/create-post.component';
import { UpdatePostComponent } from '../dialogs/update-post/update-post.component';
import { DeletePostComponent } from '../dialogs/delete-post/delete-post.component';
import { AboutPostComponent } from '../dialogs/about-post/about-post.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


enum PostType {
  All = 1,
  Article,
  News,
  Blog,
  Event,
  JobPost,
  Interview,
  Announcement,
  Workshop,
  Tip,
  Quote,
  BehindTheScenes,
  ProductLaunch
}

interface Blog {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  category: 'Design' | 'Dev' | 'Business' | string;
  tags?: string[];
  publishedAt: string | Date;
}

@Component({
  selector: 'app-blogs',
  standalone: false,
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})

export class BlogsComponent implements OnInit {
  loading = false;
  query = '';
  token: any
  open = false;
  value = 'Clear me';
  tags = [
    { type: PostType.All, label: 'All' },
    { type: PostType.Article, label: 'Article' },
    { type: PostType.News, label: 'News' },
    { type: PostType.Blog, label: 'Blog' },
    { type: PostType.Event, label: 'Event' },
    { type: PostType.JobPost, label: 'Job Post' },
    { type: PostType.Interview, label: 'Interview' },
    { type: PostType.Announcement, label: 'Announcement' },
    { type: PostType.Workshop, label: 'Workshop' },
    { type: PostType.Tip, label: 'Tip' },
    { type: PostType.Quote, label: 'Quote' },
    { type: PostType.BehindTheScenes, label: 'Behind the Scenes' },
    { type: PostType.ProductLaunch, label: 'Product Launch' }
  ];
  posts: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  readonly dialog = inject(MatDialog);
  showApproval: boolean = false;
  currentPage: number = 1;
  activeTag = '';
  filteredPosts: any[] = []
  allPosts: any[] = []
  visiblePostsCount: number = 4;
  totalPostsCount: number = 0;

  constructor(private el: ElementRef, private service: MainService, private sanitizer: DomSanitizer, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("NHCToken");

    this.GetAllPosts();

    this.service.PostsList(this.pageNumber, 99999999).subscribe((res: any) => {
      this.allPosts = res.items
      console.log(res.items);

    });
  }

  getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loadMorePosts() {
    this.visiblePostsCount += 4;
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filterPosts() {
    if (this.query == '') {
      this.GetAllPosts();
      return;
    }
    this.filteredPosts = this.allPosts.filter(post =>
      post.title.toLowerCase().includes(this.query.toLowerCase()) ||
      post.content.toLowerCase().includes(this.query.toLowerCase()) ||
      post.postType.toLowerCase().includes(this.query.toLowerCase())
    );
    this.totalItems = this.filteredPosts.length;
    // this.applyPagination();
  }

  applyPagination() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = this.pageNumber * this.pageSize;
    this.filteredPosts = this.filteredPosts.slice(startIndex, endIndex - 1);
  }

  pageChanged(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.GetAllPosts();
  }

  setTag(tag: { type: PostType, label: string }) {
    this.activeTag = tag.label;
    if (tag.label == 'All') {
      this.GetAllPosts();
      return;
    }
    this.service.PostsList(1, 99999999).subscribe((res: any) => {
      this.filteredPosts = res.items.filter((post: { postType: string; }) => post.postType === tag.label);
      this.totalItems = this.filteredPosts.length
    })
  }

  trackById = (_: number, p: Blog) => p.id;

  onTagChange(e: Event) {
    const activeTag = (e.target as HTMLSelectElement).value;
  }


  trackByTag = (_: number, t: string) => t;

  GetAllPosts() {
    this.service.PostsList(this.pageNumber, this.pageSize).subscribe((res: any) => {
      this.filteredPosts = res.items
      this.totalItems = res.totalCount;
      console.log(res);

    })
  }


  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllPosts()
      }
    });
  }

  openUpdatePostDialog(post: any): void {
    const dialogRef = this.dialog.open(UpdatePostComponent, {
      data: { post }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllPosts()
      }
    });
  }

  openAboutPostDialog(post: any): void {
    const dialogRef = this.dialog.open(AboutPostComponent, {
      data: { post }
    });
  }

  openDeletePostDialog(post: any): void {
    const dialogRef = this.dialog.open(DeletePostComponent, {
      data: { post }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.GetAllPosts()
      }
    });
  }

  ShowPublishedPosts(event: Event) {
    const input = event.target as HTMLInputElement;
    this.showApproval = input.checked;

    this.service.GetPublisheddPosts(this.currentPage, this.pageSize, this.showApproval).subscribe((res: any) => {
      this.posts = res.items
    })
  }

  onTogglePublish(test: any, event: any) {
    const newValue = event.target.checked;
    test.isPublished = newValue;
    this.token = localStorage.getItem("NHCToken");

    const formData = new FormData();

    formData.append('isPublished', newValue);

    this.service.UpdatePost(test.postId, formData, this.token).subscribe((res: any) => {
      if (newValue == true) {
        this.toastr.success("Post is Published", "Publishing Post")
        console.log("res:" + res);
      }
      else
        this.toastr.success("Post is not Published", "Publishing Post")
    }, err => {
      this.toastr.success(err.error.message, "Publishing Post")
    })
  }
}
