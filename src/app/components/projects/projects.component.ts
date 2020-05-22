import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      console.log(projects);
      this.projects = projects;
    });
  }
}
