/*수강신청내역*/
import React, { useState } from 'react';
import styles from './Course.module.css'; 
import { useNavigate } from 'react-router-dom';
import Schedule from '../ScheduleFold/Schedule.jsx';
import LeftBar from '../SideBarFold/LeftBar.jsx';

const Course = () => {
  const [selectedYear, setSelectedYear] = useState("2024학년도");
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSubNav, setSelectedSubNav] = useState('수강 신청 내역');
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleSubNavClick = (subNav) => {
    setSelectedSubNav(subNav);
    if (subNav === '학생 정보 확인') {
      navigate('/mypage');
    } else if (subNav === '수강 신청 내역') {
      navigate('/course');
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://your-api-endpoint.com/courses?year=${selectedYear}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <LeftBar />
      <div className={styles.mainContent}>
        {/* 상단 네비게이션 바 */}
        <div className={styles.navbar}>
          <button onClick={() => handleNavClick('/notice')}>공지사항</button>
          <button onClick={() => handleNavClick('/inquiry')}>과목조회</button>
          <button onClick={() => handleNavClick('/application')}>수강신청</button>
          <button className={styles.application} onClick={() => handleNavClick('/mypage')}>마이페이지</button>
        </div>

        {/* 하위 네비게이션 바 */}
        <div className={styles.subNavbar}>
          <button
            className={`${styles.subNavbarBtn} ${selectedSubNav === '학생 정보 확인' ? styles.selected : ''}`}
            onClick={() => handleSubNavClick('학생 정보 확인')}
          >
            학생 정보 확인
          </button>
          <button
            className={`${styles.subNavbarBtn} ${selectedSubNav === '수강 신청 내역' ? styles.selected : ''}`}
            onClick={() => handleSubNavClick('수강 신청 내역')}
          >
            수강 신청 내역
          </button>
        </div>

        {/* 컨테이너 */}
        <div className={styles.container}>
          <div className={styles.dropdown}>
          <div className={styles.yearLabel}><label htmlFor="year-select" className={styles.yearLabel}>학년도 선택</label></div>
            <select id="year-select" value={selectedYear} onChange={handleYearChange}>
              {Array.from({ length: 15 }, (_, i) => (
                <option key={2010 + i} value={`${2010 + i}학년도`}>
                  {2010 + i}학년도
                </option>
              ))}
            </select>
            <button onClick={handleQuery}>조회</button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {courses && (
            <>
              <div className={styles.semester}>
                <h2>{selectedYear} 봄학기 수강 내역</h2>
                <div className={styles.courses}>
                  <div className={styles.major}>
                    <h3>전공</h3>
                    <ul>
                      {courses.spring.major.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.nonMajor}>
                    <h3>전공 외</h3>
                    <ul>
                      {courses.spring.nonMajor.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.semester}>
                <h2>{selectedYear} 여름 계절학기 수강 내역</h2>
                <div className={styles.courses}>
                  <div className={styles.major}>
                    <h3>전공</h3>
                    <ul>
                      {courses.summer.major.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.nonMajor}>
                    <h3>전공 외</h3>
                    <ul>
                      {courses.summer.nonMajor.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.semester}>
                <h2>{selectedYear} 가을학기 수강 내역</h2>
                <div className={styles.courses}>
                  <div className={styles.major}>
                    <h3>전공</h3>
                    <ul>
                      {courses.fall.major.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.nonMajor}>
                    <h3>전공 외</h3>
                    <ul>
                      {courses.fall.nonMajor.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.semester}>
                <h2>{selectedYear} 겨울 계절학기 수강 내역</h2>
                <div className={styles.courses}>
                  <div className={styles.major}>
                    <h3>전공</h3>
                    <ul>
                      {courses.winter.major.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.nonMajor}>
                    <h3>전공 외</h3>
                    <ul>
                      {courses.winter.nonMajor.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Schedule />
      </div>
    </div>
  );
};

export default Course;
