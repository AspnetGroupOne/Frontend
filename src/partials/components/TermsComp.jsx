import React, { useEffect, useState } from 'react';
import '../../stylings/Terms.css'

// Made with help from chatgpt just to get it done.
const TermsComp = ({ id, reloadData }) => {
    const [termsData, setTermsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const res = await fetch(`https://eventtermsservice-d8hghqfbekhhbha8.swedencentral-01.azurewebsites.net/api/Terms/${id}`);
            const json = await res.json();
            if (!json.success || !json.content || !Array.isArray(json.content.section)) {
                console.error("No valid terms data found.");
                setTermsData(null);
            } else {
                setTermsData(json.content);
            }
        } catch (error) {
            console.error("Something went wrong when fetching the terms.", error);
            setTermsData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Runs once at open and then everytime reloadData changes value.
    useEffect(() => {
        getData();
    }, [reloadData]);

    // Will show a message while loading.
    if (isLoading) return <p>Loading terms...</p>;
    // Will show a message if no terms are found.
    if (!termsData || !termsData.section?.length) return <p>No terms available for this event.</p>;

    return (
        <>
            <div className='comp-terms-background'>
                <header className='comp-terms-header'><h6>Terms & Conditions</h6></header>
                {termsData.section.sort((a, b) => a.order - b.order).map((section, index) => (
                    <div className='comp-terms-wrapper' key={index}>
                        <h3 className='comp-terms-text-header'>{index + 1}. {section.header}</h3>
                        <p className='comp-terms-text'>{section.lines.map((line, i) => ( <span key={i}>- {line}<br /></span> ))} </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TermsComp;
