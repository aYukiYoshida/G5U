import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Fill an element specified by a selector string with the specified input.
 */
export class Fill extends Action {
    private constructor(private locator: string, private input: string) {
        super();
    }

    /**
     * find the specified selector and fill it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        return (BrowseTheWeb.as(actor) as BrowseTheWeb).fill(this.locator, this.input);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param selector the selector.
     * @param input the input.
     */
    public static in(selector: string, input: string): Fill {
        return new Fill(selector, input);
    }
}
