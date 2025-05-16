import React from 'react'

const Container = ({children,className}) => {
  return (
    <section className={className}>
         <div className="container">
            <div className=" my-2 p-2">
                {children}
               
            </div>
        </div>
    </section>
  )
}

export default Container
