import { ToastOptions } from 'ng2-toastr';
export class CustomToastOption extends ToastOptions { // can create separate .ts file for class
    animate = 'fade';
    positionClass = 'toast-bottom-right';
    toastLife = 1500;
}