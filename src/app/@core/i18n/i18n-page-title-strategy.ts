import {Injectable} from "@angular/core";
import {I18nService} from "./i18n.service";
import {Title} from "@angular/platform-browser";
import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {constants} from "../../../environment/constants";

@Injectable()
export class I18nPageTitleStrategy extends TitleStrategy {

  private readonly webAppTitle: string = constants.webAppTitle;

  constructor(private i18nService: I18nService,
              private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.i18nService.translateAsync(title).subscribe((translatedTitle) => {
        this.title.setTitle(translatedTitle + ' | ' + this.webAppTitle);
      })
    } else {
      this.title.setTitle(this.webAppTitle);
    }
  }
}
