import { permanentRedirect } from "next/navigation";

const INTEGRATION_GUIDE = "https://aipowergrid.io/docs/integrations";

export default function UseAipgPage() {
  permanentRedirect(INTEGRATION_GUIDE);
}
