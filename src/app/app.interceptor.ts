import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = window.localStorage.getItem('token');

  if (!authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
