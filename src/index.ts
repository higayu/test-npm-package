import { normalize } from "./lib/utils";

export default function myPackage(value: unknown) {
  return normalize(value);
}

export { normalize };