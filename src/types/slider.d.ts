import type { Ref, ComputedRef } from 'vue';

export type SliderLimit = 'lower' | 'upper' | 'none';

export type SliderOptions = {
    centeredSlides?: boolean;
    startAt?: number;
    loop?: boolean;
    loopDuplicates?: number;
    debounce?: {
        resize?: number;
        throw?: number;
        move?: number;
    };
    resistance?: {
        drag?: number;
        edge?: number;
    };
};

export type SliderParams = {
    wrapper: Ref<HTMLElement>;
    slides: Ref<HTMLElement[]>;
    items: T[];
    options?: SliderOptions;
};

export type SliderData = {
    index: number;
    instance: globalThis.Draggable;
    snaps: number[];
    wrapperWidth: number;
    slideWidth: number;
    slideCount: number;
    bounds: {
        minX: number;
        maxX: number;
    };
};

export type SliderReturn = {
    index: ComputedRef<number>;
    realIndex: ComputedRef<number>;
    items: ComputedRef<T[]>;
    limit: ComputedRef<SliderLimit>;
    moveTo: (index: number, immediate?: boolean) => void;
};

type ClassBinding =
    | string
    | string[]
    | {
          [key: string]: boolean;
      };

type ClassList = {
    outer?: ClassBinding;
    wrapper?: ClassBinding;
    slide?: ClassBinding;
};

export type SliderProps = {
    items: T[];
    options?: SliderOptions;
    classList?: ClassList;
};
