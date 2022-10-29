import * as core from "@testdeck/core";

import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from "vitest";


const vitestRunner: core.TestRunner = {
  suite(name: string, callback: () => void, settings?: core.SuiteSettings): void {
    // TODO: Push settings.timeout on the stack and pass it to each child test...
    switch (settings && settings.execution) {
      case "only":
        describe.only(name, callback);
        break;
      case "skip":
        describe.skip(name, callback);
        break;
      case "pending":
        describe.todo(name);
        break;
      default:
        describe(name, callback);
    }
  },
  test(name: string, callback: core.CallbackOptionallyAsync, settings?: core.TestSettings): void {
    const testSettings = { timeout: settings && settings.timeout, retry: settings && settings.retries };
    switch (settings && settings.execution) {
      case "only":
        it.only(name, callback, testSettings);
        break;
      case "skip":
        it.skip(name, callback, testSettings);
        break;
      case "pending":
        it.todo(name);
        break;
      default:
        it(name, callback, testSettings);
    }
  },
  beforeAll(name: string, callback: core.CallbackOptionallyAsync, settings?: core.LifecycleSettings): void {
    beforeAll(callback as any, settings && settings.timeout);
  },
  beforeEach(name: string, callback: core.CallbackOptionallyAsync, settings?: core.LifecycleSettings): void {
    beforeEach(callback as any, settings && settings.timeout);
  },
  afterEach(name: string, callback: core.CallbackOptionallyAsync, settings?: core.LifecycleSettings): void {
    afterEach(callback as any, settings && settings.timeout);
  },
  afterAll(name: string, callback: core.CallbackOptionallyAsync, settings?: core.LifecycleSettings): void {
    afterAll(callback as any, settings && settings.timeout);
  }
};

class VitestClassTestUI extends core.ClassTestUI {
  public constructor(runner: core.TestRunner = vitestRunner) {
    super(runner);
  }
}

const vitestDecorators = new VitestClassTestUI();

export const {

  suite,
  test,
  slow,
  timeout,
  retries,
  pending,
  only,
  skip,
  params
} = vitestDecorators;
