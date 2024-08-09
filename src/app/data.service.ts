import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageKey = 'userData'; // Key to access localStorage

  constructor() { }

  // Get all users from localStorage
  getUsers(): any[] {
    const usersJSON = localStorage.getItem(this.storageKey);
    return usersJSON ? JSON.parse(usersJSON) : [];
  }

  // Add a new user to localStorage
  addUser(user: any): void {
    const users = this.getUsers();
    user.id = this.generateUserId(); // Generate unique ID (replace with your logic)
    users.push(user);
    this.updateLocalStorage(users);
  }

  // Update an existing user in localStorage
  updateUser(user: any): void {
    let users = this.getUsers();
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.updateLocalStorage(users);
    }
  }

  // Remove a user from localStorage
  deleteUser(userId: number): void {
    let users = this.getUsers().filter((u: any) => u.id !== userId);
    this.updateLocalStorage(users);
  }

  // Helper function to update localStorage
  private updateLocalStorage(users: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Helper function to generate a unique user ID
  private generateUserId(): number {
    const users = this.getUsers();
    const maxId = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) : 0;
    return maxId + 1;
  }
}
