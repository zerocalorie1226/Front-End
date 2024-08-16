import React, { useState } from 'react';
import styles from './FAQ.module.css';
import LeftBar from '../SideBarFold/LeftBar.jsx';
import Schedule from '../ScheduleFold/Schedule.jsx';
import MainBar from '../SideBarFold/MainBar.jsx';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles['faq-item']}>
      <div className={styles['faq-question']} onClick={toggleOpen}>
        {question}
        <span className={`${styles['faq-icon']} ${isOpen ? styles['open'] : ''}`}></span>
      </div>
      {isOpen && <div className={styles['faq-answer']}>{answer}</div>}
    </div>
  );
};

const FAQList = () => {
  const faqs = [
    { question: 'Q. 예비 수강 신청 기간에 신청을 못했어요', answer: 'A. 예비 수강 신청 기간에 신청을 못했을 경우, 일반 수강 신청 기간을 이용하여 신청할 수 있습니다.' },
    { question: 'Q. 부전공 졸업 학점 이수 내역은 어떻게 확인하나요', answer: 'A. 부전공 졸업 학점 이수 내역은 학교 포털 사이트에서 확인할 수 있습니다.' },
    { question: 'Q. 수강 신청 내역을 실수로 삭제했어요', answer: 'A. 수강 신청 내역을 실수로 삭제한 경우, 수강 신청 페이지 [장바구니 내역]을 통해 다시 신청할 수 있습니다.' },
    { question: 'Q. 수강 신청 기간인데 수강 신청이 불가해요', answer: 'A. 학우분들께서는 해당 신청일이 본인 학년 수강 신청일과 동일한지 확인 후 수강 신청 바랍니다.' },
    { question: 'Q. 수강 신청 기능을 이용할 수 없어요', answer: 'A. 본교에서는 해당일이 수강 신청 기간과 다른 경우, 학우분들의 혼선을 방지하기 위해 수강 신청 페이지 접근을 제한하고 있습니다. (예비 수강 신청, 일반 수강 신청 모두 동일) 한국대학교 학우분들에게 많은 양해 부탁드립니다.' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles['faq-list']}>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className={styles.body}>
      <LeftBar />
      <MainBar />
      <FAQList />
      <Schedule />
    </div>
  );
};

export default FAQ;
