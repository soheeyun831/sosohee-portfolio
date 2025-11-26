import S from './Home.module.scss';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ThreeCube } from './components/ThreeCube';
import { useTranslation } from 'react-i18next';
import data from './data/home.json';

export default function Home() {
  const { t, i18n } = useTranslation();

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
    const startDate = moment('2019-04', 'YYYY-MM');
    const today = moment();
    const duration = moment.duration(today.diff(startDate));
    setCareer(`${duration.years()}-${duration.months()}`);
  }, []);

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
              {i18n.t('home.mainInfo').split("\n").map((line)=>(<div>{line}</div>))}
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
          {i18n.t('home.info.description').split("\n").map((line)=>(<div>{line}</div>))}
        </p>
        <div className={S.introBtnWrap}>
          <button>{t('home.info.actionButton1')}</button>
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
                    fill="black"
                />
              </svg>
            </div>
            <div className={S.tmiDropdown}>
              <ul>
                <li>{t('home.info.actionButton2-1')}</li>
                <li>{t('home.info.actionButton2-2')}</li>
                <li>{t('home.info.actionButton2-3')}</li>
                <li>{t('home.info.actionButton2-4')}</li>
                <li>{t('home.info.actionButton2-5')}</li>
              </ul>
            </div>
          </button>
        </div>
      </article>

      <article className={S.careerSection}>
        <div className={S.nameTagWrap}>
          <img></img>
        </div>
        <div className={S.careerInfo}>
          <p>{t('home.careerSubTitle')}</p>
          <p>{career.split('-')[0]}years</p>
          <p>{career.split('-')[1]}month</p>
          <div className={S.careerCarousel}>
            <button>
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
            <button>
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
            <ul>
              <li></li>
              <li></li>
            </ul>
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
              {[0, 0, 0].map(() => (
                <li className={S.portfolioItem}>
                  <div className={S.portfolioImage}>
                    <img />
                  </div>
                  <div className={S.portfolioDetail}>
                    <h6>this Site ^_^!</h6>
                    <p>Front-end | Publish | Design</p>
                    <p>2025.01 ~ 2025.05</p>
                    <p>업체 : 제 자신</p>
                    <p>Skill : React</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className={S.portfolioRightCol}>
              {[0, 0, 0].map(() => (
                <li className={S.portfolioItem}>
                  <div className={S.portfolioImage}>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Portfolio Thumbnail"
                    />
                  </div>
                  <div>
                    <h6>this Site ^_^!</h6>
                    <p>Front-end | Publish | Design</p>
                    <p>2025.01 ~ 2025.05</p>
                    <p>업체 : 제 자신</p>
                    <p>Skill : React</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button>{t('home.portfolio.more')}</button>
          </div>
        </div>
      </article>

      <article className={S.skillSection}>
        <h3>Skills</h3>
        <div className={S.skillArea}>
          <div className={S.skillListArea}>
            <ul className={S.skillList}>
              {data.skills.map((skill) => (
                  <li className={S.skillItem}>
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
            <img src="/src/assets/images/home/skill-vue.png" alt="skill vue icon" className={S.skillVue} />
            <img src="/src/assets/images/home/skill-sass.png" alt="skill sass icon" className={S.skillSass} />
            <img src="/src/assets/images/home/skill-js.png" alt="skill javascript icon" className={S.skillJs} />
            <img src="/src/assets/images/home/skill-ts.png" alt="skill typeScript icon" className={S.skillTs} />
            <div className={S.skillImgBg}/>
          </div>
        </div>
      </article>
      <article className={S.faqSection}>
        <div className={S.faqImg}>
          <img src="/src/assets/images/home/faq.png" alt="faq" />
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
      <article className={S.contactMeSection}></article>
    </section>
  );
}
