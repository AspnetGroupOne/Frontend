import React, { useEffect, useState } from 'react';
import '../../stylings/Terms.css';
import { EVENT_TERMS_SERVICE } from '../../utils/serviceConfig';


const TermsComp = ({ id, reloadData }) => {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  const getData = async () => {
    try {
      const res = await fetch(
        `${EVENT_TERMS_SERVICE.URL}/api/Terms/${id}`,
        {
          headers: {
            'X-API-KEY': EVENT_TERMS_SERVICE.API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
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

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [id, reloadData]);

  if (isLoading) return <p>Loading terms...</p>;
  if (!termsData?.section?.length) return <p>No terms available for this event.</p>;

  return (
    <div className='comp-terms-background'>
      <header className='comp-terms-header'>
        <h6>Terms &amp; Conditions</h6>
      </header>
      {termsData.section
        .sort((a, b) => a.order - b.order)
        .map((section, idx) => (
          <div className='comp-terms-wrapper' key={idx}>
            <h3 className='comp-terms-text-header'>
              {idx + 1}. {section.header}
            </h3>
            <p className='comp-terms-text'>
              {section.lines.map((line, i) => (
                <span key={i}>- {line}<br/></span>
              ))}
            </p>
          </div>
        ))}
    </div>
  );
};

export default TermsComp;
