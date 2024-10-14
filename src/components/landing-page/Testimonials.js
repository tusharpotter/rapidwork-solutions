import React from "react";
import style from "./Testimonials.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import { GoQuote } from "react-icons/go";

const COLORS = ["#6ad12e", "#2222C9", "#A82C70", "#DE43F9", "#CD46B6", "#F9A240"];

const TESTIMONIALS = [
  {
    body: "I was able to get my website developed and delivered on time thanks to Rapidwork Solutions. The team is very helpful and listens to the needs of tier clients thoroughly.",
    name: "Bogdan Baican",
  },
  {
    body: "Using digital marketing, Rapidwork Solutions developed websites that have grown steadily since then, in part due to its ability to reach our business goals. They take the time to understand client needs and provide them with smart, professional solutions.",
    name: "Mihaela Feraru",
  },
  {
    body: "I contacted this team through referrals. After experiencing with efforts and dedication towards the work, I must say that Rapidwork Solutions need to applaud the hard work.",
    name: "Arshad Alam",
  },
  {
    body: "The commitment, responsiveness, and friendliness of the team are commendable. They maintain professionalism and deliver their work with excellent quality at a given time.",
    name: "Monica Luliania",
  },
  {
    body: "I have enjoyed working with them, and they always respond to my problems in a timely manner. The team of Rapidwork Solution reduced downtime significantly by resolving a major problem within a short period of time.",
    name: "Albert Richard",
  },
  {
    body: "The Rapidwork Solution possesses a great understanding of each and every factor of the project. The website design team used all of its efforts to give the site the biggest boost and provide outstanding results.",
    name: "Cosmin Zutza",
  },
];

SwiperCore.use([Pagination, Autoplay]);
export default function Testimonials() {
  return (
    <Swiper
      navigation={false}
      pagination={{ clickable: true }}
      slidesPerView={"auto"}
      spaceBetween={50}
      className={style.wrapper}
      allowTouchMove={true}
      speed={1000}
    >
      {TESTIMONIALS.map(({ body, name }, index) => (
        <SwiperSlide className={style.slide}>
          <article>
            <span>
              <GoQuote color={COLORS[index % 6]} />
            </span>
            <div className={style.body}>{body}</div>
            <div className={style.footer}>{name}</div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
