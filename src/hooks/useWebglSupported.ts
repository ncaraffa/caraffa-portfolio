import { useMemo } from "react";

export function useWebglSupported(): boolean {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      return false;
    }
  }, []);
}
