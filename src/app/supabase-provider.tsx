"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Cookies from "js-cookie";

const localSession = "sb-zeoexkwctvzegooglvoe-auth-token";
const sessionTimeout = "sb-timeout-token";
const TIMEOUT = 30 * 60 * 1000;
const TIMEOUT_TICK = 30 * 1000;

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const router = useRouter();
  /** an interval ID which uniquely identifies the timeout interval */
  const timeoutTicker = useRef<any>(null);
  const pathname = usePathname();

  /**
   * Handling initial loading, refreshing, visibility changes, sign in, and sign out.
   */
  useEffect(() => {
    /**
     * AuthChangeEvent:
     * https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession
     * - INITIAL_SESSION: invoke the callback function when onAuthStateChange is first called.
     * - SIGNED_IN: invoke the callback function when user signed in or tab/window becomes visible.
     * - SIGNED_OUT: invoke the callback function when user signed out.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "INITIAL_SESSION") {
        _addVisibilityEventListener();
        if (isSession()) {
          _startTimeout();
          _refreshTimeoutToken();
        }
      } else if (event === "SIGNED_IN") {
        _startTimeout();
        _refreshTimeoutToken();
      } else if (event === "SIGNED_OUT") {
        _removeTimeoutToken();
        _stopTimeout();
        router.refresh();
      }
    });

    return () => {
      _removeTimeoutToken();
      _stopTimeout();
      _removeVisibilityEventListener();
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  /**
   * Handling url changes. Refreshes timeout token when url changes.
   */
  useEffect(() => {
    if (isSession()) {
      _refreshTimeoutToken();
    }
  }, [pathname]);

  return <>{children}</>;

  /**
   * Checks is there a supabase session persisted in local storage (cookie).
   */
  function isSession() {
    return !!Cookies.get(localSession);
  }

  /**
   * Adds window visibility event listener.
   */
  function _addVisibilityEventListener() {
    window?.addEventListener("visibilitychange", _onVisibilityChangedCallback);
  }

  /**
   * Removes window visibility event listener.
   */
  function _removeVisibilityEventListener() {
    window?.removeEventListener(
      "visibilitychange",
      _onVisibilityChangedCallback,
    );
  }

  /**
   * When tab/window visibility changes:
   * - visible: Starts checking timeout.
   * - hidden: Stops checking timeout.
   */
  function _onVisibilityChangedCallback() {
    // if (document?.visibilityState === "visible") {}
    // supabase.auth.onAuthStateChange() invokes callback function when the tab/window becomes visible.

    if (document?.visibilityState === "hidden") {
      _stopTimeout();
    }
  }

  /**
   * Starts a session timeout checking process in the background. The timeout is checked every few seconds.
   */
  function _startTimeout() {
    _stopTimeout();

    _timeoutCallback();

    timeoutTicker.current = setInterval(_timeoutCallback, TIMEOUT_TICK);
  }

  /**
   * Stops a session timeout checking process in the background.
   */
  function _stopTimeout() {
    const ticker = timeoutTicker.current;
    timeoutTicker.current = null;
    if (ticker) {
      clearInterval(ticker);
    }
  }

  /**
   * Checks the session timeout.
   */
  async function _timeoutCallback() {
    const timeoutToken = Cookies.get(sessionTimeout);
    if (timeoutToken) {
      const now = Date.now();
      const exp = Number(timeoutToken);
      if (now > exp) {
        await supabase.auth.signOut();
        router.push("/");
      }
    }
  }

  /**
   * Refreshes timeout token.
   */
  function _refreshTimeoutToken() {
    const now = Date.now();
    const exp = now + TIMEOUT;
    Cookies.set(sessionTimeout, exp.toString());
  }

  /**
   * Remove timeout token (if any).
   */
  function _removeTimeoutToken() {
    const timeoutToken = Cookies.get(sessionTimeout);
    if (timeoutToken) {
      Cookies.remove(sessionTimeout);
    }
  }
}
