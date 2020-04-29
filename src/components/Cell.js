import React from 'react'

export default React.memo(function Cell({ contains }) {

    const getInsideElement = () => {
        switch (contains) {
            case 'man':
                return <img alt="man" src="/man.png" width="40" height="40" />
            case 'food':
                return <img alt="food" src="/food.svg" width="40" height="40" />
            default:
                return '';
        }
    }

    return (
        <span className="square">
            {getInsideElement()}
        </span>
    )
})