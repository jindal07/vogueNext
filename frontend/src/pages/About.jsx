import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 ">
        <Title text1={"About"} text2={"Us"} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10">
          {/* Left side */}
          <div>
            <img className=" w-60 sm:w-90" src={assets.about_img} alt="" />
          </div>
          {/* Right side */}
          <div className="text-gray-700 text-start text-sm sm:text-[17px] w-full sm:w-[60%]">
            <p className="my-2">
              VogueNext was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p className="my-2">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <p className="my-2 font-bold">Our Mission</p>
            <p className="my-2">
              Our mission at VogueNext is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
        <hr className="my-4 sm:hidden"/>
        <div className="flex flex-col mt-8">
          <Title text1={"Our"} text2={"Vision"} />
          <div className="flex flex-col sm:flex-row pt-5 ">
            <div className="py-3 px-8 border border-gray-300 h-50 justify-center flex flex-col">
              <b className="mb-3 text-sm">Quality Assurance:</b>
              <p className="text-gray-600 text-xs">
                We meticulously select and vet each product to ensure it meets
                our stringent quality standards.
              </p>
            </div>
            <div className="py-3 px-8 border border-gray-300 h-50 justify-center flex flex-col">
              <b className="mb-3 text-sm">Customer-Centric Approach:</b>
              <p className="text-gray-600 text-xs">
                Our customers are at the heart of everything we do. We listen to
                their feedback and continuously improve our services to meet
                their needs.
              </p>
            </div>
            <div className="py-3 px-8 border border-gray-300 h-50 justify-center flex flex-col">
              <b className="mb-3 text-sm">Convenience:</b>
              <p className="text-gray-600 text-xs">
                Our platform is designed to make shopping easy and enjoyable.
                With user-friendly navigation, personalized recommendations, and
                a seamless checkout process, we strive to provide a hassle-free
                experience for our customers.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <NewsLetter/>
        </div>
        
      </div>
    </div>
  );
}

export default About;
