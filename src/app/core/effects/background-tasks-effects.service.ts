import {Injectable} from "@angular/core";
import {UpfluenceStreamService} from "../../shared/service/upfluence-stream.service";
import {createEffect} from "@ngrx/effects";
import {filter, tap} from "rxjs";

@Injectable()
export class BackgroundTasksEffects {
  constructor(
    private upfluenceStreamService: UpfluenceStreamService,
  ) {}

  initUpfluenceStream$ = createEffect(
    () => this.upfluenceStreamService.workerReady$.pipe(
      filter((workerReady) => workerReady),
      tap(() => this.upfluenceStreamService.initStream()),
    ),
    { dispatch: false },
  );
}
