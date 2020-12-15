/* eslint-disable @typescript-eslint/camelcase */
type SelfWindow = typeof window & {
  __POWERED_BY_QIANKUN__?: boolean;
  __webpack_public_path__?: string;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
};
// eslint-disable-next-line
(function () {
  if ((window as SelfWindow).__POWERED_BY_QIANKUN__) {
    // 处理资源
    // @ts-expect-error
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = (window as SelfWindow).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();
