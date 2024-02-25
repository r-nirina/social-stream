import {Injectable} from "@angular/core";
import {UpfluenceStreamService} from "../../shared/service/upfluence-stream.service";
import {createEffect} from "@ngrx/effects";
import {filter, tap} from "rxjs";

@Injectable()
export class UpfluenceStreamEffects {
  constructor(private upfluenceStreamSrv: UpfluenceStreamService) {}

  initStream$ = createEffect(
    () => this.upfluenceStreamSrv.workerReady$.pipe(
      filter((workerReady) => workerReady),
      tap(() => this.upfluenceStreamSrv.initStream()),
    ),
    { dispatch: false },
  );
}
