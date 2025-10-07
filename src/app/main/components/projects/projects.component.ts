import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  filterValue: string = '';
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 3;


  projects = [
    { name: 'Orangoose Shop', category: 'E-commerce', description: 'A cutting-edge e-commerce platform designed for seamless user experiences.', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.UV0dcsfNkgRPiVCVF7gW0QHaG1?cb=12&pid=ImgDet&w=474&h=437&rs=1&o=7&rm=3' },
    { name: 'Authentication System', category: 'ERP', description: 'An enterprise resource planning system for better business management.', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/725/406/small_2x/authentication-security-flat-illustration-vector.jpg' },
    { name: 'Admin Panel', category: 'Inventory', description: 'Manage inventory and logistics efficiently with our cutting-edge software.', imageUrl: 'https://cdn6.f-cdn.com/contestentries/2632016/76321464/68dc26022b549_thumb900.jpg' },
    { name: 'Product Management System', category: 'Educational', description: 'A versatile learning management system to enhance the education process.', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.WatoCmNMGwGHj1zyPH_7cAHaFj?cb=12&pid=ImgDet&w=184&h=138&c=7&dpr=1.3&o=7&rm=3' },
    { name: 'Project E', category: 'E-commerce', description: 'A custom-built platform for seamless product management.', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.B7-xPN6o7GuX1qV5wXI-fwHaEc?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Project F', category: 'ERP', description: 'An efficient solution for business operations.', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/725/406/small_2x/authentication-security-flat-illustration-vector.jpg' },
  ];

  filteredProjects = [...this.projects];

  ngOnInit(): void {
    this.totalItems = this.filteredProjects.length;
    this.updatePageData();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      project.category.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      project.description.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    this.totalItems = this.filteredProjects.length; 
    this.updatePageData(); 
  }

  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePageData(); 
  }

  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      project.category.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      project.description.toLowerCase().includes(this.filterValue.toLowerCase())
    ).slice(startIndex, endIndex);
  }
}
