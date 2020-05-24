import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl} from '@angular/forms';
import {TaskService} from '../../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  project;
  taskCreateForm;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    const currentDate = new FormControl(new Date());
    this.taskCreateForm = this.formBuilder.group({
      name: '',
      startDate: currentDate,
      endDate: currentDate
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectData(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
      this.project = project;
    });
  }

  onSubmit(form) {
    this.taskService.createTask(form, this.project.id).subscribe(task => {
      // TODO Navigate to tasklist
      console.log(task);
    });
  }
}
