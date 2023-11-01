import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const AuthGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
    const authService = inject(AuthService)
    const router = inject(Router)
    return authService.user.pipe(take(1), map(user =>{
        const isAuth = !!user
        if(isAuth)
        {
            return true;
        }
        return router.createUrlTree(['/auth'])
    }))
}