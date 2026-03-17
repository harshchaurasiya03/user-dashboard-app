import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  users: User[] = [];
  showForm = false;
  chart: any;

  formComponent: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((data) => {
      this.users = data;
      this.updateChart();
    });
  }

  async openForm() {
    const { UserFormComponent } = await import('../../user-form/user-form.component');
    this.formComponent = UserFormComponent;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  addUser(user: User) {
    this.userService.addUser(user);
    this.closeForm();
  }

  updateChart() {
    const roleCount = {
      Admin: 0,
      Editor: 0,
      Viewer: 0,
    };

    this.users.forEach((user) => {
      if (roleCount[user.role] !== undefined) {
        roleCount[user.role]++;
      }
    });

    const canvas = document.getElementById('roleChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            data: [roleCount.Admin, roleCount.Editor, roleCount.Viewer],
            backgroundColor: ['#1c4980', '#4caf50', '#ff9800'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
