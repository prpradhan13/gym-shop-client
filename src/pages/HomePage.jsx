import FeatureProdComp from "../components/FeatureProdComp";
import HomeBGImgComp from "../components/HomeBGImgComp";
import firstMainHomeImg from "/bannerImgs/first_home_large.avif"
import firstMobileHomeImg from "/bannerImgs/first_home_mob.avif"
import secMainHomeImg from "/bannerImgs/nothing_large_screen.avif";
import secMobileHomeImg from "/bannerImgs/nothing_but_best.avif";
import HowDoYouTrain from "../components/HowDoYouTrain";
import LiftingImg from "/extraImgs/lifting_img.avif"
import RunningImg from "/extraImgs/running_img.avif"
import YogaImg from "/extraImgs/yoga_img.avif"
import HitImg from "/extraImgs/hit_img.avif"
import FunctionalImg from "/extraImgs/functional_img.avif"

function HomePage() {
  return (
    <>
      <HomeBGImgComp
        mainImg={firstMainHomeImg}
        mobileBgImg={firstMobileHomeImg}
        bannerName={"NEW STUFF JUST DROPPED"}
        bannerCate={"new appearals"}
        bannerPara={
          "We all know you're gonna be wearing these next time you go gym. Might as well grab them now."
        }
        bannerBtn1={"shop women"} // For Women
        bannerBtn2={"shop men"} // For Men
      />
      <FeatureProdComp featureName={"new appearals"}/>

      <HomeBGImgComp 
        mainImg={secMainHomeImg} 
        mobileBgImg={secMobileHomeImg}
        bannerName={"nothing but best"}
        bannerCate={"bestseller"}
        bannerPara={
          "They're called bestsellers for a reason."
        }
        bannerBtn1={"shop women"}
        bannerBtn2={"shop men"}
      />
      <FeatureProdComp featureName={"bestseller"}/>

      <HowDoYouTrain 
        cardData={[
          { image: LiftingImg, title: "lifting" },
          { image: RunningImg, title: "running" },
          { image: YogaImg, title: "yoga" },
          { image: HitImg, title: "hiit" },
          { image: FunctionalImg, title: "functional" },
        ]}
        headLine={"how do you train?"}
      />
    </>
  );
}

export default HomePage;
