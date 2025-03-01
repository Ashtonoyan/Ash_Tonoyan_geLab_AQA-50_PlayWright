import {BaseComponent} from "./base-components";
import {ButtonElement} from "../ui-wrappers/buttons-element";
import {getPage} from "../core/utils/page-utils";
import {test} from "playwright/test";


export class EmailsList extends BaseComponent {
    private static emailButton = (subjectRandom: string) => new ButtonElement(getPage().locator(`div.listSubject[title="${subjectRandom}"]`));

    static async emailFindBySubject(subjectRandom: string) {
        await test.step(`Find email with subject ${subjectRandom}`, async () => {
            await this.emailButton(subjectRandom).waitForSelector({timeout: 1000});
            await this.emailButton(subjectRandom).click();

        })
    }

}