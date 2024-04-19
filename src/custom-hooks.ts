import { useEffect, useCallback, useRef, Dispatch, MutableRefObject } from 'react';

interface DataType {
    page: number;
}

type ActionType = { type: "STACK_IMAGES"; images: { author: string, download_url: string }[] } | { type: "FETCHING_IMAGES"; fetching: boolean };

interface DispatchType {
    type: string;
}


// make API calls and pass the returned data via dispatch
export const useFetch = (data: DataType, dispatch: Dispatch<ActionType>) => {
    useEffect(() => {
        dispatch({ type: 'FETCHING_IMAGES', fetching: true })
        fetch(`https://picsum.photos/v2/list?page=${data.page}&limit=10`)
            .then(data => data.json())
            .then(images => {
                dispatch({ type: 'STACK_IMAGES', images })
                dispatch({ type: 'FETCHING_IMAGES', fetching: false })
            })
            .catch(e => {
                // handle error
                dispatch({ type: 'FETCHING_IMAGES', fetching: false })
                return e;
            })
    }, [dispatch, data.page])
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef: MutableRefObject<Element | null>, dispatch: (action: DispatchType) => void) => {
    const scrollObserver = useCallback(
        (node: Element) => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        dispatch({ type: 'ADVANCE_PAGE' });
                    }
                });
            }).observe(node);
        },
        [dispatch]
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
}

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector: string, items: { author: string, download_url: string }[]) => {
    const imgObserver = useCallback((node: HTMLImageElement) => {
        const intObs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.intersectionRatio > 0) {
                    const currentImg = en.target as HTMLImageElement;
                    const newImgSrc = currentImg.dataset.src;

                    // only swap out the image source if the new url exists
                    if (!newImgSrc) {
                        console.error('Image source is invalid');
                    } else {
                        currentImg.src = newImgSrc;
                    }
                    intObs.unobserve(node);
                }
            });
        })
        intObs.observe(node);
    }, []);

    const imagesRef: React.MutableRefObject<NodeListOf<HTMLImageElement> | null> = useRef(null);

    useEffect(() => {
        imagesRef.current = document.querySelectorAll(imgSelector);

        if (imagesRef.current) {
            imagesRef.current.forEach(img => imgObserver(img));
        }
    }, [imgObserver, imagesRef, imgSelector, items])
}