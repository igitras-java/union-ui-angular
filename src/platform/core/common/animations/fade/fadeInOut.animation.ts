import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Function IgFadeInOutAnimation
 *
 * params:
 * * duration: Duration of animation in miliseconds. Defaults to 150 ms.
 *
 * Returns an [AnimationTriggerMetadata] object with states for a fading animation.
 *
 * usage: [@fadeInOut]="true|false"
 */
export function IgFadeInOutAnimation(duration: number = 150): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
        state('0', style({
            opacity: '0',
            display: 'none',
        })),
        state('1', style({
            opacity: '*',
            display: '*',
        })),
        transition('0 => 1', animate(duration + 'ms ease-in')),
        transition('1 => 0', animate(duration + 'ms ease-out')),
    ]);
}
