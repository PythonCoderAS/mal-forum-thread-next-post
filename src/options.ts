// eslint-disable-next-line import/no-cycle
import {
  Options,
  OptionsProps,
  defaultOptions,
} from "./components/options/options";
import { mountModal } from "./utils";

export function getOptionsFromStorage(): OptionsProps {
  return GM_getValue("options", defaultOptions);
}

export function getOptionsFromForm(): OptionsProps {
  return {
    autoCalculateOnSupportedThreads: document.querySelector<HTMLInputElement>(
      "#mal-forum-thread-next-post-auto-calculate"
    )!.checked,
    alwaysGoToLatestPage: document.querySelector<HTMLInputElement>(
      "#mal-forum-thread-next-post-latest-page"
    )!.checked,
  };
}

export function submitOptions(): void {
  const options = getOptionsFromForm();
  GM_setValue("mal-forum-thread-next-post-options", options);
}

export function generateOptions(): void {
  const options = getOptionsFromStorage();
  const modal = Options(options);
  mountModal(modal);
}
