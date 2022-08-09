import Modal from "../modal/modal";
import * as SimpleTSX from "simple-tsx";

export default function DemoModal() {
  const header = <strong>Demo Modal</strong>;
  const children = (
    <div>
      <p>This is a demo modal.</p>
      <p>It has a header, a dividing line, and some content.</p>
      <ul>
        <li>It has a close button.</li>
        <li>It has a header.</li>
        <li>It has some lists.</li>
      </ul>
    </div>
  );
  return <Modal header={header} dividingLine={true} body={children} />;
}
