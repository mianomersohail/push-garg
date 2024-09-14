import './CountEffect.css'
import { useEffect } from 'react';

export default function CountEffect() {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');

    const countUp = (target, el, speed) => {
      const updateCount = () => {
        const targetNumber = +target;
        const count = +el.innerText;
        const increment = targetNumber / speed;

        if (count < targetNumber) {
          el.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 50); // Slower animation for all
        } else {
          el.innerText = targetNumber;
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-target');
          const speed = entry.target.getAttribute('data-speed'); // Custom speed
          countUp(target, entry.target, speed);
          observer.unobserve(entry.target); // Stop observing after counting
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }, []);

  return (
    <div className="container Count-main">
      <div className="row">
        <div className="col-lg-4 count-box">
          <div>
            <h3>PROJECT COMPLETED</h3>
            <h1 className="counter" data-target="50" data-speed="200">0</h1>
          </div>
        </div>
        <div className="col-lg-4 count-box">
          <div>
            <h3>EXPERIENCE</h3>
            <h1 className="counter" data-target="2" data-speed="30">0</h1>
          </div>
        </div>
        <div className="col-lg-4 count-box">
          <div>
            <h3>PROBLEM SOLVING</h3>
            <h1 className="counter" data-target="100" data-speed="200">0</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
