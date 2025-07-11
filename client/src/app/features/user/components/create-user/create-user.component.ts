import { Component } from '@angular/core';
import { CreateUserDTO } from '../../DTO/CreateUserDTO';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../DTO/UserDTO';
import { Role } from '../../../../core/models/User';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  user: CreateUserDTO = { email: '', firstName: '', lastName: '', role: Role.STUDENT };
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.userService.createUser(this.user).subscribe({
      next: (createdUser: UserDTO) => {
        this.successMessage = `User ${createdUser.email} created successfully.`;
        this.errorMessage = '';
        this.user = { email: '', firstName: '', lastName: '', role: Role.STUDENT };
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error creating user:', err);
        this.errorMessage = 'Failed to create user.';
        this.successMessage = '';
        this.isSubmitting = false;
      },
    });
  }

  onReset(): void {
    this.user = { email: '', firstName: '', lastName: '', role: Role.STUDENT };
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.user.email) progress += 25;
    if (this.user.firstName) progress += 25;
    if (this.user.lastName) progress += 25;
    if (this.user.role) progress += 25;
    return progress;
  }
}
