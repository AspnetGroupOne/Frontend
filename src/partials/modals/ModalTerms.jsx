import React, { useEffect, useState } from 'react'
import "../../stylings/Terms.css";

// This modal is edited with the help of chatgpt.
// Shows a form which has textareas for each section in formData.
// Should show the found data if there is any.
const ModalTerms = ({ id, closeModal }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        "Ticket Purchase and Entry": '',
        "Security and Safety": '',
        "Code of Conduct": '',
        "Event Schedule and Changes": '',
        "Photography and Recording": '',
        "Health and Safety": '',
        "Liability": '',
    });
    
    const getData = async () => {
    try {
        const res = await fetch(`https://eventtermsservice-d8hghqfbekhhbha8.swedencentral-01.azurewebsites.net/api/Terms/${id}`);
        const data = await res.json();

        if (!data.success || !data.content) {
            setIsEdit(false);
        } else {
            const mapped = {};
            for (const section of data.content.section) {
                mapped[section.header] = section.lines.join('\n');
            }
            setFormData(mapped);
            setIsEdit(true);
        }
    } catch (error) {
        console.error("Something went wrong when fetching data.");
    } finally {
        setIsLoading(false);
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Adds the id and formdata to the payload. 
        const submitPayload = {
            eventId: id,
            section: Object.entries(formData).map(([header, text], index) => ({
                header,
                order: index,
                lines: text.split('\n') // Splits textarea input into lines
            }))
        };

        try {
            const url = 'https://eventtermsservice-d8hghqfbekhhbha8.swedencentral-01.azurewebsites.net/api/Terms/';
            // Depending on if isEdit is true or not, it will change the method. 
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitPayload)
            });

            if (res.ok) {
                console.log("Terms saved.");
                closeModal();
            } else try {
                const errorResponse = await res.json();
                console.error("Failed to save terms:", errorResponse);
            } catch (err) {
                const errorText = await res.text();
                console.error("Failed to save terms - raw:", errorText);
            }
        } catch (error) {
            console.error("Something went wrong when submitting terms for this event.");
        }
    };

    // Deals with the changes that are done in the textareas. Changs the value to the new data. 
    const handleChange = (section, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: value,
        }));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
    <>
        {isLoading ? (
            <div className='modal-terms'>Loading... </div>
        ) : (
            <>
                <div className='modal-terms'>
                    <header className='modal-terms-header'>
                        <h2>Event title</h2> 
                        <button className='btn btn-close-pink' onClick={() => closeModal()}>X</button>
                    </header>
                    <form onSubmit={handleSubmit}>
                        {Object.entries(formData).map(([section, value], index) => (
                            <div key={index}>
                                <h4 className='modal-terms-text'>{index + 1}. {section}</h4>
                                <textarea className='modal-terms-textarea' rows={4} cols={60} value={value} onChange={e => handleChange(section, e.target.value)} />
                            </div>
                        ))}
                        <button className='btn btn-pink' type="submit">Save Terms</button>
                    </form>
                </div>
            </>
        )}
    </>
);
}
export default ModalTerms;
