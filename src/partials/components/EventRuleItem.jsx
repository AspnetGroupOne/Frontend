import React, { useEffect, useState } from 'react'

const EventRuleItem = ({ object }) => {
    const [item, setItem] = useState(object.key)
    const [link, setLink] = useState()
    const [altText, setAltText] = useState("")
    const [size, setSize] = useState()

    const setItems = () => {
        try{
            if (object.value){
                setLink(`/images/rules-icons/true/${item}.svg`)
                setAltText(`${item} is not allowed.`)
                setSize("rules-big-img")
            }
            else{
                setLink(`/images/rules-icons/false/${item}.svg`)
                setAltText(`${item} is allowed.`)
                setSize("rules-small-img")
            }
        }
        catch (error){
            console.error("Something went wrong when setting the rules.")
        }
    }
    const capitalizeLetter = (text) => {
        const capText = (text.slice(0,1).toUpperCase() + text.slice(1, text.length))
        return capText;
    }

    useEffect(() => {
        setItems()
    }, [object])

    return (
        <div className='rules-component-img'>
            <img className={`${size}`} src={link} alt={altText} />
            <p className='rules-component-img-text'>{capitalizeLetter(item)}</p>
        </div>
    )
}

export default EventRuleItem