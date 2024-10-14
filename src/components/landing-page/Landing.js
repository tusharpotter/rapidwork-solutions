import React, { useState } from "react";
import style from "./Landing.module.scss";

import { HashLink } from "react-router-hash-link";
import { Divide as Hamburger } from "hamburger-react";

import HeroImg from "assets/images/hero.svg";
import Logo from "assets/images/logo.png";

import marketing from "assets/images/marketing.jpg";
import business from "assets/images/business.jpg";
import sde from "assets/images/sde.png";
import dataentry from "assets/images/dataentry.png";

import clsx from "clsx";
import ServiceModal from "./ServiceModal";
import Testimonials from "./Testimonials";
import WithPadding from "./WithPadding";

const SERVICES = [
  {
    title: "Software Development Services",
    descSummary: `Web development services facilitate the development of all kinds of web-based software
              and assure a great experience for web users. At Rapidwork Solutions, we professionally
              design, redesign, and perpetually aid client-facing and business web apps to attain
              high adoption and conversion rates. We offer services such as ongoing website
              maintenance, WordPress support, logo design, hosting, ad design, social media
              management, search engine optimization, and more. We offer perpetual assistance in
              proactive ...`,
    fullBody: [
      `Web development services facilitate the development of all kinds of web-based software and assure a great experience for web users. At Rapidwork Solutions, we professionally design, redesign, and perpetually aid client-facing and business web apps to attain high adoption and conversion rates. We offer services such as ongoing website maintenance, WordPress support, logo design, hosting, ad design, social media management, search engine optimization, and more. We offer perpetual assistance in proactive optimization and fast issue resolution, continuous software performance monitoring, safely adding new characteristics and integrators, and others. `,
      `We offer magnificent software development services for startups, small companies, and large companies. Through its custom web design, CMS website development, and responsive web design services, Rapidwork Solutions specializes in building customized web designing solutions. Our experts will help you in designing and developing a website design that assures you to commit to the visitors to the company immediately through your website.`,
      `As a professional software development company, we offer services that can be compared to no other web designing firm at an affordable price range. Our experts concentrate on the target audience's requirements to execute and outline the extent of the solution. They also bridge the gap between business stakeholders and the IT team to keep each involved party-aligned. We offer active and strong front-end and back-end functionality and give endless support through mail, chat, and phone for you to communicate anytime with our experts.`,
    ],
    image: sde,
  },
  {
    title: "Online Marketing Services",
    descSummary: `Web development services facilitate the development of all kinds of web-based software and assure a great experience for web users. At Rapidwork Solutions, we professionally design, redesign, and perpetually aid client-facing and business web apps to attain high adoption and conversion rates. We offer services such as ongoing website maintenance, WordPress support, logo design, hosting, ad design, social media management, search engine optimization, and more. We offer perpetual ... `,
    image: marketing,
    fullBody: [
      `Rapidwork Solutions has specialized and experienced experts that offer end-to-end SEO services and solutions to the companies. Our online marketing services involve optimization across search engines, email marketing communications, visibility and engagement on the social media platforms, and integrated applications to connect and engage with projects and consumers. Our experts scrutinize and examine each and every element of marketing such that you can get the best possible solution and assistance from us.`,
      `We facilitate our clients to attain the most out of the paid search campaign and enable them to obtain measurable and targeted website traffic. Our experts execute our competitive analysis against the rivals and facilities with the offerings such as keyword generation, ad copy, PPC Landing Page Creation, Ad Extensions, PPC Optimization, Tracking & Reporting. Our team has proven their experience across companies to bring quality leads and enhanced targeted traffic to clients' websites at a reasonable cost. `,
      `Our experts stimulate its consumers with the best Social Media Optimization (SMO) services to make the company more social and engage with a new society. We firmly believe that no company can succeed without being social, so we keep our services geared toward the latest trends in SMO. With our services, you can drive your business to the progressive level in an extremely affordable way and reach your desired goals in less time. `,
    ],
  },
  {
    title: "Data Entry & Process Outsourcing",
    descSummary: `Rapidwork Solutions maintains a vast number of experts who excel in data entry & process outsourcing. Data entry and processing services enable the firms to diminish operations costs by prominently diminishing infrastructure expenses. Our data entry and processing services help raise profits by focusing on fundamental business development despite data options. We offer an extensive range of information technology solutions assistance to firms around the UK and India, offering value ....`,
    image: dataentry,
    fullBody: [
      `Rapidwork Solutions maintains a vast number of experts who excel in data entry & process outsourcing. Data entry and processing services enable the firms to diminish operations costs by prominently diminishing infrastructure expenses. Our data entry and processing services help raise profits by focusing on fundamental business development despite data options. We offer an extensive range of information technology solutions assistance to firms around the UK and India, offering value respecting quality and assurance. `,
      `Our company's data entry services include capturing, digitizing, and processing information arising from various sources, including Web Forms, Emails, Fax, Scannable Images, and print hard copies. We provide accurate, error-free, and quick services in data entry for a variety of industries as a data entry provider with an in-house team of 100+ specialists, including dedicated editors, proofreaders, and manual data entry personnel. Our experts excel in offering data processing and management services supported by the stringent process of quality assurance.`,
      `We offer data processing services that fulfill universal standards respecting accuracy and precision with punctuality. Our expert will be able to speed up your document processing to an enormous extent, facilitating intuitive extraction of even small data points from your voluminous documents and tables, draping indexing, manual entry, and analysis to a great extent. You can grab our service at any hour of the day and clear your doubts directly from our experts to get the best out of our experts.`,
    ],
  },
  {
    title: "Business Planning & Research",
    descSummary: `Rapidwork Solutions offers personalized business planning and research services to their valuable clients. Our services facilitate our clients to maximize the influence of their investment. We have a considerable number of experts who offer our clients a mixture of technologies and strategies optimized in the hands of the right person. Our experts offer the solutions to get in touch with customer perceptions, current issues, and several other components you require for your business growth. ...`,
    image: business,
    fullBody: [
      `Rapidwork Solutions offers personalized business planning and research services to their valuable clients. Our services facilitate our clients to maximize the influence of their investment. We have a considerable number of experts who offer our clients a mixture of technologies and strategies optimized in the hands of the right person. Our experts offer the solutions to get in touch with customer perceptions, current issues, and several other components you require for your business growth.`,
      `Our experts offer business plan writing and development, plans for startup firms, business proposal evaluation, plan review, and business development planning services. We promise the best services to you with our exceptional strength of experienced business strategic planning team and years of experience in business development plans in the UK  and India. We are one of the best in the market due to our professional-made business plans. So, get the best ever business plan development services from our experts and make your business shine through the competition. `,
      `It is worthwhile to undertake industry market research when competing and building market share within a given industry so that you can keep a keen observation and better understand your competitors, clients, and suppliers to grow your organization's market share. By taking advantage of company research services, one can accumulate intelligence to compete. Rapidwork Solutions offer market research services to several segments of its consumer, specifically across India and the UK. Our experts deliver quality and informative industry research reports, facilitating fast decisions and maximizing productivity with greater precognition.`,
    ],
  },
];

const Landing = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeService, setActiveService] = useState(null);

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  function handleClickReadMore(service) {
    toggleModal();
    setActiveService(service);
  }

  function handleClickNav() {
    setIsNavbarOpen(false);
  }

  return (
    <div className={style.wrapper}>
      <WithPadding className={style.navbar}>
        <div className={style.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={style.navigationDesktop}>
          <div className={style.links}>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#home">
                <p>Home</p>
              </HashLink>
            </div>
            <div className={style.nav}>
              <HashLink smooth to="#about">
                <p>About Us</p>
              </HashLink>
            </div>
            <div className={style.nav}>
              <HashLink smooth to="#services">
                <p>Our Services</p>
              </HashLink>
            </div>
            <div className={style.nav}>
              <HashLink smooth to="#reviews">
                <p>Our Reviews</p>
              </HashLink>
            </div>
            <div className={style.nav}>
              <HashLink smooth to="#callback">
                <p>Contact Us</p>
              </HashLink>
            </div>
          </div>
        </div>

        <div className={style.navigationMobile}>
          <div className={style.hamburger}>
            <Hamburger toggled={isNavbarOpen} toggle={setIsNavbarOpen} />
          </div>
          <div className={clsx(style.links, isNavbarOpen && style.open)}>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#home">
                <p>Home</p>
              </HashLink>
            </div>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#about">
                <p>About Us</p>
              </HashLink>
            </div>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#services">
                <p>Our Services</p>
              </HashLink>
            </div>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#reviews">
                <p>Our Reviews</p>
              </HashLink>
            </div>
            <div onClick={handleClickNav} className={style.nav}>
              <HashLink smooth to="#callback">
                <p>Contact Us</p>
              </HashLink>
            </div>
          </div>
        </div>
      </WithPadding>

      <WithPadding id="home" className={style.hero}>
        <div className={style.heroText}>
          <div className={style.title}>
            <div>Welcome to</div>
            <div> Rapidwork Solutions</div>
          </div>
          <div className={style.subtitle}>
            We provide simplified IT solutions with Custom Software Development. Accountability .
            Integrity . Quality . Reliability
          </div>
          <div className={style.buttons}>
            <button>View Our Services</button>
            <button>Contact Us</button>
          </div>
        </div>
        <div className={style.heroImg}>
          <img src={HeroImg} alt="" />
        </div>
      </WithPadding>

      {/* <div className={style.aboutWrapper} id="about">
        <div className={style.aboutCard}>
          <div className={style.aboutImage}>
            <img src={carousel1} alt="" />
          </div>
          <div className={style.aboutText}>
            <p>
              Get to know about <span>Rapidwork solutions</span>
            </p>
            <p>Our Mission</p>
            <p>
              We believe in community growth and hence we at Rapidwork solutions have taken a
              resolution of serving the customers with easily accessible solutions.
            </p>
            <p>Our Vision</p>
            <p>
              We at Rapidwork soultions are looking forward to bringing a smile on every client’s
              face by helping them in Web development, Business planning, Data entry and online
              marketing guidance and mark ourself as the first choice of every Client.
            </p>
          </div>
        </div>
      </div> */}

      <WithPadding id="about" className={style.valuesWrapper}>
        <div className={style.header}>
          <p>
            About <span>Us</span>
          </p>
          <p>LOREM IPSUM DOLORET</p>
        </div>

        <div className={style.info}>
          <p>
            We believe in community growth and hence we at Rapidwork solutions have taken a
            resolution of serving the customers with easily accessible solutions. We at Rapidwork
            soultions are looking forward to bringing a smile on every client’s face by helping them
            in Web development, Business planning, Data entry and online marketing guidance and mark
            ourself as the first choice of every Client.
          </p>
        </div>

        <div className={style.infoCard}>
          <div className={style.row}>
            <div className={clsx(style.card, style.card1)}>
              <div className={style.body}>
                <div className={style.title}>Finest Work</div>
                <div className={style.content}>
                  We believe that meeting the requirements doesn’t depend on quantity, it depends on
                  quality. We ensure that each client receive individual attention and guidance.
                  This makes certain that the clients receive great services from us.
                </div>
              </div>
            </div>
            <div className={clsx(style.card, style.card2)}>
              <div className={style.body}>
                <div className={style.title}>Customer Ethics</div>
                <div className={style.content}>
                  We have taken an oath to serve each of our customers with utmost care and
                  politeness. We ensure that our customers are treated with honor from the start. We
                  will keep up serving our customers until they are satisfied.
                </div>
              </div>
            </div>
          </div>
          <div className={style.row}>
            <div className={clsx(style.card, style.card3)}>
              <div className={style.body}>
                <div className={style.title}>24x7 Customer Support</div>
                <div className={style.content}>
                  Providing all-time service to the customers is one of our priorities. We believe
                  that service is not limited to the due time of course. We look forward to keeping
                  contact with our customers even after course service. We are available 24x7 for
                  clearing your doubts and help you in every possible way.
                </div>
              </div>
            </div>
            <div className={clsx(style.card, style.card4)}>
              <div className={style.body}>
                <div className={style.title}>Affordable Pricing</div>
                <div className={style.content}>
                  We know that not every person can afford schemes of high price. We at Ping
                  Assignments have designed courses with affordable pricing so that our customers
                  can avail the benefits with ease and satisfaction.
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithPadding>

      <div className={style.callback}>
        <div className={style.text}>
          <p>Request a call back right now ?</p>
        </div>
        <div className={style.controller}>
          <HashLink smooth to="#callback">
            <button>Contact Us</button>
          </HashLink>
        </div>
      </div>

      <WithPadding className={style.servicesWrapper} id="services">
        <div className={style.header}>
          <p>
            Our <span>Services</span>
          </p>
          <p>THE BEST IN THE INDUSTRY</p>
        </div>
        <div className={style.services}>
          {SERVICES.map((service, index) => (
            <div className={clsx(style.service, index % 2 == 0 && style.alt)}>
              <div className={style.image}>
                <img src={service.image} alt="" />
              </div>
              <div className={style.content}>
                <div className={style.title}>{service.title}</div>
                {service.descSummary}{" "}
                <span onClick={handleClickReadMore.bind(this, service)}>Read More</span>
              </div>
            </div>
          ))}
        </div>
      </WithPadding>

      <div className={style.solutionsWrapper}>
        <div className={style.solutionsText}>
          <p>Our solutions for your</p>
          <p>business growth</p>
          <p>Rapidwork Solutions is one of the fastest growing IT company.</p>
          <p>
            Rapidwork solutions consist of around 25 consultants. We have served more than 100
            clients in different countries.
          </p>
        </div>
        <div className={style.statsWrapper}>
          <div className={style.statsRow}>
            <div className={style.stat}>
              <p>100+</p>
              <p>Happy customers</p>
            </div>
            <div className={style.stat}>
              <p>350+</p>
              <p>Delivered orders</p>
            </div>
          </div>
          <div className={style.statsRow}>
            <div className={style.stat}>
              <p>315+</p>
              <p>Good reviews </p>
            </div>
            <div className={style.stat}>
              <p>25+</p>
              <p>Employees</p>
            </div>
          </div>
        </div>
      </div>

      <WithPadding id="reviews" className={style.testimonialsWrapper}>
        <div className={style.header}>
          <p>
            Our <span>Reviews</span>
          </p>
        </div>
        <Testimonials />
      </WithPadding>

      <div className={style.contactWrapper} id="callback">
        <div className={style.header}>
          <p>
            Request a <span>call back</span>
          </p>
        </div>
        <form>
          <div className={style.top}>
            <div className={style.inputs}>
              <div className={style.formRow}>
                <input type="text" name="name" placeholder="Full Name" />
              </div>
              <div className={style.formRow}>
                <input type="email" name="email" placeholder="E-mail" />
              </div>
              <div className={style.formRow}>
                <input type="text" name="subject" placeholder="Subject" />
              </div>
            </div>
            <div className={style.textareas}>
              <textarea name="message" placeholder="Message"></textarea>
            </div>
          </div>
          <div className={style.controller}>
            <button>Send Message</button>
          </div>
        </form>
      </div>

      {isOpenModal && (
        <ServiceModal activeService={activeService} isOpen={true} onClose={toggleModal} />
      )}

      <WithPadding className={style.footer}>
        <div className={style.logo}>
          <img src={Logo} alt="" />
          <p>
            Rapidwork Solutions is one of the leading firms of Information Technology solutions that
            offers a range of services in software development services, online marketing services,
            data entry & processing outsourcing, and graphic designing services.
          </p>
        </div>

        <div className={style.contact}>
          <div className={style.title}>Links</div>
          <div className={style.links}>
            <div className={style.link}>
              <HashLink smooth to="#about">
                <p>Home</p>
              </HashLink>
            </div>

            <div className={style.link}>
              <HashLink smooth to="#about">
                <p>About Us</p>
              </HashLink>
            </div>

            <div className={style.link}>
              <HashLink smooth to="#about">
                <p>Our Services</p>
              </HashLink>
            </div>
          </div>
        </div>

        <div className={style.contact}>
          <div className={style.title}>Get In Touch</div>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Contact" />
            <input type="text" placeholder="Email" />
          </form>
        </div>
      </WithPadding>
    </div>
  );
};

export default Landing;
