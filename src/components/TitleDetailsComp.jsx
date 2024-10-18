import React from 'react'

function TitleDetailsComp({ headLine, paraLine }) {
  return (
    <div className="w-full h-[40vh] flex flex-col justify-center gap-1">
        <h1 className="text-4xl font-Monts font-extrabold uppercase text-center">
          { headLine }
        </h1>
        <p className="text-center p-5">
          { paraLine }
        </p>
    </div>
  )
}

export default TitleDetailsComp
