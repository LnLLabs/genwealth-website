import { Keystatic } from "@keystatic/core/ui";
import config from "../../keystatic.config";

export function KeystaticAdmin() {
  return <Keystatic config={config as never} />;
}
