import React from 'react';
import "./faq.scss"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useGetFaqsQuery} from "@store/api/faqAPI.js"
import PropTypes from 'prop-types';

const Faq = ({id}) => {

    const skipValue = id > 240 ? 0 : id;
    const { data: faqList, isLoading, error } = useGetFaqsQuery(skipValue);

    if (isLoading) return <div className="container">Loading FAQ...</div>;
    if (error) return <div className="container">Error loading data</div>;

    return (
        <div className="container">
            <div className="faq_container">

                {faqList?.posts?.map((item) => (
                    <Accordion key={item.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${item.id}-panel1-content`}
                            id={`${item.id}-panel1-header`}
                        >
                            <Typography component="span">{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.body}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

Faq.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Faq;