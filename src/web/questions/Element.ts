import { Actor, Question } from "@testla/screenplay";

import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Selector, SelectorOptions } from "../types";

/**
 * @group Questions
 *
 * Get a specified state for selector.
 * A mode operator must be prepended.
 */
export class Element extends Question<boolean> {
  private mode: "visible" | "enabled" | "editable" | "text" | "value" =
    "visible";

  // the selector of the element to check.
  private selector: Selector = "";

  // text or value to check.
  private payload: string | RegExp | (string | RegExp)[] = "";

  // optional selector options.
  private options?: SelectorOptions;

  private constructor(private checkMode: "toBe" | "notToBe") {
    super();
  }

  /**
   * Verifies if an element.
   *
   * @param {Actor} actor the actor
   * @return {Promise<boolean>} true if the element has the specified state, false otherwise.
   * @example
   */
  public async answeredBy(actor: Actor): Promise<boolean> {
    if (this.mode === "visible") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkVisibilityState(
          this.selector,
          this.checkMode === "toBe" ? "visible" : "hidden",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "enabled") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEnabledState(
          this.selector,
          this.checkMode === "toBe" ? "enabled" : "disabled",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "editable") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkEditableState(
          this.selector,
          this.checkMode === "toBe" ? "editable" : "notEditable",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "text") {
      // if .is was called -> positive check, if .not was called -> negative check
      return Promise.resolve(
        await BrowseTheWeb.as(actor).checkSelectorText(
          this.selector,
          this.payload,
          this.checkMode === "toBe" ? "has" : "hasNot",
          this.options,
        ),
      ); // if the ability method is not the expected result there will be an exception
    }
    if (this.mode === "value") {
      // Element.values was called -> need to check multiple values
      if (!Array.isArray(this.payload)) {
        // Element.value was called -> need to check single values
        return Promise.resolve(
          await BrowseTheWeb.as(actor).checkSelectorValue(
            this.selector,
            this.payload,
            this.checkMode === "toBe" ? "has" : "hasNot",
            this.options,
          ),
        ); // if the ability method is not the expected result there will be an exception
      }
      throw new Error(
        "Element.value: incompatible payload! Arrays can not be checked.",
      );
    }
    throw new Error("Unknown mode: Element.answeredBy");
  }

  /**
   * make the Question check for the positive.
   * i.e. checks if a condition is true.
   * @return {Element} new Element instance
   */
  static get toBe() {
    return new Element("toBe");
  }

  /**
   * make the Question check for the negative.
   * i.e. checks if a condition is false.
   * @return {Element} new Element instance
   */
  static get notToBe() {
    return new Element("notToBe");
  }

  /**
   * make the Question check for the positive.
   * i.e. checks if a condition is true.
   * @return {Element} new Element instance
   */
  static get toHave() {
    return new Element("toBe");
  }

  /**
   * make the Question check for the negative.
   * i.e. checks if a condition is false.
   * @return {Element} new Element instance
   */
  static get notToHave() {
    return new Element("notToBe");
  }

  /**
   * @category mode operators
   *
   * Verifies if an element is visible.
   *
   * @param {Selector} selector the selector
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Element} this Element instance
   *
   * @example
   * // simple call with just selector
   * Element.toBe.visible('mySelector');
   * // or with options
   * Element.notToBe.visible(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public visible(selector: Selector, options?: SelectorOptions): Element {
    this.mode = "visible";
    this.selector = selector;
    this.options = options;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verifies if an element is enabled.
   *
   * @param {Selector} selector the selector
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Element} this Element instance
   * @example
   * // simple call with just selector
   * Element.toBe.enabled('mySelector');
   * // or with options
   * Element.notToBe.enabled(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public enabled(selector: Selector, options?: SelectorOptions): Element {
    this.mode = "enabled";
    this.selector = selector;
    this.options = options;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verifies if an element has the given text.
   *
   * @param selector the selector.
   * @param text the text to check.
   * @param options (optional) advanced selector lookup options.
   */
  public text(
    selector: string,
    text: string | RegExp | (string | RegExp)[],
    options?: SelectorOptions,
  ): Element {
    this.mode = "text";
    this.selector = selector;
    this.payload = text;
    this.options = options;

    return this;
  }

  /**
   * Verifies if an element has the given value.
   *
   * @param selector the selector.
   * @param value the value to check.
   * @param options (optional) advanced selector lookup options.
   */
  public value(
    selector: string,
    value: string | RegExp,
    options?: SelectorOptions,
  ): Element {
    this.mode = "value";
    this.selector = selector;
    this.payload = value;
    this.options = options;

    return this;
  }

  /**
   * @category mode operators
   *
   * Verifies if an element is editable.
   *
   * @param {Selector} selector the selector
   * @param {SelectorOptions} options (optional) advanced selector lookup options.
   * @return {Element} this Element instance
   * @example
   * // simple call with just selector
   * Element.toBe.editable('mySelector');
   * // or with options
   * Element.notToBe.editable(
   *   'mySelector', {
   *     hasText: 'myText',
   *     subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
   *   }
   * );
   */
  public editable(selector: Selector, options?: SelectorOptions): Element {
    this.mode = "editable";
    this.selector = selector;
    this.options = options;

    return this;
  }
}
