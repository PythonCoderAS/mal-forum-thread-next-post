import { mountModal } from "./utils";
import DemoModal from "./components/demoModal/demoModal";

export default function clickHandler() {
  mountModal(DemoModal());
}
