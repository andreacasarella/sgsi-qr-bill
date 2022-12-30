import {AfterViewInit, Component, HostBinding, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContent} from "@angular/material/sidenav";
import {NavigationEnd, Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChild(MatSidenav, {static: false}) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent, {static: false}) sidenavContent!: MatSidenavContent;

  constructor(
    private _router: Router,
    protected media: BreakpointObserver
  ) {
    media.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe();
  }

  @HostBinding('class.small-device')
  get isSmallScreen(): boolean {
    return this.media.isMatched(Breakpoints.XSmall) || this.media.isMatched(Breakpoints.Small);
  }

  get sidenavOverMode(): 'side' | 'over' {
    return this.isSmallScreen ? 'over' : 'side';
  }

  ngAfterViewInit(): void {
    this.closeSidenavUponNavigationOnSmallDevices();
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.sidenavContent.scrollTo({top: 0})
    });
  }

  private closeSidenavUponNavigationOnSmallDevices() {
    this._router.events.subscribe(() => {
      if (this.isSmallScreen) this.sidenav.close();
    });
  }
}
