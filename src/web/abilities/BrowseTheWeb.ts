import { Cookie, expect, Locator, Page, Response } from "@playwright/test";
import { Ability, Actor } from "@testla/screenplay";

import { Selector, SelectorOptions, ScreenOptions } from "../types";
import { recursiveLocatorLookup } from "../utils";

/**
 * This class represents the actor's ability to use a Browser.
 */
export class BrowseTheWeb extends Ability {
  /**
   * Initialize this Ability by passing an already existing Playwright Page object.
   *
   * @param {Page} page the Playwright Page that will be used to browse.
   * @return {BrowseTheWeb} Returns the ability to use a browser
   */
  public static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /**
   * Use this Ability as an Actor.
   *
   * @param {Actor} actor Actor is using this ability
   * @return {BrowseTheWeb} Returns the ability to use a browser
   */
  public static as(actor: Actor): BrowseTheWeb {
    return actor.withAbilityTo(this) as BrowseTheWeb;
  }

  /**
   * Initialize this Ability by passing an already existing Playwright Page object.
   *
   * @param {Page} page the Playwright Page that will be used to browse.
   */
  private constructor(private page: Page) {
    super();
  }

  /**
   * Get the page object
   *
   * @returns {Page} the page object
   */
  public getPage(): Page {
    return this.page;
  }

  /**
   * Use the page to navigate to the specified URL.
   *
   * @param {string} url the url to access.
   * @return {Response} Returns the main resource response
   */
  public async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }

  /**
   * Wait for the specified loading state.
   *
   * @param {string} status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
   * @return {void} Returns when the required load state has been reached.
   */
  public async waitForLoadState(
    status: "load" | "domcontentloaded" | "networkidle",
  ): Promise<void> {
    return this.page.waitForLoadState(status);
  }

  /**
   * Use the page mouse to hover over the specified element.
   *
   * @param {Selector} selector the selector of the element to hover over.
   * @param {SelectorOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
   * @return {void} Returns when hovered over the element
   */
  public async hover(
    selector: Selector,
    options?: SelectorOptions & {
      modifiers?: ("Alt" | "Control" | "Meta" | "Shift")[];
    },
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).hover({ modifiers: options?.modifiers });
  }

  /**
   * Press the specified key(s) on the keyboard.
   *
   * @param {string} input the key(s). multiple keys can be pressed by concatenating with "+"
   * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
   */
  public async press(input: string): Promise<void> {
    return this.page.keyboard.press(input);
  }

  /**
   * Check the specified checkbox.
   *
   * @param {Selector} selector the selector of the checkbox.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Returns after checking the element
   */
  public async checkBox(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).check();
  }

  /**
   * Wait until the element of the specified selector exists.
   *
   * @param {Selector} selector the selector of the element.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Locator} Promise<Locator> returns the locator
   */
  public async waitForSelector(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<Locator> {
    return recursiveLocatorLookup({ page: this.page, selector, options });
  }

  /**
   * Drag the specified source element to the specified target element and drop it.
   *
   * @param {Selector} sourceSelector the selector of the source element.
   * @param {Selector} targetSelector the selector of the target element.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Returns after dragging the locator to another target locator or target position
   */
  public async dragAndDrop(
    sourceSelector: Selector,
    targetSelector: Selector,
    options?: {
      source?: SelectorOptions;
      target?: SelectorOptions;
    },
  ): Promise<void> {
    const target = await recursiveLocatorLookup({
      page: this.page,
      selector: targetSelector,
      options: options?.target,
    });
    return (
      await recursiveLocatorLookup({
        page: this.page,
        selector: sourceSelector,
        options: options?.source,
      })
    ).dragTo(target, { targetPosition: { x: 0, y: 0 } });
  }

  /**
   * Fill the element specified by the selector with the given input.
   *
   * @param {Selector} selector the selector of the source element.
   * @param {string} input the input to fill the element with.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
   */
  public async fill(
    selector: Selector,
    input: string,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).fill(input);
  }

  /**
   * Type the given input into the element specified by the selector.
   *
   * @param {Selector} selector the selector of the source element.
   * @param {string} input the input to type into the element.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
   */
  public async type(
    selector: Selector,
    input: string,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).type(input);
  }

  /**
   * Click the element specified by the selector.
   *
   * @param {Selector} selector the selector of the element to click.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Returns after clicking the element
   */
  public async click(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).click();
  }

  /**
   * Double click the element specified by the selector.
   *
   * @param {Selector} selector the selector of the element to double click.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {void} Returns after double clicking the element
   */
  public async dblclick(
    selector: Selector,
    options?: SelectorOptions,
  ): Promise<void> {
    return (
      await recursiveLocatorLookup({ page: this.page, selector, options })
    ).dblclick();
  }

  /**
   * Validate if the page has specified URL.
   *
   * @param {string} mode the expected property of the page that needs to be checked. either 'toHaveUrl' or 'notToHaveUrl'.
   * @param {string|RegExp} expectedUrl the expected url of the page.
   * @param {number} options (optional) timeout in milliseconds to wait for the element to be visible/hidden. Defaults to {@link defaultWaitTimeout}
   * @returns {boolean} Promise<boolean> true if the page has URL as expected, false if the timeout was reached.
   */
  public async checkPageUrl(
    mode: "toHaveUrl" | "notToHaveUrl",
    expectedUrl: string | RegExp,
    options?: ScreenOptions,
  ): Promise<boolean> {
    if (mode === "toHaveUrl") {
      await expect(this.page).toHaveURL(expectedUrl, options);
    } else {
      await expect(this.page).not.toHaveURL(expectedUrl, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the page has specified title.
   *
   * @param {string} mode the expected property of the page that needs to be checked. either 'toHaveTitle' or 'notToHaveTitle'.
   * @param {string|RegExp} expectedTitle the expected title of the page.
   * @param {number} timeout (optional) time in milliseconds to wait for the element to be visible/hidden. Defaults to {@link defaultWaitTimeout}
   * @returns {boolean} Promise<boolean> true if the page has title as expected, false if the timeout was reached.
   */
  public async checkPageTitle(
    mode: "toHaveTitle" | "notToHaveTitle",
    expectedTitle: string | RegExp,
    options?: ScreenOptions,
  ): Promise<boolean> {
    if (mode === "toHaveTitle") {
      await expect(this.page).toHaveTitle(expectedTitle, options);
    } else {
      await expect(this.page).not.toHaveTitle(expectedTitle, options);
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if a locator on the page is visible or hidden.
   *
   * @param {Selector} selector the locator to search for.
   * @param {string} mode the expected property of the selector that needs to be checked. either 'visible' or 'hidden'.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} Promise<boolean> true if the element is visible/hidden as expected, false if the timeout was reached.
   */
  public async checkVisibilityState(
    selector: Selector,
    mode: "visible" | "hidden",
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (mode === "visible") {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeVisible({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "hidden" },
        }),
      ).toBeHidden({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if a locator on the page is enabled or disabled.
   *
   * @param {Selector} selector the locator to search for.
   * @param {string} mode the expected property of the selector that needs to be checked. either 'enabled' or 'disabled'.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} true if the element is enabled/disabled as expected, false if the timeout was reached.
   */
  public async checkEnabledState(
    selector: Selector,
    mode: "enabled" | "disabled",
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (mode === "enabled") {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeEnabled({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeDisabled({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if a locator on the page is editable or not.
   *
   * @param {Selector} selector the locator to search for.
   * @param {string} mode the expected property of the selector that needs to be checked. either 'editable' or 'notEditable'.
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @returns {boolean} true if the element is editable/not as expected, false if the timeout was reached.
   */
  public async checkEditableState(
    selector: Selector,
    mode: "editable" | "notEditable",
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (mode === "editable") {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toBeEditable({ timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toBeEditable({ timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given text or not.
   *
   * @param selector the selector of the element to hover over.
   * @param text the text to check.
   * @param options (optional) advanced selector lookup options.
   */
  public async checkSelectorText(
    selector: Selector,
    text: string | RegExp | (string | RegExp)[],
    mode: "has" | "hasNot",
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (mode === "has") {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveText(text, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveText(text, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Validate if the given element has the given input value or not.
   *
   * @param selector the selector of the element to hover over.
   * @param value the single value to check.
   * @param options (optional) advanced selector lookup options.
   */
  public async checkSelectorValue(
    selector: Selector,
    value: string | RegExp,
    mode: "has" | "hasNot",
    options?: SelectorOptions,
  ): Promise<boolean> {
    if (mode === "has") {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).toHaveValue(value, { timeout: options?.timeout });
    } else {
      await expect(
        await recursiveLocatorLookup({
          page: this.page,
          selector,
          options: { ...options, state: "visible" },
        }),
      ).not.toHaveValue(value, { timeout: options?.timeout });
    }
    return Promise.resolve(true);
  }

  /**
   * Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.
   * @param {string|string[]} urls affected urls
   * @return {Cookie[]} Returns the cookies of the current browser context.
   */
  public async getCookies(
    urls?: string | string[] | undefined,
  ): Promise<Cookie[]> {
    return this.page.context().cookies(urls);
  }

  /**
   * Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).
   * @param {Cookie[]} cookies Cookies to add at browser context
   * @return {void} Returns after adding cookies into this browser context.
   */
  public async addCookies(cookies: Cookie[]): Promise<void> {
    return this.page.context().addCookies(cookies);
  }

  /**
   * Clear the browser context cookies.
   * @return {void} Clears context cookies.
   */
  public async clearCookies(): Promise<void> {
    return this.page.context().clearCookies();
  }

  /**
   * Get a local storage item.
   *
   * @param {string} key the key that specifies the item.
   * @return {any} Returns the local storage item
   */
  public async getLocalStorageItem(key: string): Promise<any> {
    return this.page.evaluate((k) => {
      const value = localStorage.getItem(k);
      if (value) {
        return Promise.resolve(JSON.parse(value));
      }
      return Promise.resolve(undefined);
    }, key);
  }

  /**
   * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
   *
   * @param {string} key the key that specifies the item.
   * @param {any} value the value to set.
   * @return {void} Returns after adding the local storage item
   */
  public async setLocalStorageItem(key: string, value: any): Promise<void> {
    return this.page.evaluate(
      ({ k, v }) => {
        localStorage.setItem(k, JSON.stringify(v));
        return Promise.resolve();
      },
      { k: key, v: value },
    );
  }

  /**
   * Delete a local storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {void} Returns after deleting a local storage item
   */
  public async removeLocalStorageItem(key: string): Promise<void> {
    return this.page.evaluate((k) => {
      localStorage.removeItem(k);
      return Promise.resolve();
    }, key);
  }

  /**
   * Get a session storage item.
   *
   * @param {string} key the key that specifies the item.
   * @return {any} Retrieves a session storage item
   */
  public async getSessionStorageItem(key: string): Promise<any> {
    return this.page.evaluate((k) => {
      const value = sessionStorage.getItem(k);
      if (value) {
        return Promise.resolve(JSON.parse(value));
      }
      return Promise.resolve(undefined);
    }, key);
  }

  /**
   * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
   *
   * @param {string} key the key that specifies the item.
   * @param {any} value the value to set.
   * @return {void} Set the session storage item
   */
  public async setSessionStorageItem(key: string, value: any): Promise<void> {
    return this.page.evaluate(
      ({ k, v }) => {
        sessionStorage.setItem(k, JSON.stringify(v));
        return Promise.resolve();
      },
      { k: key, v: value },
    );
  }

  /**
   * Delete a session storage item, if a key/value pair with the given key exists.
   *
   * @param {string} key the key that specifies the item.
   * @return {void} Returns after removing a session storage item.
   */
  public async removeSessionStorageItem(key: string): Promise<void> {
    return this.page.evaluate((k) => {
      sessionStorage.removeItem(k);
      return Promise.resolve();
    }, key);
  }

  /**
   * Set the value of a Selector of type select to the given option.
   *
   * @param {Selector} selector the string representing the (select) selector.
   * @param {string} option the label of the option.
   * @param {SelectorOptions} selectorOptions (optional): advanced selector lookup options.
   * @return {any} Returns the array of option values that have been successfully selected.
   */
  public async selectOption(
    selector: Selector,
    option: string | { value?: string; label?: string; index?: number },
    selectorOptions?: SelectorOptions,
  ): Promise<any> {
    return (
      await recursiveLocatorLookup({
        page: this.page,
        selector,
        options: selectorOptions,
      })
    ).selectOption(option);
  }
}
