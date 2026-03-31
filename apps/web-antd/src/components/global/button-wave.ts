import type { ConfigProviderProps } from 'antdv-next';

import type { ThemePreferences } from '@vben/preferences';

import { createApp, h } from 'vue';

import { DotEffect } from '@antdv-next/happy-work-theme';

const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.append(div);

  return div;
};

const createDot = (
  holder: HTMLElement,
  color: string,
  left: number,
  top: number,
  size = 0,
) => {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate3d(-50%, -50%, 0)';
  dot.style.transition = 'all 1s ease-out';
  holder.append(dot);
  return dot;
};

type WaveConfig = NonNullable<ConfigProviderProps['wave']>;

const showInsetEffect: WaveConfig['showEffect'] = (
  node,
  { event, component },
) => {
  if (component !== 'Button') {
    return;
  }

  const holder = createHolder(node);
  const rect = holder.getBoundingClientRect();
  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

  requestAnimationFrame(() => {
    dot.addEventListener('transitionend', () => {
      holder.remove();
    });

    dot.style.width = '200px';
    dot.style.height = '200px';
    dot.style.opacity = '0';
  });
};

const showShakeEffect: WaveConfig['showEffect'] = (node, { component }) => {
  if (component !== 'Button') {
    return;
  }

  const seq = [0, -15, 15, -5, 5, 0];
  const itv = 10;
  let steps = 0;

  const loop = () => {
    cancelAnimationFrame((node as any).effectTimeout);
    (node as any).effectTimeout = requestAnimationFrame(() => {
      const currentStep = Math.floor(steps / itv);
      const current = seq[currentStep];
      const next = seq[currentStep + 1];

      if (next === undefined || next === null) {
        node.style.transform = '';
        node.style.transition = '';
        return;
      }

      const angle =
        (current ?? 0) + ((next - (current ?? 0)) / itv) * (steps % itv);

      node.style.transform = `rotate(${angle}deg)`;
      node.style.transition = 'none';

      steps += 1;
      loop();
    });
  };

  loop();
};

/**
 * copy from https://github.com/antdv-next/happy-work-theme?tab=readme-ov-file#advanced-usage-with-doteffect
 */
const showHappyEffect: WaveConfig['showEffect'] = (target, info) => {
  const { token, hashId } = info;

  const holder = document.createElement('div');
  holder.style.position = 'absolute';
  holder.style.left = '0px';
  holder.style.top = '0px';
  document.body.append(holder);

  const app = createApp({
    render() {
      return h(DotEffect, {
        target,
        token,
        hashId,
        onFinish: () => {
          app.unmount();
          holder.remove();
        },
      });
    },
  });

  app.mount(holder);
};

export const waveConfigs: Array<{
  name: ThemePreferences['buttonWaveMode'];
  wave: WaveConfig;
}> = [
  { name: 'Disabled', wave: { disabled: true } },
  { name: 'Default', wave: {} },
  { name: 'Inset', wave: { showEffect: showInsetEffect } },
  { name: 'Shake', wave: { showEffect: showShakeEffect } },
  { name: 'Happy', wave: { showEffect: showHappyEffect } },
];
