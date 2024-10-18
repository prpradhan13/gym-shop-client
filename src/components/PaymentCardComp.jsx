import VisaFooterImg from "/footerImg/visa.webp"
import MastercardFooterImg from "/footerImg/mastercard-card.webp"
import AmExpFooterImg from "/footerImg/amex-card.webp"
import ApplepayFooterImg from "/footerImg/applepay-card.webp"
import PaypalFooterImg from "/footerImg/paypal-card.webp"

function PaymentCardComp() {
  return (
    <div className="my-5 grid place-items-center">
        <figure className=" h-[4vh] flex gap-2">
          <img src={VisaFooterImg} alt="" className="" />
          <img src={MastercardFooterImg} alt="" />
          <img src={AmExpFooterImg} alt="" />
          <img src={PaypalFooterImg} alt="" />
          <img src={ApplepayFooterImg} alt="" />
        </figure>
    </div>
  )
}

export default PaymentCardComp
