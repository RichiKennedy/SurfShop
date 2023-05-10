import React from 'react'
import './Contact.scss'

const Contact = () => {
  return (
    <section className='contact'>
        <div className="contact-wrapper">
            <span> get in touch </span>
            <div className="mail">
                <input type='text' placeholder='Enter your e-mail...'></input>
                <button> Howdy </button>
            </div>
        </div>  
    </section>
  )
}

export default Contact