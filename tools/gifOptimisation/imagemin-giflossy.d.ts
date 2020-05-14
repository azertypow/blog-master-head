import { Plugin } from 'imagemin';

declare function imageminGiflossy(options?: imageminGiflossy.Options): Plugin

declare namespace imageminGiflossy {
  interface Options {
    /**
     * Default: false
     *
     * Interlace gif for progressive rendering.
     */
    interlaced?: boolean


    /**
     * Select an optimization level between 1 and 3.
     *
     * The optimization level determines how much optimization is done; higher levels take longer, but may have better results.
     *
     * 1. Stores only the changed portion of each image.
     *
     * 2. Also uses transparency to shrink the file further.
     *
     * 3. Try several optimization methods (usually slower, sometimes better results)
     */
    optimizationLevel?: number


    /**
     * Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.
     */
    colors?: number


    /**
     * Default: undefined
     *
     * Order pixel patterns to create smaller GIFs at cost of artifacts and noise.
     * Adjust lossy argument to quality you want (30 is very light compression, 200 is heavy).
     *
     * It works best when only little loss is introduced, and due to limitation of the compression algorithm very high loss levels won't give as much gain.
     *
     * e.g.:
     *  imageminGiflossy({ lossy: 80 });
     */
    lossy?: Number


    /**
     * Default: undefined
     *
     * Resize the output GIF to widthxheight.
     *
     * e.g.:
     * imageminGiflossy({ resize: '300x200' });
     */
    resize: string


    /**
     * Default: false
     *
     * Sets the output logical screen to the size of the largest output frame.
     *
     * e.g.:
     *
     * imageminGiflossy({ noLogicalScreen: true });
     */
    noLogicalScreen: boolean


    /**
     *
     * Default: mix

     * Set the method used to resize images.
     *
     * e.g.:
     *
     * imageminGiflossy({ resizeMethod: 'sample' });
     */
    resizeMethod: string


    /**
     *Default: diversity
     *
     * Determine how a smaller colormap is chosen.
     *
     * e.g.:
     *
     * imageminGiflossy({ colorMethod: 'blend-diversity' });
     */
    colorMethod: string


    /**
     *Default: 1
     *
     * Optimize output GIF animations for space.
     *
     * There are currently three levels:
     *
     * 1: Stores only the changed portion of each image. This is the default.
     *
     * 2: Also uses transparency to shrink the file further.
     *
     * 3: Try several optimization methods (usually slower, sometimes better results).
     *
     * Other optimization flags provide finer-grained control.
     *
     *keep-empty: Preserve empty transparent frames (they are dropped by default).
     *
     * e.g.:
     *
     * imageminGiflossy({ optimize: '3' });
     */
    optimize?: string

    /**
     * Default: false
     *
     * Unoptimize GIF animations into an easy-to-edit form.
     *
     * e.g.:
     *
     * imageminGiflossy({ unoptimize: true });
     */
    unoptimize?: boolean

  }

}

export = imageminGiflossy;
