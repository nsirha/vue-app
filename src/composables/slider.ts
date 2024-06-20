import { reactive, watch, computed, onBeforeUnmount } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { gsap, Draggable, InertiaPlugin } from 'gsap/all';

import type {
    SliderLimit,
    SliderOptions,
    SliderParams,
    SliderData,
    SliderReturn,
} from './../types/slider';

gsap.registerPlugin(Draggable, InertiaPlugin);

const DEFAULT_OPTIONS: SliderOptions = {
    centeredSlides: false,
    startAt: 0,
    loop: false,
    loopDuplicates: 2,
    debounce: {
        resize: 300,
        throw: 15,
        move: 15,
    },
    resistance: {
        drag: 0.15,
        edge: 0.85,
    },
};

/**
 * This composable is responsible for all of the functional logic
 * and inner workings of a slider for the User Interface
 *
 * @param params - The paramaters required to configure the slider
 * @param params.wrapper - The element for the slider to be initialised on
 * @param params.slides - An array of elements acting as the "slides"
 * @param params.items - An array of the data used for each slide (containing duplicates if necessary)
 * @param params.options - Options object used to configure different features
 * @returns Various useful properties and methods to aid the User Interface
 */
export function useSlider(params: SliderParams): SliderReturn {
    /**
     * This watcher ensures that the slider is only initialised
     * when the Wrapper and Slides refs have finished loading
     */
    const stop = watch(
        [params.wrapper, params.slides],
        ([wrapper, slides]) => {
            // If we don't have both the wrapper and the slides. Early return.
            if (!(wrapper && slides)) return;

            // We now have both, so stop the watcher,
            stop();

            // …and Initialise the draggable instance & other listeners
            init();
        },
        {
            immediate: true,
        }
    );

    // Combine the default options with any new ones passed via the params
    const options = {
        ...DEFAULT_OPTIONS,
        ...params.options,
    };

    // Reactive data object acts as the source of truth for important variables
    const data = reactive<SliderData>({
        index: options.startAt,
        instance: null,
        snaps: [],
        wrapperWidth: 0,
        slideWidth: 0,
        slideCount: params.items.length,
        bounds: {
            maxX: 0,
            minX: 0,
        },
    });

    /**
     * Returns the real index of the active item, considering duplicates (if looped)
     */
    const realIndex = computed(() => {
        if (options.loopDuplicates) {
            return data.index + options.loopDuplicates;
        }

        return data.index;
    });

    /**
     * Tracks the index state against the number of items
     * and returns whether the slider is at it's
     * lower limit, upper limit or neither.
     * Defaults to neither (none) if loop option is enabled
     */
    const limit = computed<SliderLimit>(() => {
        if (options.loop) return 'none';

        if (data.index === 0) return 'lower';

        if (data.index === params.items.length - 1) return 'upper';

        return 'none';
    });

    /**
     * This computed property returns the data for our slides as an array.
     * If the Loop option is enabled, then this property will return the array
     * with some duplicate items.
     *
     * The number of duplicates _may_ be greater than the number of items
     * in which case you will need to tweak the options you pass.
     */
    const items = computed(() => {
        if (options.loop) {
            return [
                ...params.items.slice(params.items.length - options.loopDuplicates),
                ...params.items,
                ...params.items.slice(0, options.loopDuplicates),
            ];
        }

        return params.items;
    });

    /**
     * This helper method turns an index into a pixel value
     * @param index - Desired slide's index
     * @returns - Pixel position of a desired slide
     */
    const x = (index: number) => {
        if (options.loop) {
            const offset = options.loop ? options.loopDuplicates : 0;

            return data.snaps.at(index + offset);
        }

        return data.snaps.at(index);
    };

    /**
     * This helper method turns a positive number into a negative number.
     * Useful as Sliders using transform translate often need to move
     * to a calculated target below 0
     * @param value
     * @returns Value * -1
     */
    const negative = (value: number) => value * -1;

    /**
     * Used to programatically move the slider to a specific slide
     * @param index Number slide to move to (zero index)
     * @param immediate Whether the slider should immediately snap to this position or animate
     */
    const moveTo = (index: number, immediate?: boolean) => {
        const method = immediate ? gsap.set : gsap.to;

        method(params.wrapper.value, {
            x: x(index),
            onComplete: immediate ? null : onComplete,
        });
    };

    /**
     * This method is responsible for calculating (and updating)
     * an array of snap positions for all the slides. These positions are
     * calculated based on the assumption that all slides are the _same_ width
     */
    const updateSnapPositions = () => {
        data.wrapperWidth = params.wrapper.value.offsetWidth;
        data.slideWidth = params.slides.value[0].offsetWidth;

        const halfWrapper = data.wrapperWidth / 2;
        const halfSlide = data.slideWidth / 2;

        data.snaps = items.value.map((_, index) => {
            // Centered slides need to offset based on the wrapper width
            if (options.centeredSlides) {
                return negative(index * data.slideWidth - halfWrapper + halfSlide);
            }

            return negative(index * data.slideWidth);
        });

        data.instance.vars.snap = data.snaps;
    };

    /**
     * This method is responsible for calculating (and updating)
     * the draggable bounds. Looped sliders only require bounds in order
     * to prevent dragging past the duplicates
     *
     * Regular sliders need bounds to prevent dragging into whitespace
     */
    const updateBounds = () => {
        // Non looped slides need a more sensible minX offset.
        if (options.loop) {
            data.bounds = {
                maxX: 0,
                minX: negative(data.slideWidth * (items.value.length - 1)),
            };
        } else {
            data.bounds = {
                maxX: 0,
                minX: negative(
                    data.slideCount * data.slideWidth - params.wrapper.value.offsetWidth
                ),
            };
        }

        data.instance.applyBounds(data.bounds);

        if (data.bounds.minX < 0) {
            data.instance.enable();
            moveTo(data.index, true);
        } else {
            data.instance.disable();
            data.index = 0;
        }
    };

    /**
     * This method is responsible for tracking the active index of the slider.
     */
    const updateIndex = () => {
        let newIndex: number;

        const nearestX = gsap.utils.snap(data.snaps, data.instance.x);
        const snappedIndex = data.snaps.indexOf(nearestX);

        // Looped Sliders need to "reset" on each snap in order to create the looped effect
        if (options.loop) {
            // Consider the "real" index
            const offsetIndex = snappedIndex - options.loopDuplicates;

            newIndex = gsap.utils.wrap(0, data.slideCount)(offsetIndex);
        } else {
            newIndex = snappedIndex;
        }

        // Skip updating if the value is the same
        if (newIndex === data.index) {
            return;
        }

        // Update the reactive index with the new value
        data.index = newIndex;
    };

    /**
     * This method is fired when the slider is being dragged.
     * It is responsible for firing other methods to
     * maintain accurate state. i.e Updating the index
     */
    const onMove = () => {
        updateIndex();
    };

    /**
     * This method is fired at the end of a Drag event. It is responsible
     * for ensuring the slider lands in a suitable resting place
     */
    const onComplete = () => {
        data.instance.update();

        updateIndex();

        if (options.loop) {
            moveTo(data.index, true);
        }
    };

    /**
     * This method is fired on each resize event (debounced to 300ms).
     * It is responsible for ensuring the Sliders variables, values and visual state
     * remains stable at all breakpoints
     */
    const onResize = () => {
        // Fetch new snap positions
        updateSnapPositions();

        // Fetch new bounds
        updateBounds();
    };

    /**
     * Used to debounce resize events - too many too quickly
     * will result in lots of unnecessary, heavy calculations
     */
    const onDebouncedResize = useDebounceFn(onResize, options.debounce.resize);

    /**
     * Initialiser function - this is only fired when necessary values
     * in the params object have actual values
     */
    const init = () => {
        // Create the Draggable instance on the wrapper with some sensible defaults
        Draggable.create(params.wrapper.value, {
            type: 'x',
            inertia: true,
            dragResistance: options.resistance.drag,
            edgeResistance: options.resistance.edge,
            lockAxis: true,
            onMove: useDebounceFn(onMove, options.debounce.move),
            onThrowUpdate: useDebounceFn(onMove, options.debounce.throw),
            onThrowComplete: onComplete,
            zIndexBoost: false,
            maxDuration: 0.6,
        });

        data.instance = Draggable.get(params.wrapper.value);

        // Trigger resize on inital mount to update variables
        onResize();

        // Watch all future resize events using the debounced function
        window.addEventListener('resize', onDebouncedResize);
    };

    // Clean up before destroying
    onBeforeUnmount(() => {
        // If available, kill the draggable instance
        if (data.instance && data.instance.enabled) {
            data.instance.kill();
        }

        // Remove the debounced resize listener
        window.removeEventListener('resize', onDebouncedResize);
    });

    return {
        index: computed(() => data.index),
        realIndex,
        items,
        limit,
        moveTo,
    };
}
