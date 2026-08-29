/**
 * TrueScoped — Ad Loader Helper
 * --------------------------------------------------------------------------
 * Drop-in helper for the three ad units supplied with the project.
 *
 * Usage:
 *   1. Include this file once per page:  <script src="/ads/ads.js" defer></script>
 *   2. Place empty containers anywhere you want an ad:
 *        <div data-ad="728x90"></div>
 *        <div data-ad="300x250"></div>
 *        <div data-ad="468x60"></div>
 *   3. On DOMContentLoaded this script will hydrate every container.
 *
 * Notes:
 *   - The ad scripts are loaded async. They create iframes. Layout reflow is minor.
 *   - To respect users, no ads are injected if the user has DoNotTrack=1 set,
 *     unless window.TrueScopedAds.forceShow = true is set BEFORE this script runs.
 *   - To refresh an ad slot (e.g. after a tool result re-renders), call:
 *        window.TrueScopedAds.refresh(elem)  // elem = the container
 * --------------------------------------------------------------------------
 */

(function () {
  'use strict';

  var AD_UNITS = {
    '728x90': {
      key: 'b8cb302039695a8ca6be0d1670ae3030',
      format: 'iframe',
      height: 90,
      width: 728
    },
    '300x250': {
      key: '3e064c14d68f63c18b5aa4b6b1873c46',
      format: 'iframe',
      height: 250,
      width: 300
    },
    '468x60': {
      key: '0ed8bf9af74609561a1e84bb22ed0e94',
      format: 'iframe',
      height: 60,
      width: 468
    }
  };

  function shouldShowAds() {
    if (window.TrueScopedAds && window.TrueScopedAds.forceShow) return true;
    // Respect DoNotTrack
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;
    return true;
  }

  function injectAd(container, sizeKey) {
    var unit = AD_UNITS[sizeKey];
    if (!unit) {
      console.warn('[TrueScopedAds] Unknown ad size:', sizeKey);
      return;
    }
    container.innerHTML = '';
    container.setAttribute('data-ad-size', sizeKey);
    container.classList.add('ad-slot', 'ad-' + sizeKey);

    var opts = document.createElement('script');
    opts.text =
      "atOptions = { " +
      "'key' : '" + unit.key + "', " +
      "'format' : '" + unit.format + "', " +
      "'height' : " + unit.height + ", " +
      "'width' : " + unit.width + ", " +
      "'params' : {} " +
      "};";

    var invoke = document.createElement('script');
    invoke.src = 'https://versatilesentiment.com/' + unit.key + '/invoke.js';
    invoke.async = true;

    container.appendChild(opts);
    container.appendChild(invoke);
  }

  function hydrateAll(root) {
    if (!shouldShowAds()) return;
    var scope = root || document;
    var slots = scope.querySelectorAll('[data-ad]:not(.ad-slot)');
    slots.forEach(function (slot) {
      var size = slot.getAttribute('data-ad');
      injectAd(slot, size);
    });
  }

  function refresh(container) {
    if (!container) return;
    var size = container.getAttribute('data-ad') || container.getAttribute('data-ad-size');
    injectAd(container, size);
  }

  // Expose API
  window.TrueScopedAds = {
    injectAd: injectAd,
    refresh: refresh,
    hydrateAll: hydrateAll,
    units: AD_UNITS
  };

  // Auto-hydrate on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { hydrateAll(); });
  } else {
    hydrateAll();
  }
})();
