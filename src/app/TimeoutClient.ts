import Cookies from "js-cookie";
import { createClient } from "@/lib/supabase/client";

const localSession = "sb-zeoexkwctvzegooglvoe-auth-token";
const timeoutToken = "sb-timeout-token";

/** Session will be terminated after this time and user must log in again. */
const TIMEOUT = 30 * 60 * 1000;
/** Timout token will be checked at this interval. */
const TIMEOUT_TICK_DURATION = 2 * 1000;

export class TimeoutClient {
  private static instance: TimeoutClient;
  protected timeoutTicker: ReturnType<typeof setInterval> | null = null;
  protected visibilityChangedCallback: any | null = null;

  constructor() {
    this._handleVisibilityChange();
  }

  public static createClient() {
    if (!TimeoutClient.instance) {
      TimeoutClient.instance = new TimeoutClient();
    }
    if (Cookies.get(localSession)) {
      this.refreshTimeoutToken();
    }
    return TimeoutClient.instance;
  }

  /**
   * Starts a timout process in the background. The session timeout token is checked every few seconds.
   *
   * On browsers the timeout process works only when the tab/window is in the foreground to conserve resources
   * as well as prevent race conditions and flooding requests.
   */
  public startTimeout() {
    this._removeVisibilityChangedCallback();
    this._startTimeout();
  }

  /**
   * Stops a timeout process running in the background (if any).
   */
  public stopTimeout() {
    this._removeVisibilityChangedCallback();
    this._stopTimeout();
  }

  public static refreshTimeoutToken() {
    if (Cookies.get(localSession)) {
      const exp = Date.now() + TIMEOUT;
      Cookies.set(timeoutToken, exp.toString());
      console.log("timeout refreshed");
    }
  }

  public removeTimeoutToken() {
    Cookies.remove(timeoutToken);
  }

  private _handleVisibilityChange() {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      this.visibilityChangedCallback = this._onVisibilityChanged(false);

      window?.addEventListener(
        "visibilitychange",
        this.visibilityChangedCallback,
      );

      // now immediately call the visibility changed callback to setup with the current visibility state
      this._onVisibilityChanged(true); // initial call
    } catch (error) {
      console.error("_handleVisibilityChange", error);
    }
  }

  /**
   * Callback registered with window.addEventListener('visibilitychange').
   */
  private _onVisibilityChanged(calledFromInitialize: boolean) {
    if (document.visibilityState === "visible") {
      if (Cookies.get(localSession) && Cookies.get(timeoutToken)) {
        this._startTimeout();
      }
    } else if (document.visibilityState === "hidden") {
      if (Cookies.get(localSession) && Cookies.get(timeoutToken)) {
        this._stopTimeout();
      }
    }
  }

  /**
   * Removes any registered visibilitychange callback.
   */
  private _removeVisibilityChangedCallback() {
    const callback = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    if (callback && window?.removeEventListener) {
      window.removeEventListener("visibilitychange", callback);
    }
  }

  /**
   * This is private implementation of startTimeout. Use this within the supabase provider.
   */
  private _startTimeout() {
    this._stopTimeout();
    const ticker = setInterval(
      () => this._timeoutTick(),
      TIMEOUT_TICK_DURATION,
    );
    this.timeoutTicker = ticker;

    if (
      ticker &&
      typeof ticker === "object" &&
      typeof ticker.unref === "function"
    ) {
      // ticker is a NodeJS Timeout object that has an `unref` method
      // https://nodejs.org/api/timers.html#timeoutunref
      // When auto refresh is used in NodeJS (like for testing) the
      // `setInterval` is preventing the process from being marked as
      // finished and tests run endlessly. This can be prevented by calling
      // `unref()` on the returned object.
      ticker.unref();
    }

    setTimeout(() => {
      this._timeoutTick();
    }, 0);
  }

  /**
   * This is private implementation of stopTimeout. Use this within the supabase provider.
   */
  private _stopTimeout() {
    const ticker = this.timeoutTicker;
    this.timeoutTicker = null;
    if (ticker) {
      clearInterval(ticker);
    }
  }

  /**
   * Runs session timeout tick.
   */
  private _timeoutTick() {
    const now = Date.now();
    console.log(now);
    // const exp = +Cookies.get(timeoutToken)!;
    // if (exp < now) {
    //   const supabase = createClient();
    //   // await supabase.auth.signOut();
    //   this._stopTimeout();
    //   alert("expired!");
    // }
  }
}
