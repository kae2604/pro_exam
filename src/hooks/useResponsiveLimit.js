import { useState, useEffect } from 'react';

export const useResponsiveLimitPreviewCategory = () => {

    const [limit, setLimit] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 990) {
                setLimit(2);
            } else if (width < 1320) {
                setLimit(3);
            } else {
                setLimit(4);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return limit;
};



export const useResponsiveLimitCategoryPage = () => {
    const [limit, setLimit] = useState(9);

    useEffect(() => {
        const handleResize = () => {
            setLimit(window.innerWidth <= 1300 ? 6 : 9);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return limit;
};