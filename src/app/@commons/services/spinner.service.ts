import {inject, Injectable} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {SpinnerComponent} from "../components/spinner/spinner.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlay: Overlay = inject(Overlay)
  private overlayRef: OverlayRef | null = null;

  public show(message: string | null = null) {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'spinner-overlay-backdrop',
        positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally()
      });
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    component.instance.message = message;
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
