import HomeBGImgComp from "../components/HomeBGImgComp";
import womenLeggingsBannerMob from "/bannerImgs/leggings_banner_mob.avif";
import womenLeggingsBannerDesk from "/bannerImgs/leggings_banner.avif";
import womenVitalBannerDesk from "/bannerImgs/vital_image_Desktop.avif";
import womenVitalBannerMob from "/bannerImgs/vital_W_image.avif";
import HowDoYouTrain from "../components/HowDoYouTrain";
import LiftingWomenImg from "/bannerImgs/lifting_W_image.avif";
import RestWomenImg from "/bannerImgs/rest_W_image.avif";
import RunWomenImg from "/bannerImgs/run_W_image.avif";
import ClassesWomenImg from "/bannerImgs/class_W_image.avif";
import EverydaySLWomenImg from "/bannerImgs/everyday_seamless_W.avif";
import ElevetWomenImg from "/bannerImgs/elevet_W_image.avif";
import LiftSLWomenImg from "/bannerImgs/lift_seamless_W.avif";
import AdaptSLWomenImg from "/bannerImgs/adapt_seamless_W.avif";
import ActiveSLWomenImg from "/bannerImgs/active_seamless_W.avif";
import CrossoverWomenImg from "/bannerImgs/crossover_W.avif";
import PowerWImg from "/bannerImgs/power_W.avif";
import LegacyWImg from "/bannerImgs/legacy_W.avif";
import GainsWImg from "/bannerImgs/gains_seamless_W.avif";
import AdaptWImg from "/bannerImgs/adapt_safari_W.avif";
import HighwaistWImg from "/bannerImgs/highWaisted_W.avif";
import FlaresWImg from "/bannerImgs/flares_W.avif";
import MeshWImg from "/bannerImgs/mesh_W.avif";
import PocketWImg from "/bannerImgs/pocket_W.avif";
import TitleDetailsComp from "../components/TitleDetailsComp";

function LeggingsPage() {
  return (
    <>
      <HomeBGImgComp
        mainImg={womenLeggingsBannerDesk}
        mobileBgImg={womenLeggingsBannerMob}
        bannerName={"the leggings guide"}
        bannerPara={"Finally find the leggings you've been looking for."}
      />
      
      <TitleDetailsComp 
        headLine={"how are you training?"} 
        paraLine={"Whether you're after a squat-proof design for lifting, running leggings with pockets, or some super soft yoga leggings, take a look through our leggings guide and find your perfect match."} 
        />

      <HomeBGImgComp
        mainImg={womenVitalBannerDesk}
        mobileBgImg={womenVitalBannerMob}
        bannerName={"do it all"}
        bannerPara={
          "Get you leggings that can do…everything. Vital's stay-put waistband, sweat-wicking tech and comfy seamless design is gonna tick all your boxes."
        }
        bannerBtn1={"shop vital"}
        bannerBtn2={""}
        bannerCate={"vital"}
      />

      <HowDoYouTrain
        cardData={[
          { image: LiftingWomenImg, title: "lifting", gender: "women" },
          { image: RestWomenImg, title: "rest day", gender: "women" },
          { image: RunWomenImg, title: "running", gender: "women"  },
          { image: ClassesWomenImg, title: "yoga", gender: "women"  },
        ]}
      />

      <TitleDetailsComp 
        headLine={"the bestsellers"}
        paraLine={"Loved by the Gymshark community, and soon to be loved by you (obviously). These are our PBs to help you reach yours."}
      />

      <HowDoYouTrain
        cardData={[
          { image: EverydaySLWomenImg, title: "everyday seamless", gender: "women" },
          { image: ElevetWomenImg, title: "elevate", gender: "women" },
          { image: LiftSLWomenImg, title: "lifting", gender: "women"  },
          { image: AdaptSLWomenImg, title: "adapt seamless", gender: "women"  },
          { image: ActiveSLWomenImg, title: "active seamless", gender: "women"  },
          { image: CrossoverWomenImg, title: "crossover", gender: "women"  },
        ]}
      />

      <TitleDetailsComp
        headLine={"scrunch butt leggings"}
        paraLine={"IYKYK. Meet our leggings that lift, sculpt and contour to make your glutes pop."}
      />

      <HowDoYouTrain
        cardData={[
          { image: PowerWImg, title: "power", gender: "women" },
          { image: LegacyWImg, title: "legacy", gender: "women" },
          { image: GainsWImg, title: "gains seamless", gender: "women"  },
          { image: AdaptWImg, title: "adapt safari", gender: "women"  },
        ]}
      />

      <TitleDetailsComp 
        headLine={"it's all in the details"}
        paraLine={"Whether you’re looking for comfy seamless leggings, high-waisted waistbands that actually stay in place, or just some leggings with pockets (pls), here are alllll the features that are gonna work for you."}
      />

      <HowDoYouTrain
        cardData={[
          { image: PocketWImg, title: "pockets", gender: "women" },
          { image: HighwaistWImg, title: "high waisted", gender: "women" },
          { image: FlaresWImg, title: "flares", gender: "women"  },
          { image: MeshWImg, title: "mesh", gender: "women"  },
        ]}
      />
    </>
  );
}

export default LeggingsPage;
