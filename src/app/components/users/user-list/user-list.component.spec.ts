import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/shared/dialogs/add-user/add-user.component';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './user-list.component';


describe("UserListComponent", () => {
  let component: UserListComponent;
  let userService: jasmine.SpyObj<UserService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let authService: jasmine.SpyObj<AuthService>;
  let mockLocation: any;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    authService = jasmine.createSpyObj('AuthService', ['getToken']);

    component = new UserListComponent(userService, dialog, authService);
  });

  describe("ngOnInit", () => {
    it("should call showUsers method and add event listener for 'userDeleted'", () => {
      spyOn(component, 'showUsers');
      spyOn(document, 'addEventListener');

      component.ngOnInit();

      expect(component.showUsers).toHaveBeenCalled();
      expect(document.addEventListener).toHaveBeenCalledWith('userDeleted', jasmine.any(Function));
    });
  });

  describe("loadMore", () => {
    it("should set loading to true, update the pageSize, and call showUsers method", () => {
      const num = 20;

      spyOn(component, 'showUsers');

      component.loadMore(num);

      expect(component.loading).toBe(true);
      expect(component.pageSize).toBe(num);
      expect(component.showUsers).toHaveBeenCalled();
    });
  });

  describe("changePage", () => {
    it("should set loading to true, update the currentPage, and call showUsers method", () => {
      const pageNumber = 2;

      spyOn(component, 'showUsers');

      component.changePage(pageNumber);

      expect(component.loading).toBe(true);
      expect(component.currentPage).toBe(pageNumber);
      expect(component.showUsers).toHaveBeenCalled();
    });
  });

  describe("deleteUserByID", () => {
    it("should delete a specific user from the API and emit 'userDeleted' event", () => {
      const id = 1;
      const mockToken = 'mockToken';

      userService.deleteUser.and.returnValue(of({ success: true }));
      authService.getToken.and.returnValue(mockToken);

      const userDeletedListener = jasmine.createSpy('userDeletedListener');
      document.addEventListener('userDeleted', userDeletedListener);

      component.deleteUserByID(id);

      expect(userService.deleteUser).toHaveBeenCalledWith(id, mockToken);
      expect(userDeletedListener).toHaveBeenCalled();
    });
  });

  describe("addUser", () => {
    it("should open the add user dialog", () => {
      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(null));

      const dialogOpenSpy = dialog.open.and.returnValue(dialogRefSpy);

      component.addUser();

      expect(dialog.open).toHaveBeenCalledWith(AddUserDialogComponent, {
        width: '350px',
      });
    });
  });
});
