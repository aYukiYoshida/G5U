import { Actor } from "@testla/screenplay";

import { UseAPI } from "../abilities/UseAPI";
import { RequestMethod } from "../constants";
import { Headers, Response, ResponseBodyFormat } from "../types";

import { ARequest } from "./ARequest";

/**
 * @group Actions
 * Action Class. Send a HTTP DELETE Request.
 */
export class Delete extends ARequest {
  private responseBodyFormat: ResponseBodyFormat = "json";

  private constructor(private url: string) {
    super();
  }

  /**
   * Send a HTTP DELETE request to the specified url.
   *
   * @param {Actor} actor the used actor
   * @return {Response} the response
   */
  public async performAs(actor: Actor): Promise<Response> {
    return UseAPI.as(actor).sendRequest(
      RequestMethod.DELETE,
      this.url,
      this.headers,
      this.responseBodyFormat,
    );
  }

  /**
   * Send a HTTP DELETE request to the specified url.
   * Optionally it is possible to chain definitions for headers and data as well as the expected response type.
   *
   * @param {string} url the URL of the target.
   * @return {Delete} new instance
   * @example
   * // simple request
   * Delete.from('https://my-fancy-url.com');
   * // with chained definitions
   * Delete.from('https://my-fancy-url.com')
   *     // add headers
   *     .withHeaders({
   *         key: value,
   *     })
   *     // add data
   *     .withData({
   *         key: value,
   *     })
   *     // define expected response format
   *     .withResponseFormat('text');
   */
  public static from(url: string): Delete {
    return new Delete(url);
  }

  /**
   * Add headers to the HTTP DELETE request to send.
   *
   * @param {Headers} headers the headers.
   * @return {Delete} the existing instance
   */
  public withHeaders(headers: Headers): Delete {
    this.headers = headers;
    return this;
  }

  /**
   * Set the format the response body should be returned as.
   *
   * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
   * @return {Delete} the existing instance
   */
  public withResponseBodyFormat(
    responseBodyFormat: ResponseBodyFormat,
  ): Delete {
    this.responseBodyFormat = responseBodyFormat;
    return this;
  }
}
