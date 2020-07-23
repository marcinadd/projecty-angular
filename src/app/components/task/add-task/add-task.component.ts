import {Component, Inject} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TaskService} from '../../../services/task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../models/Project';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskCreateForm;
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public project: Project,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    const currentDate = new Date();
    this.taskCreateForm = this.formBuilder.group({
      name: '',
      startDate: currentDate,
      endDate: currentDate,
      importance: 2
    });
  }

  onSubmit(form) {
    this.taskService.createTask(form, this.project.id).subscribe(() => {
      this.router.navigate(['/projects', this.project.id, 'tasks']);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    return this.taskCreateForm.value;
  }

  onImportanceChanged(value: number) {
    this.taskCreateForm.patchValue({importance: value});
  }
}
