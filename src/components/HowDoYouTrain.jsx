import HowDoYouTrainCard from "./HowDoYouTrainCard"

function HowDoYouTrain({ cardData, headLine }) {
  return (
    <>
      <div className="py-10 px-3 font-Monts">
        <h1 className='uppercase font-bold text-xl'> {headLine} </h1>

        <div className="flex gap-2 overflow-x-scroll scrollbar-hide">
          {cardData?.map((card, index) => (
            <HowDoYouTrainCard key={index} image={card.image} title={card.title} gender={card.gender} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HowDoYouTrain
