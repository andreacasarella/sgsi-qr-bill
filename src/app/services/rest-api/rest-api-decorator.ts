import {tap} from "rxjs";
import {RestApiService} from "./rest-api.service";
import {Injector, NgModule} from "@angular/core";

@NgModule()
export class RestApiDecoratorModule {
  static injector: Injector;

  public constructor(injector: Injector) {
    RestApiDecoratorModule.injector = injector;
  }
}

export function RestApiUrl() {
  return function (target: unknown, propertyKey: string): void {

    console.log(target, propertyKey);

    const restApiService = RestApiDecoratorModule.injector.get(RestApiService);
    restApiService.$port.pipe(
      // filter(p => !!p),
      tap(port => {
        Object.defineProperty(target, propertyKey, {
          get() {
            throw new Error(`Attribute ${propertyKey} is required!`);
          },
          set(value) {
            console.log(value)
            console.log('port', port, value);
            Object.defineProperty(target, propertyKey, {
              value,
              writable: false,
              configurable: false,
            })
          },
          configurable: false,
          enumerable: false
        })
      })
    ).subscribe()
  }
}
