import React from 'react'

const Dropdown = ({ title, options, func }) => {
    return (
        <div className='select'>
            <select onChange={func} name='format' id='format'>
                <option value="0">
                    {title}
                </option>
                {options.map((item, index) => ( 
                    <option key={index} value={item} >
                        {item.toUpperCase()}
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default Dropdown