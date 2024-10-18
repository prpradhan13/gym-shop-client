import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import footerBlogImg from "/footerImg/blog.webp"
import footerEmailImg from "/footerImg/newsletter__1_.webp"
import footerGymsharkImg from "/footerImg/new_training_app_footer.webp"
import PaymentCardComp from "./PaymentCardComp";

function Footer() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
    <div className="px-3 font-Monts mt-5">
      <hr className="bg-[#4f4f4f]"/>
      <div className="py-5 flex justify-between">
        <div className="">
          <h1 className="font-bold uppercase"> help </h1>
          <div className={`${expandedSection === "help" ? "block font-semibold capitalize text-[#4f4f4f] pt-3" : "hidden"}`}>
            <h1> FAQ </h1>
            <h1> delivery information </h1>
            <h1> returns policy </h1>
            <h1> make a return </h1>
            <h1> orders </h1>
            <h1> submit a fake </h1>
          </div>
        </div>
        <FaPlus onClick={() => toggleExpand("help")} className={`${expandedSection === "help" ? "hidden" : "block cursor-pointer"}`} />
        <FaMinus onClick={() => toggleExpand("help")} className={`${expandedSection === "help" ? "block cursor-pointer" : "hidden"}`} />
      </div>

      <hr className="bg-[#4f4f4f]"/>
      <div className="py-5 flex justify-between">
        <div className="">
          <h1 className="font-bold uppercase"> my account </h1>
          <div className={`${expandedSection === "my account" ? "block font-semibold capitalize text-[#4f4f4f] pt-3" : "hidden"}`}>
            <h1> login </h1>
            <h1> register </h1>
          </div>
        </div>
        <FaPlus onClick={() => toggleExpand("my account")} className={`${expandedSection === "my account" ? "hidden" : "block cursor-pointer"}`} />
        <FaMinus onClick={() => toggleExpand("my account")} className={`${expandedSection === "my account" ? "block cursor-pointer" : "hidden"}`} />
      </div>

      <hr className="bg-[#4f4f4f]"/>
      <div className="py-5 flex justify-between">
        <div className="">
          <h1 className="font-bold uppercase"> pages </h1>
          <div className={`${expandedSection === "pages" ? "block font-semibold capitalize text-[#4f4f4f] pt-3" : "hidden"}`}>
            <h1> carrers </h1>
            <h1> gymshark central </h1>
            <h1> about us </h1>
            <h1> student discount </h1>
            <h1> factory list </h1>
          </div>
        </div>
        <FaPlus onClick={() => toggleExpand("pages")} className={`${expandedSection === "pages" ? "hidden" : "block cursor-pointer"}`} />
        <FaMinus onClick={() => toggleExpand("pages")} className={`${expandedSection === "pages" ? "block cursor-pointer" : "hidden"}`} />
      </div>

      <hr className="bg-[#4f4f4f]"/>

      <div className="py-5">
        <h1 className="font-bold uppercase pb-3">more about gymshark</h1>
        <div className="w-full flex flex-nowrap gap-2 text-sm overflow-x-scroll scrollbar-hide">
          <div className="">
            <figure className="w-[40vw]">
              <img src={footerBlogImg} alt="footerBlogImg" className="" />
              <figcaption className="uppercase px-3 py-2 font-semibold bg-[#d8d8d8]"> blog </figcaption>
            </figure>
          </div>

          <div className="">
            <figure  className="w-[40vw]">
              <img src={footerEmailImg} alt="footerBlogImg" className="" />
              <figcaption className="uppercase px-3 py-2 font-semibold bg-[#d8d8d8]"> Email sign up </figcaption>
            </figure>
          </div>

          <div className="">
            <figure className="w-[40vw]">
              <img src={footerGymsharkImg} alt="footerBlogImg" className="" />
              <figcaption className="uppercase px-3 py-2 font-semibold bg-[#d8d8d8]"> gymshark training </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="grid place-items-center text-sm font-semibold gap-2 py-5 text-[#4b4b4b]">
        <h1>Terms and Conditions</h1>
        <h1>Terms of Use</h1>
        <h1>Privacy Notice</h1>
        <h1>Cookie Policy</h1>
        <h1>Modern Slavery</h1>
      </div>

      <PaymentCardComp />

      <hr className="bg-[#4f4f4f]"/>

      <div className="text-center p-3 text-xs font-bold text-[#4b4b4b]">
        © 2024 | Gymshark Limited | All Rights Reserved. | United We Sweat
      </div>
    </div> 
    </>
  )
}

export default Footer
