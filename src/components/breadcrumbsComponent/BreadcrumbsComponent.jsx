import React, { useEffect, useState } from 'react';
import "./breadcrumbsComponent.scss";
import { useLocation, useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseAPI } from "@store/api/baseAPI";
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const clearBreadcrumbsHistory = () => {
    sessionStorage.removeItem('breadcrumbs_referer_path');
    sessionStorage.removeItem('prev_breadcrumbs_list');
    sessionStorage.removeItem('last_catalog_label');
    sessionStorage.removeItem('last_catalog_path');
};

const BreadcrumbsComponent = () => {
    const location = useLocation();
    const { category, id } = useParams();
    const [crumbs, setCrumbs] = useState([]);

    const product = useSelector((state) => {
        if (!id) return null;
        const queryKey = `getProductById("${id}")`;
        return state[baseAPI.reducerPath]?.queries[queryKey]?.data;
    });

    const formatLabel = (string) => {
        if (!string) return '';
        return string
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const newCrumbs = [];

        newCrumbs.push(
            <Link component={RouterLink} underline="hover" key="home" color="inherit" to="/">
                Home
            </Link>
        );

        if (!location.pathname.includes('/cart')) {
            sessionStorage.setItem('breadcrumbs_referer_path', location.pathname);

            if (location.pathname.startsWith('/category') && !id) {
                const labelFromState = location.state?.crumbLabel;
                const finalLabel = labelFromState ? labelFromState : (category ? formatLabel(category) : 'All Products');

                newCrumbs.push(<Typography key="cat-label" sx={{ color: 'text.primary' }}>{finalLabel}</Typography>);
                sessionStorage.setItem('last_catalog_label', finalLabel);
                sessionStorage.setItem('last_catalog_path', location.pathname);
                sessionStorage.setItem('prev_breadcrumbs_list', JSON.stringify([{ label: finalLabel, path: location.pathname }]));
            }
            else if (id) {
                const savedCatalogLabel = sessionStorage.getItem('last_catalog_label') || 'All Products';
                const savedCatalogPath = sessionStorage.getItem('last_catalog_path') || '/category';

                newCrumbs.push(
                    <Link component={RouterLink} underline="hover" key="product-parent-catalog" color="inherit" to={savedCatalogPath} state={{ crumbLabel: savedCatalogLabel }}>
                        {savedCatalogLabel}
                    </Link>
                );

                const productTitle = product?.title || 'Loading...';
                newCrumbs.push(<Typography key="product-title" sx={{ color: 'text.primary', fontWeight: 500 }}>{productTitle}</Typography>);
                sessionStorage.setItem('prev_breadcrumbs_list', JSON.stringify([{ label: savedCatalogLabel, path: savedCatalogPath }, { label: productTitle, path: location.pathname }]));
            }
            else {
                const labelFromState = location.state?.crumbLabel;
                const finalLabel = labelFromState ? labelFromState : formatLabel(location.pathname.replace('/', ''));
                newCrumbs.push(<Typography key="generic-label" sx={{ color: 'text.primary' }}>{finalLabel}</Typography>);
                sessionStorage.setItem('prev_breadcrumbs_list', JSON.stringify([{ label: finalLabel, path: location.pathname }]));
            }
        }
        else {
            const savedPaths = JSON.parse(sessionStorage.getItem('prev_breadcrumbs_list') || "[]");
            savedPaths.forEach((item, idx) => {
                newCrumbs.push(
                    <Link component={RouterLink} underline="hover" key={`saved-link-${idx}`} color="inherit" to={item.path} state={item.path.startsWith('/category') ? { crumbLabel: item.label } : undefined}>
                        {item.label}
                    </Link>
                );
            });
            newCrumbs.push(<Typography key="cart" sx={{ color: 'text.primary', fontWeight: 500 }}>Cart</Typography>);
        }

        setCrumbs(newCrumbs);
    }, [location, id, product, category]);

    return (
        <div className="container">
            <div className="section_line"></div>
            <div className="breadcrumbsComponent_container">
                <MUIBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {crumbs}
                </MUIBreadcrumbs>
            </div>
        </div>
    );
};

export default BreadcrumbsComponent;