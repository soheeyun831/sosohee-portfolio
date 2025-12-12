import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import S from './Home.module.scss';

import { useTranslation } from 'react-i18next';

import { ThreeCube } from './components/ThreeCube';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
// @ts-expect-error - importing swiper css as global side-effect (no TS types)
import 'swiper/css';
// @ts-expect-error - importing swiper pagination css as global side-effect (no TS types)
import 'swiper/css/pagination';

import data from './data/home.json';
import portfolioList from '../../service/portfolio.json'
import careerList from '../../service/career.json'
import type {ICareer} from  '../../type/ICareer.ts'
import type {IPortfolio} from  '../../type/IPortfolio.ts'

// Vite: import all images under src/assets/images so build includes them and we can reference by relative key
type ImageModule = { default: string } | string;
const imagesModules = import.meta.glob('/src/assets/images/**', { eager: true }) as Record<string, ImageModule>;
const imageMap: Record<string, string> = {};
Object.entries(imagesModules).forEach(([path, mod]) => {
  const key = path.replace('/src/assets/images/', '');
  imageMap[key] = typeof mod === 'string' ? mod : (mod.default ?? '');
});

dayjs.extend(customParseFormat);


export default function Home() {
  const { t, i18n } = useTranslation();


  const [swiper, setSwiper] = useState<SwiperClass | undefined>();
  const [career, setCareer] = useState<string>(/*Y-M*/ '');
  const [isTmiDropdownOpen, setTmiDropdown] = useState<boolean>(false);

  const openTmiDropdown = () => {
    setTmiDropdown(prev => !prev); // 이전 상태 기반으로 안전하게 토글
  };

  const [faqList, setFaqList] = useState<
    {
      code: string;
      id: number;
      isOpen: boolean;
    }[]
  >(data.faq);

  useEffect(() => {
    // careerData의 각 항목(startDate ~ endDate)을 합산하여 총 기간을 YYYY-MM 포맷으로 설정

    const totalMonths = careerList?.career.reduce((acc: number, item: ICareer) => {
      const diffInMonths = dayjs(item.endDate).diff(dayjs(item.startDate), 'month');
      return acc + (diffInMonths > 1 ? diffInMonths + 1 : diffInMonths);
    }, 0)

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;


    setCareer(`${years}-${months}`);
  }, []);

  const handlePrev = () => {
    // 이전으로 이동
    swiper?.slidePrev();
  };

  const handleNext = () => {
    // 다음으로 이동
    swiper?.slideNext();
  };


  const toggleFaq = (id: number) => () => {
    setFaqList((prev) => {
      return prev.map((faq) => {
        if (faq.id === id) {
          return {
            ...faq,
            isOpen: !faq.isOpen,
          };
        }
        return faq;
      });
    });
  };

  return (
    <section>
      <article className={S.homeThumbnail}>
        <main className={S.mainWrap}>
          <div className={S.mainTextArea}>
            <h1 className={S.mainTitle}>
              WEB
              <br />
              FRONT-END
              <br />
              DEVELOPER
            </h1>
            <p className={S.mainDesc}>
              {i18n.t('home.mainInfo').split("\n").map((line, idx) => (<span key={idx}>{line}<br/></span>))}
            </p>
          </div>
          <div className={S.mainImageArea}>
            <ThreeCube />
          </div>
        </main>

        <div className={S.skillWrap}>
          <ul className={S.skillList}>
            {Array.from({ length: 6 }).flatMap((_, groupIdx) =>
                data.simple_skills.map((skill, idx) => (
                    <li key={`${groupIdx}-${idx}`}>{skill}</li>
                ))
            )}
          </ul>
        </div>
      </article>

      <article className={S.introSection}>
        <h3>{t('home.info.title')}</h3>
        <p>
          {i18n.t('home.info.description').split("\n").map((line, idx)=>(<span key={idx}>{line}<br/></span>))}
        </p>
        <div className={S.introBtnWrap}>
          <button>
            <a href="/src/assets/file/soheeYun-resume.pdf" download="윤소희-이력서">
              {t('home.info.actionButton1')}
            </a>
          </button>
          <button className={`${S.tmiSelector} ${isTmiDropdownOpen ? S.opened : ''}`}
                  onClick={openTmiDropdown}>
            {t('home.info.actionButton2')}
            <div className={S.tmiIcon}>
              <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.19629 9L0.000136542 2.51244e-08L10.3924 -8.834e-07L5.19629 9Z"
                />
              </svg>
            </div>
            <div className={S.tmiDropdown}>
              <ul>
                <li>
                  <a href="/src/assets/file/soheeYun-portfolio.pdf" download="윤소희-포트폴리오">
                    {t('home.info.actionButton2-1')}
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/bbosong_hee/" target={'_blank'}>
                    {t('home.info.actionButton2-2')}
                  </a>
                </li>
                <li>
                  <a href="https://bbosong-develop.tistory.com/" target={'_blank'}>
                    {t('home.info.actionButton2-3')}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/soheeyun831" target={'_blank'}>
                    {t('home.info.actionButton2-4')}
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/photographer_hee/" target={'_blank'}>
                    {t('home.info.actionButton2-5')}
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </article>

      <article className={S.careerSection}>
        <div className={S.nameTagWrap}>
        </div>
        <div className={S.careerInfo}>
          <p>{t('home.careerSubTitle')}</p>
          <p>{career.split('-')[0]}years</p>
          <p>{career.split('-')[1]}month</p>
          <div className={S.careerCarousel}>

            <Swiper
                className={S.careerSwiper}
                 modules={[Autoplay]}
                 slidesPerView={1}
                 spaceBetween={0} // 슬라이더 간의 간격 지정
                 autoplay={{ // 자동 재생
                   delay: 4500, // 지연 시간 (한 슬라이더에 머물르는 시간)
                   disableOnInteraction: true, // 마우스 제어 이후 자동 재생을 막을지 말지
                 }}
                 speed={500} // 슬라이더 넘어가는 속도
                 onSwiper={(e) => {
                   setSwiper(e);
                 }}
            >
              {
                careerList.career.map((_, index) => (
                  <SwiperSlide key={index} className={S.careerItem}>
                    <h5 className={S.careerName}>{_.name}</h5>
                    <p className={S.careerData}>
                      <span>
                        {_.startDate}~{_.endDate ?? '현재'}
                      </span>
                      <span>
                        {_.category}
                      </span>
                      <span>
                        {_.jobs}
                      </span>
                    </p>
                  </SwiperSlide>
                ))
              }
            </Swiper>

            <button className={S.NavigationLeft} onClick={handlePrev} aria-label="previous slide">
              <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-5.24537e-07 10.3923L18 2.97308e-05L18 20.7846L-5.24537e-07 10.3923Z"
                    fill="black"
                />
              </svg>
            </button>
            <button className={S.NavigationRight} onClick={handleNext} aria-label="next slide">
              <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-5.24537e-07 10.3923L18 2.97308e-05L18 20.7846L-5.24537e-07 10.3923Z"
                    fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>

      <article className={S.portfolioSection}>
        <div className={S.portfolioWrap}>
          <h3>Portfolio</h3>
          <ul className={S.portfolioMenu}>
            <li>{t('home.portfolio.type1')}</li>
            <div className={S.divider}></div>
            <li>{t('home.portfolio.type2')}</li>
            <div className={S.divider}></div>
            <li>{t('home.portfolio.type3')}</li>
          </ul>
          <div className={S.portfolioList}>
            <ul className={S.portfolioLeftCol}>
              <li className={S.portfolioItem}>
                <div className={S.portfolioImage}>
                  <img src={imageMap['home/thisSiteThumbnail.png']} alt="지금 사이트입니다!" />
                </div>
                <div className={S.portfolioDetail}>
                  <h6>this Portfolio Site!</h6>
                  <p>Front-end | Design </p>
                  <p>
                    2025.05 ~ 2025.12 (7m)
                  </p>
                  <p>업체 : 제 자신</p>
                  <p>Skill : React, Typescript</p>
                </div>
              </li>
              {((portfolioList as unknown as { portfolio: IPortfolio[] }).portfolio).slice(0, 2).map((item : IPortfolio) => (
                  <li key={item.id} className={S.portfolioItem}>
                    <div className={S.portfolioImage}>
                      <img src={imageMap[item.thumbnail] ?? ''} alt={item.title} />
                    </div>
                    <div className={S.portfolioDetail}>
                      <h6>{item.title}</h6>
                      <p>{item.category?.join(' | ') ?? 'Front-end'}</p>
                      <p>
                        {item.startDate} ~ {item.endDate ?? '현재'} ({
                          (()=>{
                            const s=dayjs(item.startDate,['YYYY-MM','YYYY-MM','YYYY']),
                                e=item.endDate?dayjs(item.endDate,['YYYY-MM','YYYY-MM','YYYY']):dayjs(),
                                y=e.diff(s,'year');
                            return `${y ? `${y}y ` : ''}${e.diff(s.add(y,'year'),'month')}m`;
                          })()
                        })
                      </p>
                      <p>업체 : {item.company}</p>
                      <p>Skill : {item.skills}</p>
                    </div>
                  </li>
              ))}
            </ul>
            <ul className={S.portfolioRightCol}>
              {((portfolioList as unknown as { portfolio: IPortfolio[] }).portfolio).slice(2, 4).map((item : IPortfolio) => (
                  <li key={item.id} className={S.portfolioItem}>
                    <div className={S.portfolioImage}>
                      <img src={imageMap[item.thumbnail] ?? ''} alt={item.title} />
                    </div>
                    <div className={S.portfolioDetail}>
                      <h6>{item.title}</h6>
                      <p>{item.category?.join(' | ') ?? 'Front-end'}</p>
                      <p>
                        {item.startDate} ~ {item.endDate ?? '현재'} ({
                          (()=>{
                            const s=dayjs(item.startDate,['YYYY-MM','YYYY-MM','YYYY']),
                                  e=item.endDate?dayjs(item.endDate,['YYYY-MM','YYYY-MM','YYYY']):dayjs(),
                                  y=e.diff(s,'year');
                            return `${y ? `${y}y ` : ''}${e.diff(s.add(y,'year'),'month')}m`;
                          })()
                        })
                      </p>
                      <p>업체 : {item.company}</p>
                      <p>Skill : {item.skills}</p>
                    </div>
                  </li>
              ))}
              <li className={`${S.portfolioItem} ${S.more}`}>
                <div className={S.portfolioDetail}>
                  <img src={imageMap['common/plus-icon.png']} alt="more portfolio" />
                  <p>{t('home.portfolio.more')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <article className={S.skillSection}>
        <h3>Skills</h3>
        <div className={S.skillArea}>
          <div className={S.skillListArea}>
            <ul className={S.skillList}>
              {data.skills.map((skill, idx) => (
                  <li key={idx} className={S.skillItem}>
                    <p className={S.skillItemLevel}>
                      {skill.name}
                    </p>
                    <p className={S.skillItemLevel}>
                      ( <b>{skill.level}</b> / 5 )
                    </p>
                  </li>
              ))}
              <li className={S.skillItem}>

                <p className={S.skillItemLevel}>
                  {t('home.skillLastMessage')}
                </p>
                <p className={S.skillItemLevel}>
                  ( <b>5</b> / 5 )
                </p>
              </li>
            </ul>
          </div>
          <div className={S.skillImg}>
            <img src={imageMap['home/skill-vue.png']} alt="skill vue icon" className={S.skillVue} />
            <img src={imageMap['home/skill-sass.png']} alt="skill sass icon" className={S.skillSass} />
            <img src={imageMap['home/skill-js.png']} alt="skill javascript icon" className={S.skillJs} />
            <img src={imageMap['home/skill-ts.png']} alt="skill typeScript icon" className={S.skillTs} />
            <div className={S.skillImgBg}/>
          </div>
        </div>
      </article>
      <article className={S.faqSection}>
        <div className={S.faqImg}>
          <img src={imageMap['home/faq.png']} alt="faq" />
        </div>
        <div className={S.faqContent}>
          <p>FAQ</p>
          <div className={S.faqList}>
            {faqList.map((faq) => (
              <div key={faq.id} className={S.faqItem}>
                <p onClick={toggleFaq(faq.id)}>
                  {t(`home.faq.${faq.code}.title`)}
                  <span
                    className={`${S.faqIcon} ${faq.isOpen ? S.opened : ''}`}>
                    <svg
                      width="11"
                      height="9"
                      viewBox="0 0 11 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.19629 9L0.000136542 2.51244e-08L10.3924 -8.834e-07L5.19629 9Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </p>
                {faq.isOpen && <pre>{i18n.t(`home.faq.${faq.code}.content`).split("\n").map((line)=>(<div>{line}</div>))}</pre>}
              </div>
            ))}
          </div>
        </div>
      </article>
      <article className={S.contactMeSection}>
        <div>
          <h3>Contact Me</h3>
          <button>Want to work with me?</button>
        </div>
      </article>
    </section>
  );
}
