import { Controller } from "stimulus";
import SlimSelect from 'slim-select';
import 'jsdig';
export default class extends Controller {
  connect() {
    this.slimselect = new SlimSelect(this._slimSelectOptions());
  }

  disconnect() {
    this.slimselect.destroy()
  }

  _ajax({ url, urlParam, minimumLength, minimumLengthMessage, debounceMs, ...processAjaxResultConfig }) {
    return this._debounce((search, callback) => {
      if (search.length < minimumLength) {
        callback(minimumLengthMessage);
        return;
      }

      url.searchParams.set(urlParam, search);
      fetch(url)
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          const data = this._processAjaxResult(json, processAjaxResultConfig);
          callback(data);
        }.bind(this))
        .catch(function(_error) {
          console.error(_error);
          callback(false);
        });
    }, debounceMs);
  }

  _processAjaxResult(data, { valueColumn, textColumn, rootColumn }) {
    let root = data;
    if(rootColumn) root = data.dig(rootColumn);

    return root.map(el => {
      return {
        value: el.dig(...valueColumn.split('.')),
        text: el.dig(...textColumn.split('.'))
      }
    })
  }

  _slimSelectOptions() {
    return Object.assign(
      { select: this.element },
      this._castOptions({ ...this.element.dataset }),
      this._ajaxOptions()
    )
  }

  _castOptions(data) {
    return Object.keys(data).reduce((acc, current) => {
      if (data[current] === "true") {
        acc[current] = true;
      } else if (data[current] === "false") {
        acc[current] = false;
      } else {
        acc[current] = data[current];
      }
      return acc;
    }, {})
  }

  _ajaxOptions() {
    if (!this.element.dataset.ajaxUrl) return {}
    const data = this.element.dataset;

    return {
      ajax: this._ajax({
        url: this._ajaxUrl(data.ajaxUrl),
        urlParam: data.ajaxUrlParam || 'search',
        minimumLength: data.ajaxMinimumLength || 2,
        minimumLengthMessage: data.ajaxMinimumLengthMessage || false,
        valueColumn: data.ajaxValueColumn || 'value',
        textColumn: data.ajaxTextColumn || 'text',
        rootColumn: data.ajaxRootColumn || null,
        debounceMs: parseInt(data.ajaxDebounceMs || 175)
      }),
      searchFilter: (_option, _search) => true
    }
  }

  _ajaxUrl(urlOrPath) {
    try {
      return new URL(urlOrPath)
    } catch (_) {
      // If the developer only gave a path, combine it with the domain + protocol
      const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
      const url = new URL(baseUrl)
      url.pathname = urlOrPath;
      return url
    }
  }

  _debounce(callback, wait, immediate = false) {
    let timeout = null

    return function() {
      const callNow = immediate && !timeout
      const next = () => callback.apply(this, arguments)

      clearTimeout(timeout)
      timeout = setTimeout(next, wait)

      if (callNow) {
        next()
      }
    }
  }
}
