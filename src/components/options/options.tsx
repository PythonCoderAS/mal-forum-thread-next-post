import Modal from "../modal/modal";
import * as SimpleTSX from "simple-tsx";
import { submitOptions } from "../../options";
import AdvancedOptions from "../advancedOptions/advancedOptions";

export interface OptionsProps {
  autoCalculateOnSupportedThreads: boolean;
  alwaysGoToLatestPage: boolean;
}

export const defaultOptions: OptionsProps = {
  autoCalculateOnSupportedThreads: false,
  alwaysGoToLatestPage: false,
};

export function Options(props: OptionsProps) {
  const header = "Options";
  const body: SimpleTSX.Element = (
    <div onclick={submitOptions}>
      <p>
        Click the checkbox to enable an option. Click it again to disable it.
      </p>
      <input
        type="checkbox"
        id="mal-forum-thread-next-post-auto-calculate"
        name="mal-forum-thread-next-post-auto-calculate"
      />
      <label htmlFor="mal-forum-thread-next-post-auto-calculate">
        Automatically Calculate Next Post on Supported Threads <a href="#">?</a>
      </label>
      <input
        type="checkbox"
        id="mal-forum-thread-next-post-latest-page"
        name="mal-forum-thread-next-post-latest-page"
      />
      <label htmlFor="mal-forum-thread-next-post-latest-page">
        Always go to the Latest Page on Supported Threads <a href="#">?</a>
      </label>
      <hr />
      <AdvancedOptions />
    </div>
  );
  body.element.querySelector<HTMLInputElement>(
    "#mal-forum-thread-next-post-auto-calculate"
  )!.checked = props.autoCalculateOnSupportedThreads;
  body.element.querySelector<HTMLInputElement>(
    "#mal-forum-thread-next-post-latest-page"
  )!.checked = props.alwaysGoToLatestPage;
  return <Modal header={header} dividingLine={true} body={body} />;
}
