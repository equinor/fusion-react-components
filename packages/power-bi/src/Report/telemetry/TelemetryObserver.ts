import { Observable, Subject, Subscription } from 'rxjs';

import { withLatestFrom } from 'rxjs/operators';

import { ActionType, createAction, getType, PayloadActionCreator } from 'typesafe-actions';

import { Performance } from './Performance';
import { TelemetryLogger } from './TelemetryLogger';

type ActionPayload<T> = T extends PayloadActionCreator<string, infer R> ? R : T;
type Actions = ActionType<typeof TelemetryActions>;

type TelemetryPayload = {
  name: string;
  mark?: string;
  properties?: Record<string, unknown>;
};

export const TelemetryActions = {
  metric: createAction('@TELEMETRY/METRIC')<
    TelemetryPayload & {
      measure?: [string, string];
    }
  >(),
  error: createAction('@TELEMETRY/ERROR')<TelemetryPayload>(),
  event: createAction('@TELEMETRY/EVENT')<TelemetryPayload>(),
};

export class TelemetryObserver<C = any, A extends Actions = Actions> extends Subject<A> {
  public readonly performance = new Performance();
  protected _subscription: Subscription;
  constructor(
    readonly name: string,
    readonly context$: Observable<C>,
    readonly telemetry: TelemetryLogger,
  ) {
    super();
    this._subscription = this.pipe(withLatestFrom(context$)).subscribe(([action, properties]) =>
      this.processAction(action, properties),
    );
  }

  unsubscribe() {
    super.unsubscribe();
    this._subscription.unsubscribe();
  }

  processAction(action: Actions, context?: C) {
    const {
      payload,
      payload: { mark },
    } = action;
    const name = `${this.name}/${payload.name}`;
    const properties = { ...context, ...payload.properties };

    switch (action.type) {
      case getType(TelemetryActions.metric): {
        const { measure } = action.payload;
        const average = this.performance.measure(...(measure || [])) / 1000;
        this.telemetry.trackMetric({ name, properties, average });
        mark && performance.mark(mark);
        break;
      }
      case getType(TelemetryActions.error): {
        this.telemetry.trackException({
          exception: Error(name),
          properties,
        });
        break;
      }
      case getType(TelemetryActions.event): {
        this.telemetry.trackEvent({
          name,
          properties,
        });
        mark && performance.mark(mark);
        break;
      }
    }
  }

  measure(args: ActionPayload<typeof TelemetryActions.metric>) {
    this.next(TelemetryActions.metric(args) as A);
  }

  error(args: ActionPayload<typeof TelemetryActions.error>) {
    this.next(TelemetryActions.error(args) as A);
  }

  event(args: ActionPayload<typeof TelemetryActions.event>) {
    this.next(TelemetryActions.error(args) as A);
  }
}

export default TelemetryObserver;
