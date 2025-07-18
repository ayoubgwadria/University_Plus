import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed: Changed `styleUrl` to `styleUrls` (correct property name)
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;
  showSuccess = false;
  isLoading = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Optionally, check if the user is already logged in and redirect
    const role = this.userService.getUserRole();
    if (role) {
      this.redirectBasedOnRole(role);
      
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.showSuccess = true;
        this.isLoading = false;

        // Assuming the login response contains the user role or it's updated in userService
        const role = this.userService.getUserRole() || response.role; // Adjust based on your API response structure
        this.redirectBasedOnRole(role);
        window.location.reload();
      },
      error: (err) => {
        this.error = err.error?.message || 'Email or password is incorrect.';
        this.isLoading = false;
      },
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible ? 'text' : 'password';
    }
  }

    private redirectBasedOnRole(role: string) {
      if (role === 'STUDENT') {
        this.router.navigate(['/absence/list']);
      } else if (role === 'PROFESSOR') {
        this.router.navigate(['/document/list']);
      } else {
        this.router.navigate(['/user/list']);
      }
    }
}