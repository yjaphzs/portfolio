import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
  onError: () => void;
  children: ReactNode;
};

type State = { failed: boolean };

/**
 * Catches failures inside the 3D canvas — a lost WebGL context, a driver reset,
 * a shader that won't compile on some GPU — and hands control back to the caller
 * so it can fall back to the plain version switcher.
 *
 * `<Canvas fallback>` only covers initial context creation, so it does not help
 * with anything that goes wrong after a successful start.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[time-machine] 3D canvas failed, falling back.", error, info);
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
