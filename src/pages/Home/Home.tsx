import S from './Home.module.scss';
import moment from 'moment';
import { useState, useEffect } from 'react';
const FAQ_LIST = [
  {
    title: '자기소개',
    content:
      "UI/UX 전공인 프론트엔드 개발자 윤소희입니다..\n제가 디자인을 알고, 마크업을 아는 만큼 \n디자이너와 UI/UX 관련 커뮤니케이션이 쉽게 오갑니다. \n디자이너들이 지금까지 개발을 몰라 답답했던 부분을 설명하며 이해하는 것을 돕고 그들이 원하는 만큼 아웃풋을 만들기 위해 노력합니다. \n기능적으로 어려운 일이 생겨도 디자이너의 맘을 알기에 안된다는 말보다는 차선 안을 제시합니다. \nFront-end 개발자가 디자인 출신인 것은 장점이라 생각하지만, \n'웹 디자인 출신 개발자'라는 말보다는 \n'디자인을 이해하는 Front-End 개발자'가 되기 위해 학점은행제를 통한 컴퓨터공학 학사학위를 공부 중입니다",
    id: 1,
    isOpen: false,
  },
  {
    title: '디자인에서 개발로 전향된 사유',
    content: '',
    id: 2,
    isOpen: false,
  },
  {
    title: '프로그래밍을 시작한 경위',
    content: '',
    id: 3,
    isOpen: false,
  },
  {
    title: '본인의 개발 학습 방법',
    content: '',
    id: 4,
    isOpen: false,
  },
  {
    title: '업무 경험중 가장 가치가 있었던 경험',
    content: '',
    id: 5,
    isOpen: false,
  },
  {
    title: '어려움을 극복하기 위한 방법',
    content: '',
    id: 6,
    isOpen: false,
  },
];
export default function Home() {
  const [career, setCareer] = useState<string>(/*Y-M*/ '');
  const [faqList, setFaqList] = useState<
    {
      title: string;
      content: string;
      id: number;
      isOpen: boolean;
    }[]
  >(FAQ_LIST);
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
              안녕하세요 웹 프론트엔드 3년차 최하영입니다
              <br />
              실무로 Vue, Typescript를 사용했으며,
              <br />
              현재 React 사용하여 포트폴리오를 만들며
              <br />
              꾸준히 기술을 익히고 있습니다.
            </p>
          </div>
          <div className={S.mainImageArea}>
            <img></img>
          </div>
        </main>

        <div className={S.skillWrap}>
          <ul className={S.skillList}>
            <li>Vue</li>
            <li>Nuxt</li>
            <li>Typescript</li>
            <li>Javascript</li>
            <li>Scss</li>
            <li>React</li>
            <li>Tailwindcss</li>
            <li>Git</li>
            <li>Figma</li>
            <li>jQuery</li>
          </ul>
        </div>
      </article>

      <article className={S.introSection}>
        <h3>안녕하세요. 웹 FE 개발자 윤소희입니다.</h3>
        <p>
          저는 어릴 적부터 UI/UX 디자인에 큰 흥미를 가지고 공부해 왔고,
          <br />
          단순히 디자인에 그치지 않고 직접 구현하고 싶은 열정이 생겨
          <br />
          프론트엔드 개발을 독학과 학원을 병행하며 배우게 되었습니다.
          <br />
          그렇게 개발자로서의 첫걸음을 내딛었고,
          <br />
          이후 다양한 환경에서 실무 경험을 쌓아왔습니다.
        </p>
        <div className={S.introBtnWrap}>
          <button>이력서 다운로드</button>
          <button>TMI 구경하기</button>
        </div>
      </article>

      <article className={S.careerSection}>
        <div className={S.nameTagWrap}>
          <img></img>
        </div>
        <div className={S.careerInfo}>
          <p>제가 프론트엔드로 일한 지</p>
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
        <h3>Portfolio</h3>
        <ul className={S.portfolioMenu}>
          <li>프론트엔드</li>
          <div className={S.divider}></div>
          <li>퍼블리싱</li>
          <div className={S.divider}></div>
          <li>디자인</li>
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
      </article>

      <article className={S.skillSection}></article>
      <article className={S.faqSection}>
        <div className={S.faqImg}>
          <img />
        </div>
        <div className={S.faqContent}>
          <p>FAQ</p>
          <div className={S.faqList}>
            {faqList.map((faq) => (
              <div key={faq.id} className={S.faqItem}>
                <p onClick={toggleFaq(faq.id)}>
                  {faq.title}
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
                {faq.isOpen && <pre>{faq.content}</pre>}
              </div>
            ))}
          </div>
        </div>
      </article>
      <article className={S.contactMeSection}></article>
    </section>
  );
}
