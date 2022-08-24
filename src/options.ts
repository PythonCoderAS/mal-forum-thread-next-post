// eslint-disable-next-line import/no-cycle
import {
  Options,
  OptionsProps,
  defaultOptions,
} from "./components/options/options";
import { mountModal } from "./utils";

export async function getOptionsFromStorage(): Promise<OptionsProps> {
  return JSON.parse((await GM.getValue("options", JSON.stringify(defaultOptions))) as string);
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

export async function submitOptions(): Promise<void> {
  const options = getOptionsFromForm();
  await GM.setValue("mal-forum-thread-next-post-options", JSON.stringify(options));
}

export async function generateOptions(): Promise<void> {
  const options = await getOptionsFromStorage();
  const modal = Options(options);
  mountModal(modal);
}
